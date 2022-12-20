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

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
export interface ColumnProps{
    id:number;
    title:string;
    avatar:string;
    description:string;
}
export default defineComponent({
  name: 'kkdaly',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // Array是一个构造函数没办法使用类型断言，vue提供了一个propType()接收一个泛型，并返回传入的泛型类型
      // ColumnProps[]表示 这个是一个数组，数组的每一个元素是对象
      require: true
    }
    // 传入泛型后，在模版和setup中都可以自动获取到类型

  }
})
</script>

<style>
</style>
