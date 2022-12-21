<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <ColumnList :list="testData"></ColumnList>
  </div>
</template>

<script setup lang="ts">
import ColumnList from '@/components/ColumnList/ColumnList.vue' // 获取到模板和 接口，获取接口的原因是一会需要创建data定义类型
import GlobalHeader from './components/GlobalHeader/GlobalHeader.vue'
import { currentUser, testData } from '@/mock/Mock' // 获取mock数据
</script>
<style>

</style>
