<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <a class="navbar-brand">者也专栏</a>
    <!-- Navbar content -->
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item"><a class="btn btn-outline-light my-2">登录</a></li>
            <li class="list-inline-item"><a class="btn btn-outline-light my-2">注册</a></li>
        </ul>
        <ul v-else class="list-inline mb-0 btn-outline-light my-2">
            <li><a class="btn border border-white">你好{{ user.name }}</a></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { UserProps } from '@/components/GlobalInterface' // 定义接口，限制props的类型
const props = defineProps({
  // props 获取props
  user: {
    type: Object as PropType<UserProps>, // 让user的类型变为userProps类型
    required: true
  }
})

</script>
