<template>
    <ul>
        <li v-for="column in list" :key="column.id">
            <img :src="column.avatar" :alt="column.title">
            <h5>{{column.title}}</h5>
            <p>{{column.description}}</p>
            <a href="">进入专栏</a>
        </li>
    </ul>
</template>

<script setup lang="ts">
// 定义props
import { defineProps, PropType } from 'vue'
import { ColumnProps } from './ColumnListInterface' // 获取到interface 接口来指定props list的类型
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

</script>

<style>
</style>
