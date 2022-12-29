<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link to="/" class="navbar-brand">者也专栏</router-link>
    <!-- Navbar content -->
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
            <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
        </ul>
        <ul v-else class="list-inline mb-0 btn-outline-light my-2">
            <!-- <li><a class="btn border border-white">你好{{ user.name }}</a></li> -->
            <Dropdown :title="`你好,${user.name}`">
                <DropdownItem><router-link to="/create" class="dropdown-item">新建文章</router-link></DropdownItem>
                <DropdownItem disabled><a href="" class="dropdown-item">新建目录</a></DropdownItem>
                <DropdownItem><a href="" class="dropdown-item">新建目录</a></DropdownItem>
            </Dropdown>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import Dropdown from './components/Dropdown.vue'
import DropdownItem from './components/DropdownItem.vue'
import { UserProps } from '@/components/GlobalInterface' // 定义接口，限制props的类型
const props = defineProps({
  // props 获取props
  user: {
    type: Object as PropType<UserProps>, // 让user的类型变为userProps类型
    required: true
  }
})

</script>
