<template>
    <div class="dropdown" ref="dropdownRef">
        <a class="btn btn-outline-light my-2 dropdown-toggle  text-dark" @click="toggleOpen">{{title}}</a>
        <ul class="dropdown-menu" :style="{display:'block'}" v-if="isOpen">
        <slot></slot>
  </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
const isOpen = ref(false)
const dropdownRef = ref <null | HTMLElement>(null) // 把这个变量的名字设置成和ref相同的名字，就可以获取到ref节点了,因为在执行setup的时候dropdownRef还是null，但是在模板渲染后，会把这个变量渲染成ref，所以需要通过泛型传递一个联合类型
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const isClickOutside = useClickOutside(dropdownRef)
// console.log(isClickOutside.value)  // 这里只有setup渲染的时候打印，后面获取不到
// 因为 isClickOutside 只在setup中渲染的时候获取，所以需要监听isClickOutside的变化它如果变化就说明在下拉框或者其他页面
watch(isClickOutside, () => {
  // 如果isClickOutside 为false 并且 isOpen是开启状态，需要将下拉框关闭
  if (!isClickOutside.value && isOpen.value) {
    isOpen.value = false
  }
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

</script>
