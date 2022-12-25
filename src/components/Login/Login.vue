<template>
    <ValidateForm  @form-submit="openAdd" ref="formRef">
        <div class="col-auto">
            <label for="staticEmail2" class="visually-hidden">Email</label>
            <ValidateInput  :rules="emailRules" v-model="emailValue" type="text" placeholder="请输入邮箱地址"></ValidateInput>

        </div>
        <div class="col-auto">
            <label for="inputPassword2" class="visually-hidden">Password</label>
            <ValidateInput :rules="passwordRules"  v-model="emailValue" type="password" placeholder="请输入密码"></ValidateInput>
        </div>
        <template #submit>
            <span class="btn btn-danger" @click="openAdd">提交</span>
        </template>
    </ValidateForm>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import ValidateForm from '../ValidateForm/ValidateForm.vue'
import ValidateInput from '../ValidateInput/ValidateInput.vue'
import { RulesProp } from '../GlobalInterface'
// 定义校验规则
const emailRules:RulesProp = [
  { type: 'required', message: '邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const passwordRules:RulesProp = [
  { type: 'required', message: '密码不能为空' },
  // { type: 'range', message: '密码不能小于6位,不能大于12位', min: { length: 6 }, max: { length: 12 } }
  { type: 'range', min: { message: '密码不能小于6位', length: 6 } },
  { type: 'range', max: { message: '密码不能大于12位', length: 12 } }
]
const emailValue = ref('1')
const formRef = ref<Ref | null>(null)
const openAdd = () => {
  console.log(formRef.value)

  console.log(formRef.value.validate())
}
</script>
