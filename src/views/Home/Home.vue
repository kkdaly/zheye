<template>
      <div class="home-page">
        <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <img src="../../assets/callout.svg" alt="callout" class="w-50"/>
              <h2 class="font-weight-light">随心写作，自由表达</h2>
              <p>
                <a href="#" class="btn btn-primary my-2">开始写文章</a>
              </p>
            </div>
          </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <column-list :list="list"></column-list>
      </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ColumnList from '@/components/ColumnList/ColumnList.vue' // 实例化store
import { useStore } from '@/store'
// home页
const store = useStore()
const list = computed(() => store.columns)
store.fetchColumns()
// const list = store.columns

</script>
