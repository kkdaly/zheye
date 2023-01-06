<template>
    <div class="post-list">
      <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
        <div class="card-body">
          <h4>{{post.title}}</h4>
          <div class="row my-3 align-items-center">
            <div v-if="post.image" class="col-3">
              <img :src="post.image?.url" :alt="post.title" class="rounded-lg w-100">
            </div>
            <p :class="{'col-9': post.image?.url}">{{post.excerpt}}</p>
          </div>
          <span class="text-muted">{{post.createdAt}}</span>
        </div>
      </article>
    </div>
</template>

<script setup lang="ts">

import { defineProps, PropType } from 'vue'
import { PostProps } from '@/components/GlobalInterface'
const props = defineProps({
//  接收父组件传递的专栏列表
  list: {
    require: true,
    type: Array as PropType<PostProps[]>
  }
})
</script>
