<template>
    <div class="row">
        <div v-for="column in columnList" :key="column.id" class="col-4 mb-4 mt-4 d-flex  justify-content-center">
            <div class="card h-100 shadow-sm" style="width: 18rem;"  >

              <div class="card-body text-center">
              <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
              <h5 class="card-title">{{column.title}}</h5>
              <p class="card-text text-left">{{column.description}}</p>
              <a href="" class="btn btn-outline-primary">进入专栏</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 定义props
import { defineProps, PropType, computed } from 'vue'
import { ColumnProps } from '@/components/GlobalInterface' // 获取到interface 接口来指定props list的类型
// 定义Props 通过 setup语法糖需要通过 defineProps 来获取到props,在对象里定义类型
const Props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>, // 通过类型断言 让type 变成数组 内包含ColumnProps对象的类型
    required: true
  }
// 这里不用 defineProps<泛型>的原因是，vue3好像不支持这样，如果是复杂类型推荐上面的写法，这种写法值能应付简单类型
// 参考官网链接 https://cn.vuejs.org/guide/typescript/options-api.html
})
// 通过 泛型约束props的类型

// 创建计算属性 columnList过滤没有传递图片的专栏
const columnList = computed(() => {
  return Props.list?.map(column => {
    if (!column.avatar) {
      column.avatar = require('@/assets/logo.png')
    }
    return column
  })
})
</script>

<style>
</style>
