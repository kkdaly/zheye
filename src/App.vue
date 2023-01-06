<template>
  <div class="container">
    <!-- loading组件 -->
    <Loader v-if="isLoading"></Loader>
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <!-- 这里通过Supense包裹，是为了让里面的组件变成同步的，因为组件内有异步操作 -->
    <Suspense>
      <router-view></router-view>
    </Suspense>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalHeader from './components/GlobalHeader/GlobalHeader.vue'
import Loader from '@/components/Loader/Loader.vue'
import { useStore } from './store'
// 获取store实例
const store = useStore()
const currentUser = store.user // 获取user信息
const isLoading = computed(() => {
  return store.loading
})
</script>
<style>

</style>
