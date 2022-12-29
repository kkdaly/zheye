<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <!-- <ColumnList :list="testData"></ColumnList>
    <LoginVue></LoginVue> -->
    <router-view></router-view>
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
import GlobalHeader from './components/GlobalHeader/GlobalHeader.vue'
import useStore from './store'
// 获取store实例
const store = useStore()
const currentUser = store.user // 获取user信息
</script>
<style>

</style>
