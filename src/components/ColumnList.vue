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
import { ColumnProps } from './test'
const Props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true
  }
})

// 通过 泛型约束props的类型

</script>

<style>
</style>
