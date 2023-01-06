<template>
    <div class="column-detail-page w-75 mx-auto">
      <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
        <div class="col-3 text-center">
          <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border ">
        </div>
        <div class="col-9">
          <h4>{{column.title}}</h4>
          <p class="text-muted">{{column.description}}</p>
        </div>
      </div>
      <post-list :list="list"></post-list>
    </div>
</template>
<script setup lang="ts">
import PostList from './components/PostList/PostList.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
const route = useRoute()
const store = useStore()

const currentId = route.params.id as string
// 获取点击的专栏数据
await store.fetchColumn(currentId)
// 获取当前专栏内的文章数据
await store.fetchPosts(currentId)

// 获取column 用户点击的专栏信息
const column = store.getColumn(currentId)
// 获取list 显示该专栏的文章列表
const list = store.getPosts(currentId)

// setup语法糖中使用异步请求，需要添加 await ，并在父组件添加 <Suspense></Suspense>组件让请求变为同步状态，才可以正常获取数据，要不然数据是先获取到state中的空数据，请求完毕后再给state赋值，这样页面是不会重新渲染的，详情见我提问 https://coding.imooc.com/learn/questiondetail/GjNdEXKDenq69rn4.html
// https://www.cnblogs.com/Enziandom/#/e/16534070
</script>
