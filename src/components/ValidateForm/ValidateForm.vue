<template>
    <form  class="validate-form-container">
      <!-- 通过插槽接收input组件 -->
        <slot name="default"></slot>
        <div class="submit-area" >
          <!-- 定义一个具名插槽，用来接收用户传递的button，如果没有传递就使用这里默认定义的 -->
            <slot name="submit">
                <span class="btn btn-danger" @click="submitForm"> submit</span>
            </slot>
        </div>
    </form>
</template>

<script setup lang="ts">
import { onUnmounted, defineEmits, defineExpose } from 'vue'
import { emitter, ValidateFunc } from '@/utils/mittVue' // 获取到自定义事件方法应该是全局事件总线
/**
 * FORM的功能
 * 1. 在初始化from 的时候 需要通过 mitt 定义一个自定义事件来监听input传递的校验参数
 * 2. 当input触发校验参数后会将校验函数全部传递到一个数组内，这个时候需要等待用户的点击提交按钮来执行校验功能
 * 3. 点击功能：
 *    用户不传递button时，是会默认显示一个按钮的
 *    用户传递button时，会使用用户的按钮
 *    用户不传递按钮的情况下会默认执行form下自定义的参数校验功能，这个时候form需要传递一个自定义事件 form-submit ，使用自定义事件的组件需要监听，返回值就是校验结果
 *    用户传递按钮，需要给按钮定义点击事件，在点击事件内通过form组件内的参数校验功能validate来判断是否校验成功
 */
const emit = defineEmits(['form-submit']) // 声明自定义事件
let funArr:ValidateFunc[] = [] // 存放input的信息，执行后会获得是否通过

// 1. 在初始化form时监听自定义事件
// 定义mitt的callback回调函数，input组件初始化后会把校验函数发送到当前组件自定义的事件中，
const callback = (func:ValidateFunc) => {
  funArr.push(func) // 将input的信息push到列表中
}
// 定义自定义事件 监听input发送过来的校验函数
emitter.on('form-item-created', callback)
// 销毁自定义事件
onUnmounted(() => {
  emitter.off('form-item-created', callback)
  funArr = []
})

// 点击功能1,当用户没有给form传递button时，默认button提交时触发的函数
// 定义点击事件，将获取到的input循环执行并返回
const submitForm = () => {
  const result = funArr.map(func => func()).every(result => result)
  emit('form-submit', result) // 触发事件将校验结果返回
}

// 点击功能2,当用户传递了自己的button时，则需要通过ref获取到form组件的validate函数来判断校验是否通过
// 定义校验函数
// 校验是否是符合定义的校验要求,需要用户在 form表单定义ref，通过ref获取到表单的validate判断参数是否校验成功
const validate = () => {
  const result = funArr.map(func => func()).every(result => result)
  return result
}
// 在setup语法糖中如果父组件要通过ref获取到子组件的方法，需要通过defineExpose将该方法暴露出去
defineExpose({
  validate
})
</script>
