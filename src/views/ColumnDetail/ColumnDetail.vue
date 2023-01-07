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
store.fetchColumn(currentId)
// 获取当前专栏内的文章数据
store.fetchPosts(currentId)

// 获取column 用户点击的专栏信息
const column = store.getColumn(currentId)
// 获取list 显示该专栏的文章列表
const list = store.getPosts(currentId)

</script>
