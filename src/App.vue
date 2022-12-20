<template>
  <div class="container">
    <ColumnList :list="testData"></ColumnList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from './components/ColumnList.vue' // 获取到模板和 接口，获取接口的原因是一会需要创建data定义类型
import { ColumnProps } from './components/test'
// mock数据
const testData:ColumnProps[] = [
  {
    id: 1,
    title: 'string',
    avatar: '/img/logo.82b9c7a5.png',
    description: 'string'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    return {
      testData
    }
  }
})
</script>

<style>

</style>
