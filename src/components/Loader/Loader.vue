<template>
<teleport to="#back">
  <div
    class="loader"
    :style="{backgroundColor: background || ''}"
  >
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || 'loading'}}</span>
      </div>
      <p v-if="text" class="text-primary small">{{text}}</p>
    </div>
  </div>
</teleport>
</template>

<script setup lang="ts">
import { defineProps, onUnmounted } from 'vue'
const props = defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
// 创建dom节点，因为 setup 和 beforecreate 和 create是并行的，这个时候模板还没渲染，所以可以在这里创建dom
const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node) // 向body添加dom
onUnmounted(() => {
  // 当loading组件被卸载的时候将这个dom删除
  document.body.removeChild(node)
})
</script>
<style>
.loader{
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255 , 255, .5);
    text-align: center;
}
</style>
