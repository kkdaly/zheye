<template>
    <li class="dropdown-option" :class="{'is-disabled':disabled}">
        <slot></slot>
    </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
  }
})
</script>

<style>
/* 当li 是.dropdown-option.is-disabled 这两个class的时候就变成这个样式  */
.dropdown-option.is-disabled *{
    color: #6c757d;
    pointer-events: none;  /*不接收点击事件，由它后代元素接接收*/
    background-color: transparent;
}
</style>
