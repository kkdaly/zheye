<template>
    <div class="validate-input-container pd-3">
        <input
            class="form-control"
            :class="{'is-invalid':inputRef.error}"
            :value="inputRef.val"
            @input="updateValue"
            @blur="validateInput"
            v-bind="$attrs"
             >
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
    </div>
</template>
<script lang="ts">
import { defineProps, defineEmits, PropType, reactive, onMounted } from 'vue'
import { RulesProp } from '@/components/GlobalInterface'
import { emitter } from '@/utils/mittVue'
// vue3可以使用多script，不过默认的script必须在setup语法糖前面
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
/**
   * input的功能
   * 1. v-model 父组件通过 v-model传递一个值过来，子组件如果改变了传递的值，那么父组件内传递的值也会被改变
   *    功能实现：
   *      在vue2中v-model 会给子组件传递一个 名为 value的props，这个value就是v-model传递的值
   *      在vue2中v-model 还会给子组件定义一个自定义事件 input，当子组件触发这个自定义事件，并且传递了值时，那么父组件传递的值就会被改变
   *      但是在vue3中 value 被改成了 modeValue, input这个自定义事件被改成了update:modelValue，所以不影响，只是名字变了
   *      1. 我们先通过接收 modeValue， 给input表单绑定 inputRef定义的value值，（props.modelValue || ''）如果modeValue存在就复制给input表单，如果不存在就给input表单赋值为空字符串
   *      2. input表单定义input事件，这个事件只要表单内的值有修改就会触发，我们在该事件内修改input的值，并通过emit触发update:modelValue，将值传给父组件修改父组件的数据，这样就实现了双向数据绑定
   * 2. 表单校验功能
   *    功能实现：
   *      需要父组件传递一个ruls校验规则，子组件通过validateInput 来获取到ruls，进行表单校验，校验完成后返回校验结果并渲染模板提示用户失败原因
   *      还有一个功能和from组件联动的，在初始化的时候mounted时将组件的表单校验函数通过触发自定义事件来向form组件传递校验函数，form组件拿着校验函数去做校验
   */
// 创建props
const props = defineProps({
  modelValue: String, // v-model传递的props
  rules: {
    type: Array as PropType<RulesProp> // input表单校验传递的props 类型是一个属组，但是属组内是一个自定义类型的对象
  }
})
// 创建emits
const emit = defineEmits(['update:modelValue']) // 这里接收了父组件是用v-model后默认传递的自定义事件

// 定义一个邮箱验证正则
const emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
// 定义v-model更新函数
// 在vue3中，v-model中是有所改变的
// vue2 的 props（value）改成了modelValue: vue2的 input事件也改成了 update:modelValue事件
// vue3 在父组件定义v-model时 会给子组件传递 modelValue这个props属性，给子组件定义update:modelValue这个自定义事件
// 如果子组件获取到modelValue就可以获取到父组件传递的数据，如果子组件通过自定义事件传递了一个值，那么父组件传递的值就会被修改
// 定义input的value和错误提示信息
const inputRef = reactive({
  val: props.modelValue || '', // 定义value 如果用户传递v-model就是用modeValue的数据，如果没传递就默认为空
  error: false, // 是否显示错误提示信息
  message: '' // 错误提示信息
})

// 定义 v-model更新函数
const updateValue = (e:Event):void => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue
  emit('update:modelValue', targetValue)
}

// 创建input表单校验函数
const validateInput = () => {
  if (props.rules) {
    // every 只要遇到false就直接退出，需要将allPassed取反,让err信息显示出来
    // 循环验证
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message || '' // 如果rule信息传递了那么就是用rule的信息，如果没有传递就是用空字符串
      //   判断rule的类型
      switch (rule.type) {
        case 'required': // 校验必填
          passed = (inputRef.val.trim() !== '') // 不等于空 就是true

          break
        case 'email': // 校验邮箱
          passed = emailReg.test(inputRef.val) // 正则校验完成 符合正则就是true
          break
        case 'range': // 校验最长字符
          // 校验分三种情况，
          // 1.如果min 和 max 都传递了，那么需要判断他俩是否都符合
          // 2. 如果一次只传递了min,那么只需要判断是否小于
          // 3. 如果一次只传递了max,那么只需要判断是否大于
          // 因为这里用的 every 只要遇到false才退出，这里都是校验的input不符合的情况才为true，所以需要取反
          if (rule.min && rule.max) { // 都传递的情况
            console.log(1)
            passed = !(inputRef.val.trim().length < rule.min.length || inputRef.val.trim().length > rule.max.length)
          } else if (rule.min) { // 只传递了min的情况
            passed = !(inputRef.val.trim().length < rule.min.length) // 小于长度就是true，取反
            if (!passed) {
              if (rule.min?.message) {
                inputRef.message = rule.min?.message
              }
            }
          } else if (rule.max) { // 只传递了max的情况
            passed = !(inputRef.val.trim().length > rule.max.length) // 大于就是true，取反，让循环抛出错误
            if (!passed) {
              if (rule.max?.message) {
                inputRef.message = rule.max?.message
              }
            }
          }
          break
      }
      return passed // allPassed会接收到passed的返回值（有错误就是false，没有错误就是true）
    })
    inputRef.error = !allPassed // allPass就是校验的结果,需要将allPassed取反才行，因为every返回的是false，false就是校验失败
    return allPassed // 返回校验结果 false 是没有成功 ，true是校验成功
  }
  return true // 如果没有传递rules就说明不需要校验，直接返回true通过
}

// 初始化的时候向form组件传递 校验函数
onMounted(() => {
  emitter.emit('form-item-created', validateInput) // 调用form组件监听的自定义函数
})
</script>
