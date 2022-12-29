<template>
    <div>
        <h1 class="mb-5">新建文章</h1>
        <ValidateForm ref="FormRef" >
            <label for="">文章标题:</label>
            <ValidateInput class="mb-4" placeholder="请输入文章标题" v-model="valueTitle" :rules="Titlerules"></ValidateInput>
            <label for="">文章详情:</label>
            <ValidateInput tag="textarea" rows="10" class="mb-4" placeholder="请输入文章详情" v-model="valueContent" :rules="Contentrules"></ValidateInput>
            <template #submit>
                <span class="btn btn-danger mb-5" @click="addPost">创建文章</span>
            </template>
        </ValidateForm>
    </div>
    </template>

<script setup lang="ts">
import ValidateForm from '@/components/ValidateForm/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput/ValidateInput.vue'
import { ref } from 'vue'
import { RulesProp, PostProps } from '@/components/GlobalInterface'
import useStore from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
// 定义input的数据
const valueTitle = ref('')
const valueContent = ref('')

// 获取form的ref
const FormRef = ref<any>(null)

// 发布文章按钮
const addPost = () => {
  // 表单校验成功
  if (FormRef.value.validate()) {
    const columnId = store.user.columnId // 获取到用户提交的专栏id
    if (columnId) {
      // 创建新的文章
      const newPost:PostProps = {
        id: new Date().getTime(),
        title: valueTitle.value,
        content: valueContent.value,
        columnId,
        createdAt: new Date().toLocaleDateString()
      }
      //   提交commit修改文章
      store.createPost(newPost)
      router.push({ name: 'column', params: { id: columnId } }) // 跳转路由
    }
  }
}

// 定义表单校验
const Titlerules:RulesProp = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
const Contentrules:RulesProp = [
  {
    type: 'required',
    message: '文章详情不能为空'
  }
]
</script>
