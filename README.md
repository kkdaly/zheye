# Vue3快速上手


## 简介
  - 2020年9月18号，vue3.0发布 代号 One Piece （海贼王）
  - 耗时2年多

## Vue3带来了什么
  ## 性能的提升
    - 打包大小减少41%
    - 初次渲染块55%，更新渲染块133%
    - 内存减少54%
    - ......

  ## 源码的升级
    - 使用 Proxy代替defineProperty实现响应式
    - 重写虚拟DOM的实现和Tree-Shaking
    - ......

  ## 拥抱TypeScript
    - Vue3可以更好的支持TypeScript

  ## 新的特性
    - Composition API（组合API）
    - setup配置
    - ref与reactive
    - watch与watchEffect
    - provide与inject
    - .......
  ## 其他改变
    - 新的生命周期钩子
    - data选项始终被声明为一个函数
    - ........


# 创建Vue3.0工程
 
  ## 1.使用vue-cli创建
  官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create
  ```
  ## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
  vue --version
  ## 安装或者升级你的@vue/cli
  npm install -g @vue/cli
  ## 创建
  vue create vue_test
  ## 启动
  cd vue_test
  npm run serve
  ```
  ## 使用vite创建
  vite官网：https://vitejs.cn
  官方文档 https://v3.cn.vuejs.org/guide/installation.html#vite
    - 什么事vite？  ------新一代的前端构建工具
    - 优势如下：
      - 开发环境中，无需打包操作，可快速的冷启动
      - 轻量快速的热重载（HMR）
```
    ## 创建工程
    npm init vite-app <project-name>
    ## 进入工程目录
    cd <project-name>
    ## 安装依赖文件
    npm install
    ## 运行
    npm run dev
```

# 常用的Composition API (组合api)
  ## 1.拉开序幕的setup
  1. 理解：vue3.0中一个新的配置项，值为一个函数
  2. setup是所有CompositionAPI（组合API）表演的舞台
  3. 组件中所用到的：数据方法等等，都要配置在setup中
  4. setup函数的两个返回值：
      1. 如果返回一个对象，则对象的属性，方法，在模版中可以直接使用（重点关注）
      2. 如果返回一个渲染函数，则可以自定义渲染内容（了解）
  5. 注意点
      1. 尽量不要与Vue2.0配置混用
        - vue2.x（data，methods，computed...)中可以访问到setup中的属性，方法
        - 但在setup中不能访问到vue2.x的配置（data,methods,computed...)
        - 如果有重名，setup有限
      2. setup不能是一个async函数，因为返回值不再是一个return对象，而是promise，模版看不到return对象的属性
      
  ## 2.ref函数
  - 作用：定义一个响应式的数据
  - 语法：const xxx = ref(数据值)
    - 创建一个包含响应式数据的引用对象（reference对象，简称ref对象）
    - 如果需要操作ref定义的数据需要通过 xxx.value 来读取或者修改
  - 备注：
    - 接收的数据可以是，基本类型，也可以是对象类型
    - 基本类型的数据：响应式依然是靠Object.defineProperty()的get与set完成的
    - 对象类型的数据：内部通过vue3.0中的一个新函数 ------reactive函数来实现数据响应的
  ## 3.reactive函数
  - 作用：定义一个对象类型的响应式数据（基本类型不要用它，要用ref函数）
  - 语法：const 代理对象 = reactive(源对象)接收一个对象或者数组，返回这个代理对象（proxy对象）
  - reactive定义的响应式数据是深层次的
  - 内部基于es6的proxy实现，通过代理对象操作源对象内部数据进行操作
  ## 4.vue3.0中的响应式原理
  ## vue2的响应式
  - 实现原理
    - 对象类型：通过Object.defineProperty()对属性的读取，修改拦截（数据劫持）
    - 数组类型：通过重写更新数组的一系列方法来实现拦截，（对数组的变更方法进行包裹，vue会自己写一套数组变更的方法，数组变更后就会调用vue定义的方法）
  ```
    // 通过get来返回值，通过set来定义值
    Object.defineProperty(data,'count',{
      get(){},
      set(){}
    })
  ```
  - 存在的问题：
    - 新增对象的属性，删除属性，界面不会更新（对象）
    - 直接通过下标索引修改数组，界面不会自动更新 （数组）
  ## vue3的响应式
  - 实现原理：
   - 通过Proxy（代理）：拦截对象中的属性变化，包括，属性的读写，属性的添加，属性的删除等
   - 通过Reflect（反射）：对源对象的属性进行操作，和Object.defineProperty差不多，但是有返回值，容易捕获到错误，更容易些框架，没有谁好，谁坏
   - MDN文档中描述的Proxy与Reflect
    - proxy https://developer.mozilla.org/zh-CN/docs/Web/javaScript/Reference/Global_Objects/Proxy
    - Reflect: https://developer.mozilla.org/zh-CN/docs/Web/javaScript/Reference/Global_Objects/Reflect
  ```
    new Proxy(data,{
      // 拦截读取属性
      get(target,prop){
        return Reflect.get(target,prop)
      },
      // 拦截修改属性
      set(target,prop,value){
        return Reflect.set(target,prop,value)
      },
      // 拦截删除属性
      deleteProperty(target,prop){
        return Reflect.deleteProperty(target,prop)
      }
    })
  ```
  
  ## reactive对比ref
   - 从定义的数据角度对比
    - ref用来定义：基本数据类型
    - reactive用来定义：对象（或者数组）类型的数据
    - 备注：ref也可以用来定义对象（或者数组）类型的数据，它内部会通过reactive转为代理对象

  - 从原理角度对比：
   - ref通过Object.defineProperty()的get和set来实现响应式（数据劫持）
   - reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据
  - 从使用角度对比
   - ref定义的数据：操作数据需要.value，读取数据时模版中直接读取不需要.value
   - reactive定义的数据，操作数据和读取数据都不用.value
  ## setup的两个注意点
   - setup执行的时机
    - 在beforeCreate之前执行一次，this时undefined
   - setup的参数
    - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
    - context：上下文对象
     - attrs：值为对象，包含：组件外部传递过来，但是没有在props配置中声明的属性，相当于this.$attrs
     - slots:收到的插槽内容，相当于this.$slots
     - emit: 分发自定义时间的函数，相当于this.$emit
     ```
     // context中的参数
     // props 如果 父组件给子组件传递数据了，子组件没有接收，那么在context中的attr方法中会出现，和vue2中的$attr一样，在vue3中会有提示让通过props接收

     // emit 在父组件中定义自定义事件，然后会在context中的emit方法得到这个事件，和$emit一样的效果，可以调用自定义事件来传递数据，但是vue3中还是会提示，必须通过定义 emits["事件名称"]来接收一下才不会提示

     // slots 中存储这父组件传递的插槽数据模版，如果子组件没有通过slot接收，那么就会存在slots中，vue2会存到this.$slots中
    
     ```

  ## computed函数
   - 与Vue2中的computed配置功能一致
   - 写法
   ```
   // 计算属性-完整
   let fullName = computed({
     get(){
       return persion.firstName + '-' + persion.lastName
     },
     set(value){
       const nameArr = value.split('-')
       persion.firstName = nameArr[0]
       persion.firstName = nameArr[1]
     }
    // 计算属性-简写
    let fullName = computed(()=>{
      return persion.firstName + '-' + persion.lastName
    })
   })
   ```
  ## watch函数
   - 与vue2中的watch配置功能一致
   - 两个坑
    - 监视reactive定义的响应式数据时，oldValue无法正常获取，强制开启了深度监视（deep）配置失效
    - 监视reactive定义的响应式数据中某个属性时，deep配置有效
    ```
            // 情况1 监视ref所定义的响应式数据
        watch(sum,(newValue,oldValue)=>{
            console.log('sum变了',newValue,oldValue);
        })
        // 情况2 监视ref所定义的多个响应式数据
        watch([sum,msg],(newValue,oldValue)=>{
            console.log('sum或者msg变了',newValue,oldValue);
            // 只要里面有一个值变了就返回两个值（为列表）
        },{immediate:true,deep:true})  // 这里可以再传第三个值，可以配置 deep 和 immediate


        // 情况3 监视reactive所定义的一个响应式数据的全部属性,
        // 此处无法正确获得oldValue （无法解决）
        // 强制开启了深度监视 deep配置无效
        watch(persion,(newValue,oldValue)=>{
            console.log('persion变化了',newValue,oldValue);
        })

        // 情况4 监视reactive所定义的一个响应式数据中的某个属性
        watch(()=>persion.age,(newValue,oldValue)=>{
            console.log('persion变化了',newValue,oldValue);
        })
        // 情况5 监视reactive所定义的一个响应式数据中的某些属性
        // 定义一个列表来监视多个属性
        watch([()=>persion.name,()=>persion.age],(newValue,oldValue)=>{
            console.log('persion变化了',newValue,oldValue);
        })

        // 特殊情况
        watch(()=>persion.job,(newValue,oldValue)=>{
            console.log('persion变化了',newValue,oldValue);
        },{deep:true})  // 此处监视的是reactive定义对象中的某个属性，所以deep属性配置有效

        // 如果监视的值是直接通过reactive定义的，那么deep是不生效的，强制开启深度监视
        // 如果你监视的是reactive定义的一个响应式数据中的一个对象的属性，这个时候deep是有用的
    ```
  ## watchEffect函数
   - watch的套路是：既要指明监视的属性，也要指明监视的回调
   - watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
   - watchEffect有点像computed
    - 但是computed注重计算出来的值（回调函数的返回值），所以必须要写返回值
    - 而watchEffect更注重的是过程（回调函数的函数体）所以不用写返回值
  ```
  // watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调
  watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
  })
  ```
  ## 生命周期
   - Vue3.0中可以继续使用Vue2中的声明周期钩子，但是有两个被更名了:
    - beforeDestroy 改名 为beforeUnmount
    - destroyed 改名为 unmounted
   - Vue3也提供了Composition API 形式的生命周期钩子，与Vue2中的钩子对应关系如下
    - beforeCreate ==> setup()
    - created ==> setup()
    - beforeMount ==> onBeforeMount
    - mounted ==> onMounted
    - beforeUpdate ==> onBeforeUpdate
    - updated ==> onUpdated
    - beforeUnmount ==> onBeforeUnmount
    - unmounted ==> onUnmounted
  ## 自定义hook函数
   - 什么是hook 本质是一个函数，吧setup函数中使用Composition API （组合式api）进行了封装
   - 类似于 vue2中的mixin（混入）
   - 自定义hook的优势，复用代码，让setup中的逻辑更加清楚易懂
   - 一般会创建一个hooks文件夹，而文件的名称为 use数据名.js
  
  ## toRef
   - 作用：创建一个ref对象，其value值只想另一个对象中的某个属性
   - 语法：const name = toRef(person,'name')
   - 应用：要将响应式对象中的某个属性单独提供给外部使用时
   - 扩展toRefs与toRef功能一致，但可以批量创建多个ref对象，语法：toRefs(person)
  
# 其他 Composition API
  ## shallowReactive 与 shallowRef
   - shallowReactive：只处理对象最外层属性的响应式（浅响应式）
   - shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
   - 什么时候使用？
    - 如果有一个对象数据，结构比较深，但变化时只是外层属性发生变化 ===》 shallowReactive
    - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换 ===》shallowRef
  ## readonly 与 shallowReadonly
   - readonly：让一个响应式数据变成只读的（深只读）
   - shallowReadonly：让一个响应式数据变为制度的（浅只读）
   - 应用场景：不希望数据被修改时
  
  ## toRaw 与 markRaw
   - toRaw
    - 作用: 将一个reactive生成的响应式对象转为普通对象
    - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面的刷新
   - markRaw
    - 作用：标记一个对象，使其永远不再成为响应式对象
    - 应用场景：
     - 有些值不该为设置为响应式的，例如复杂的第三方类库
     - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能
  ## customRef
   - 作用: 创建一个自定义的ref，并对其依赖项跟踪和更新出发显式控制
   - 实现防抖效果
  ```
  <template>
  <input type="text" v-model="keyWord">
  <h3>{{keyWord}}</h3>
  <input type="text" v-model="keyWord1">
  <h3>{{keyWord1}}</h3>
  </template>

  <script>

  import {ref,customRef} from 'vue'
  export default {
   name:'App',
   components:{},
   setup(){
     // 自定义一个ref
     function myref(value,dely){
       let timer
       console.log(value);
       // 通过 customRef来定义自定义ref
       return customRef((track,trigger)=>{
         return {
           get(){
             console.log('有人从myref读取数据了，我把值给他了');
             track() // 这里要先监控一下value的改变，否则get不会重新去解析，返回新的数据的
             // 通知vue追踪value的变化（提前和get商量一下，让他认为value是有用的）
             return value
           },
           set(newvalue){
             console.log('有人吧myref数据改了');
             console.log(value);
             clearTimeout(timer)
              timer = setTimeout(() => {
                value = newvalue
                // 通过customRef中接到的trigger来重新去渲染模版，然后调用get去获取新的数据，而get必须通过track来返回新的数据所以会重新渲染模版
                trigger()
              }, dely);
  
          }
          }

       })

     }
     let keyWord = ref('hello')  // 使用vue提供的内置ref
     let keyWord1 = myref('hello',1000) //使用程序员自定的ref

      return {
       keyWord,
       keyWord1
      }
    }
    }
  </script>

  <style>

  </style>
  ```
   ## provide 与 inject
    - 作用：实现祖孙组件之间的通讯
    - 套路：父组件有一个provide选项来提供数据，后代组件有一个jnject选项来使用这些数据
    - 具体写法
     - 父组件中
     ```
     setup(){
       let car = reactive({name:'lmk',price:40})
       provide('car',car)
     }
     ```
     - 后代组件中
     ```
     setup(props,context){
       const car = inject('car')
       return {car}
     }
     ```
  ## 响应式数据的判断
   - isRef：检查一个值是否为ref对象
   - isReactive：检查一个对象是否由reactive创建的响应式代理
   - isReadonly：检查一个对象是否由readonly创建的只读代理
   - isProxy：检查一个对象是否由reactive或者readonly方法创建的代理
# Composition API的优势
 - Options API 存在的问题
  - 传统 api中，新增或者修改一个需求，就需要分别在data，methods，computed里修改
 - Composition API的优势
  - 可以更优雅的组织代码，函数，让相关的功能更加有序的组织在一起

# 新的组件
 ## Fragment
  - 在Vue2中：组件必须是一个标签
  - 在Vue3中 组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
  - 好处：减少标签层级，减少内存占用
 ## Teleport
  - 什么事Teleport  是一个种能够让我们的组件html结构移动到指定位置的技术
  ```
   <teleport to="html">    // 这里的 to可以写 html元素 或者是标签选择器 写谁，里面的元素就在哪生成
     <input type="text">
   </teleport>
  ```
 ## Suspense
  - 等待异步组件时渲染一些额外的内容，让用户有更好的体验
  - 使用步骤
   - 异步组件引入
   ```
   import {defineAsyncCompont} from 'vue'
   const Child = defineAsyncCompont(()=>import('./components/Child.vue))
   ```
   - 使用Suspense包裹组件，并配置好default与fallback
   - 并且 setup还可以返回promise对象，实现异步，前提是必须有Suspense这个标签包裹和异步引入这个组件
   ```
   <template>
  <div class="app">
    <h3>我是app组件</h3>
    // 他是通过 插槽实现的 需要传两个插槽
    <Suspense>
    // 第一个插槽是要展示什么（这里展示的是 Child这个组件 ）
        <template v-slot:default>
          <ChildVue />
        </template>
        // 第二个插槽是如果上面的没加载出来就展示这里的
        <template v-slot:fallback>
          <h1>稍微等下child</h1>
        </template>
    </Suspense>

  </div>
  </template>

  <script>
  // import ChildVue from './commponents/child.vue' // 静态引入
  import { defineAsyncComponent} from 'vue'
  const ChildVue = defineAsyncComponent(()=>import('./commponents/child.vue'))  // 动态引入组件（异步引入）
  export default {
   name:'app',
   components:{ChildVue},
   setup(){

     return {
        }
    }
  }
  </script>

  <style>
    .app{
      background-color: gray;
      padding: 10px;
      }
  </style>
   ```
# 其他
 ## 全局API的转移
  - vue2种有许多全局api和配置
   - 例如 注册全局组件，注册全局指令等
   - 将vue2中的全局api改成组件式api的好处是可以服用，因为全局的容易引起混乱
   - 全局api在单元测试中非常容易污染环境
   - 在不同的apps中做到拥有不同配置的vue配置对象也非常困难
  - Vue3对这些api做出了调整
   - 将全局api （Vue.xxx)调整到（app）上
   - config.productionTip 被删除没有开发环境提示的log了
   - config.inrnoredElements 改名为config.isCustomElement
   - 移除了config.keyCods
   - 使用了TreeShaking，通过组件是api 动态的from引入组件，如果这个组件没有用到就不会被webpack打包到源码中，大大减少了代码体积

 ## 其他改变
  - data选项始终被声明为一个函数
  - 过度类名的更改

## provide 和inject
 - 适用于深层的父子之间的数据传递
 - 比如 爷爷传给孙子数据，父亲不需要这个数据，传统的方式通过props传递也需要传给父亲，通过provide和jnject可以在爷爷和孙子之间传递
 - 一下代码都是通过 typescript写的
```
  // 谁要发送数据谁就用 provide
  import {provide} from 'vue';
  setup(){
    provide('事件名1','数据') // 注意 provide只能在setup 和 hooks函数内使用，在setup内定义函数会提示
    return {}
  }
  // 谁要接受数据谁就用 inject
  import {inject} from 'vue';
  setup(){
    const value = inject('事件名1')
    if (value){
      console.log(value) // 将接受到的数据打印下来
    }
  }
```
```
  // 定义全局可用的数据
  main.ts
  import {createApp} from 'vue'
  import App from './App'
  const app = createApp(App)
  app.provide('index','我是main.ts传递的全局数据，谁都可以获得我')
  app.mount('#app')

  // 在任意组件内都可以获取
  setup(){
    const index = inject('index')
    if (index){
      console.log(index) // 获取到index
    }
  }
```
 - 组件使用
```
// app.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png"> 
  <div>我是爷爷组件 <span>数据是{{value}}</span></div>
  <Father />
</template>

<script lang="ts">
 import {defineComponent,ref,provide} from 'vue'
import Father from './components/father.vue'
export default defineComponent({
  setup() {
    let value = ref('传家宝')
    provide('baobei',value)  // 通过 provide 向任意一个子组件传递数据
    return {
      value
    }
  },
  components:{
    Father
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
 - 父组件
```
<template>
  <div>我是父组件</div>
  <div>我获取到了main的全局数据:{{value}}</div>
  <SonVue />
</template>

<script lang='ts'>
import SonVue from './son.vue'
  import {defineComponent,inject} from 'vue'
  export default defineComponent({
      name:"FatherVue",
      setup(){
        const value = inject('index')
        return {
            value
        } 
      },
      components:{
          SonVue
      }
  })
</script>

<style>
</style>

```
 - 子组件
```
<template>
  <span>我是孙子组件</span><span>得到爷爷的宝贝：{{baobei}}</span>
  <button @click="setValue">孙子把爷爷的宝贝给卖了买了玩具</button>
</template>

<script lang='ts'>
  import {defineComponent,inject} from 'vue'
  export default defineComponent({
      name:"SonVue",
      setup(){
        const baobei = inject<{value:string}>('baobei')
        console.log(baobei);



        const setValue =()=>{
        if (baobei && baobei.value){
            baobei.value = 'kkdaly'
        }
        }
        

          return {
              baobei,
              setValue
          }
      }
  })
</script>

<style>
</style>

```
 - main.ts
```
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.provide('index','我是main.ts传递的全局数据，谁都可以获得我')
app.mount('#app')

```

# script setup语法糖
 - 可以大大简化代码编写不用在setup内编写函数就可以直接在模版内使用响应式数据
## 基础用法
```

// 父组件
<template>
  <img alt="Vue logo" src="./assets/logo.png"> 
  <h1>{{hello}}</h1>
  <kkdaly-vue  :name="hello" @kkdaly="getValue"></kkdaly-vue>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const hello = ref('hello')  // 使用setup语法糖可以不用return 直接就可以在模版里面使用响应式的变量 

const getValue = (data:string)=>{
  alert('我是父组件定义的自定义事件，我被子组件调用了，他可以像我这里传入数据')
  alert(data)
}
// 通过 props 给子组件传递数据
const user = {
  name:'lmk',
  age:123
}
</script>
```

```
// 子组件
<script setup lang="ts">
import {defineProps,defineEmits} from 'vue' // 获取defineProps 和 defineEmits 用来接受props 和传递数据
// 使用props
 const props = defineProps({
   name: String  // 接收父组件传递来的name自定义数据
 })

// 使用emit
 const emit = defineEmits(['kkdaly'])  // 获取父组件定义的自定义事件
 const setValue = ()=>{ 
   emit('kkdaly','子组件的名称是'+props.name)  // 触发自定义事件，并给父组件传递参数
// }
</script>
```
## 通过接口和泛型来使用props 和 emit
```
// 父组件
<template>
  <img alt="Vue logo" src="./assets/logo.png"> 
  <h1>{{hello}}</h1>
  <kkdaly-vue :user="user" @lmk="getValue"></kkdaly-vue>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import kkdalyVue from './components/kkdaly.vue'  // 这里vue3不需要使用components来注册组件即可在模版里使用子组件

const getValue = (data:string)=>{
  alert('我是父组件定义的自定义事件，我被子组件调用了，他可以像我这里传入数据')
  alert(data)
}
// 通过 props 给子组件传递数据
const user = {
  name:'lmk',
  age:123
}
</script>
```
```
// 子组件
<script setup lang="ts">
import {defineProps,defineEmits} from 'vue'
// 通过泛型来确定传递的prop数据
// 定义props的接口（类型）
interface Iuser {
  name:string;
  age:number
}
// 定义emit的数据接口
interface IEvent{
  (e:"lmk",name:string):void // 这里表示式一个函数 因为emit就是一个函数他有两个参数 事件名称和传给父组件的值
}
defineProps<{user:Iuser}>() // 通过泛型和接口来对props的类型进行一个精确的控制 让他变成 name:string;age:number的类型
const emit = defineEmits<IEvent>()  // 通过泛型来限制在传递数据的时候让ts能够检查emit的类型
emit('lmk','我是子组件我给父组件传递数据') // 这里lmk就会有提示了

</script>
```


# 项目开始
## Vue3中props定义类型
```
// 子组件 setup 语法糖模式
import {defineProps,PropType} from 'vue' 

// 定义接口
interface ColumnProps{
    id:number;
    title:string;
    avatar:string;
    description:string;
}

const props = defineProps({
  list:{
    type:Array as PropType<ColumnProps[]>, // 这里通过 PropType将Array这个类型通过 as 断言成 数组下对象的形式[{id:1,title:'',avatar:'',description:''}] 类似这种形式
    required:true
  }
})
// 这里不用 defineProps<泛型>的原因是，vue3好像不支持这样，如果是复杂类型推荐上面的写法，这种写法值能应付简单类型
// 参考官网链接 https://cn.vuejs.org/guide/typescript/options-api.html
```
## PropType
 - PropType就是为了给Props设置更复杂的类型所诞生的
 - 它接受一个泛型，返回这个泛型类型 比如将 Array这个不具体的类型转换成更复杂的类型，因为 props的type只能接受类型构造函数，所以需要转一下
 - 使用vue默认的Array,只能确定它是一个数组类型,不能确定数组里面的每一项到底是什么样子的 你在setup中,看props.list就是一个any数组,但是如果使用propType<ColumnProps[]\>这个时候,props.list就变成一个ColumnProps的数组,你使用它的时候不论在 ts 中还是模版中都能获得类型的推断和自动补全等等。
 - 使用方式参考上面

# Form 和Input组件
## Form
 - form模板
```html
<template>
    <form  class="validate-form-container">
      <!-- 通过插槽接收input组件 -->
        <slot name="default"></slot>
        <div class="submit-area" >
          <!-- 定义一个具名插槽，用来接收用户传递的button，如果没有传递就使用这里默认定义的 -->
            <slot name="submit">
                <span class="btn btn-danger" @click="submitForm"> submit</span>
            </slot>
        </div>
    </form>
</template>
```
 - 功能实现
```typescript
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'  // 导入mitt 因为vue3中没有$on $off这些功能了
type ValidateFunc = ()=> boolean // 定义获取到的校验函数（input组件传递过来的）
let funArr:ValidateFunc[] = [] // 存放input的信息，执行后会获得是否通过
// 新版mitt会有严格的参数校验，在初始化时需要将传递的参数都通过泛型传递给mitt
type Events = {
    'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>() // 初始化mitt
/**
 * FORM的功能
 * 1. 在初始化from 的时候 需要通过 mitt 定义一个自定义事件来监听input传递的校验参数
 * 2. 当input触发校验参数后会将校验函数全部传递到一个数组内，这个时候需要等待用户的点击提交按钮来执行校验功能
 * 3. 点击功能：
 *    用户不传递button时，是会默认显示一个按钮的
 *    用户传递button时，会使用用户的按钮
 *    用户不传递按钮的情况下会默认执行form下自定义的参数校验功能，这个时候form需要传递一个自定义事件 form-submit ，使用自定义事件的组件需要监听，返回值就是校验结果
 *    用户传递按钮，需要给按钮定义点击事件，在点击事件内通过form组件内的参数校验功能validate来判断是否校验成功
 */
export default defineComponent({
  emits: ['form-submit'], // 声明自定义事件
  setup (props, context) {
    // 1. 在初始化form时监听自定义事件
    // 定义mitt的callback回调函数，input组件初始化后会把校验函数发送到当前组件自定义的事件中，
    const callback = (func:ValidateFunc) => {
      funArr.push(func) // 将input的信息push到列表中
    }
    // 定义自定义事件
    emitter.on('form-item-created', callback)
    // 销毁自定义事件
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funArr = []
    })

    // 点击功能1
    // 定义点击事件，将获取到的input循环执行并返回
    // 这个功能是在用户没有给form传递button的时候调用的，form没有传递button会自动引用默认的button，引用默认的button需要在form自定义一个事件，用来接收form组件内点击的结果
    const submitForm = () => {
      const result = funArr.map(func => func()).every(result => result)
      context.emit('form-submit', result) // 触发事件将校验结果返回，用户必须在form定义自定义事件
    }

    // 点击功能2
    // 定义校验函数
    // 校验是否是符合定义的校验要求,需要用户在 form表单定义ref，通过ref获取到表单的validate判断参数是否校验成功
    const validate = () => {
      const result = funArr.map(func => func()).every(result => result)
      return result
    }

    return {
      submitForm,
      validate

    }
  }
})
</script>
```
## Input组件 
 - template模版
```html
<template>
    <div class="validate-input-container pd-3">
        <input
            class="form-control"
            :class="{'is-invalid'
            :inputRef.error}"
            :value="inputRef.val"
            @input="updateValue"
            @blur="validateInput"
            v-bind="$attrs"
             >
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
    </div>
</template>
```
 - 功能实现
```typescript
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

// 定义校验参数接口
type rangeProp = {message?:string, length:number}
interface RuleProp{
    type:'required' | 'email' | 'range';
    message?:string;
    min?:rangeProp,
    max?:rangeProp
}
export type RulesProp = RuleProp[] // 将接口变成列表形式定义成 自定义类型
export default defineComponent({
  /**
   * input的功能
   * 1. v-model 父组件通过 v-model传递一个值过来，子组件如果改变了传递的值，那么父组件内传递的值也会被改变
   *    功能实现：
   *      在vue2中v-model 会给子组件传递一个 名为 value的props，这个value就是v-model传递的值
   *      在vue2中v-model 还会给子组件定义一个自定义事件 input，当子组件触发这个自定义事件，并且传递了值时，那么父组件传递的值就会被改变
   *      但是在vue3中 value 被改成了 modeValue, input这个自定义事件被改成了update:modelValue，所以不影响，只是名字变了
   *      1. 我们先通过接收 modeValue， 给input表单绑定 inputRef定义的value值，（props.modelValue || ''）如果modeValue存在就复制给input表单，如果不存在就给input表单赋值为空字符串
   *      2. input表单定义input事件，这个事件只要表单内的值有修改就会触发，我们在该事件内修改input的值，并通过emit触发update:modelValue，将值传给父组件修改父组件的数据，这样就实现了双向数据绑定
   * 2. 表单校验功能
   *    功能实现：
   *      需要父组件传递一个ruls校验规则，子组件通过validateInput 来获取到ruls，进行表单校验，校验完成后返回校验结果并渲染模板提示用户失败原因
   *      还有一个功能和from组件联动的，在初始化的时候mounted时将组件的表单校验函数通过触发自定义事件来向form组件传递校验函数，form组件拿着校验函数去做校验
   */
  props: {
    // input表单校验传递的props
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: String // v-model传递的props
  },
  inheritAttrs: false, // 不希望 attrs继承到组件的根元素中，因为，我们在给组件传递props时，如果子组件不接收，就会放到attr上并给组件的根元素添加上传递的props
  setup (props, context) {
    // 创建input值的对象和校验对象
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // 定义v-model更新函数
    // 在vue3中，v-model中是有所改变的
    // vue2 的 props（value）改成了modelValue: vue2的 input事件也改成了 update:modelValue事件
    // vue3 在父组件定义v-model时 会给子组件传递 modelValue这个props属性，给子组件定义update:modelValue这个自定义事件
    // 如果子组件获取到modelValue就可以获取到父组件传递的数据，如果子组件通过自定义事件传递了一个值，那么父组件传递的值就会被修改

    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    // 创建input表单校验函数
    const validateInput = () => {
      if (props.rules) {
        // every 只要遇到false就直接退出，需要将allPassed取反
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message || ''
          switch (rule.type) {
            case 'required': // 校验必填
              passed = (inputRef.val.trim() !== '') // 不等于空 就是true

              break
            case 'email': // 校验邮箱
              passed = emailReg.test(inputRef.val) // 正则校验完成 符合正则就是true
              break
            case 'range': // 校验最长字符
            // 校验分三种情况，
            // 1.如果min 和 max 都传递了，那么需要判断他俩是否都符合
            // 2. 如果一次只传递了min,那么只需要判断是否小于
            // 3. 如果一次只传递了max,那么只需要判断是否大于
            // 因为这里用的 every 只要遇到false才退出，这里都是校验的input不符合的情况才为true，所以需要取反
              if (rule.min && rule.max) { // 都传递的情况
                console.log(1)
                passed = !(inputRef.val.trim().length < rule.min.length || inputRef.val.trim().length > rule.max.length)
              } else if (rule.min) { // 只传递了min的情况
                passed = !(inputRef.val.trim().length < rule.min.length) // 小于长度就是true，取反
                if (!passed) {
                  if (rule.min?.message) {
                    inputRef.message = rule.min?.message
                  }
                }
              } else if (rule.max) { // 只传递了max的情况
                passed = !(inputRef.val.trim().length > rule.max.length) // 大于就是true，取反，让循环抛出错误
                if (!passed) {
                  if (rule.max?.message) {
                    inputRef.message = rule.max?.message
                  }
                }
              }
              break
          }
          return passed
        })
        inputRef.error = !allPassed // allPass就是校验的结果,需要将allPassed取反才行，因为every返回的是false，false就是校验失败
        return allPassed // 返回校验结果 false 是没有成功 ，true是校验成功
      }
      return true // 如果没有传递 rules就直接返回true
    }
    // 初始化的时候向form组件传递 校验函数
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }

})
</script>
```
## App使用
 - template模版
```html
<template>
    <!-- form 传入 自定义事件，是在没有传递button的时候生效的 -->
    <ValidateForm class="row g-3" @form-submit="onFormsubmit" ref="inputRef">
  <div class="col-auto">
    <label for="staticEmail2" class="visually-hidden">Email</label>
    <ValidateInput  :rules="emailRules" v-model="emailValue" type="text" placeholder="请输入邮箱地址"></ValidateInput>
  </div>
  <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Password</label>
    <ValidateInput :rules="passwordRules"  v-model="emailValue" type="password" placeholder="请输入密码"></ValidateInput>
  </div>
  <template #submit>
      <span class="btn btn-danger" @click="openAdd">提交</span>
  </template>
</ValidateForm>
</template>
```
 - 使用代码
```typescript
<script>
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
export default defineComponent({
  name: 'App',
  components: {
    ValidateInput,
    ValidateForm
  },
    setup () {
    const inputRef = ref<any>() // 获取form表单的ref，ref可以调用form表单的方法
    // 用户自己添加的button的点击事件 
    const openAdd = () => {
      console.log(inputRef.value.validate())    // 通过ref获取到form组件内的validate方法来验证校验是否通过
    }
    // 用户没传递button时，form自定义事件接收的函数，么有传递button时，form会使用自己定义的button，需要通过自定义事件获取到button校验结果
    const onFormsubmit = (result:boolean) => {
      console.log(result, '校验结果')
    }
    // 定义一个校验规则
    const emailRules:RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    // 定义一个校验规则
    const passwordRules:RulesProp = [
      { type: 'required', message: '密码不能为空' },
      // { type: 'range', message: '密码不能小于6位,不能大于12位', min: { length: 6 }, max: { length: 12 } }
      { type: 'range', min: { message: '密码不能小于6', length: 6 } },
      { type: 'range', max: { message: '密码不能大于12', length: 12 } }

    ]
})
</script>

```
# Vue3中的Router
 - vue3中router是 4.0版本的vue-router,
 - vue2中router是 3.0版本的
## 使用router
 - router.ts
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'

const routerHistory = createWebHistory() // 路由类型函数 就是vue2的history路由
// createWebHashHistory 就是hash路由 带#号的

const router = createRouter({
  history:routerHistory,  // history是路由的模式
  routes:[ // 配置路由
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isLogin: true }
    }
  ]
})
export default router // 导出路由

```
 - main.ts
```
import { createApp } from 'vue' // 创建vue
import App from './App.vue'  // 引入根模板
import router from './router'  // 引入路由配置
const app = createApp(App)  // 创建vue实例
app.use(router) // 引入 router配置
app.mount('#app') // 挂载模板

// 引入router，并挂载后，访问/login就会进入login的页面了
```
## useRoute 和 useRouter
 - useRoute就是 vue2中的this.route
```typescript
// 使用
import { useRoute } from 'vue-router'
const route = useRoute()  // 创建实例
console.log(route.query) // 获取当前类路由传递的query参数
```
 - useRouter就是 vue2中的 this.router
```typescript
import {useRouter} from 'vue-router'
const router = useRouter() // 创建实例
router.push('/') // 跳转路由
```
## 路由守卫
 - 路由守卫没有改变
```typescript
import { createRouter } from 'vue-router'
const router = createRouter({...})
// 定义前置路由守卫
router.beforeEach((to, from, next) => {
  // 如果进入的路由需要登陆的话，没登陆就会跳转到login
  if (to.meta.requiredLogin && !store.user.isLogin) {
    next('/login')
  } else if (to.meta.isLogin && store.user.isLogin) { //   如果登录了，还是去login的话会强制跳转到/路由
    next('/')
  } else {
    next()
  }
})
```

# Vue3中的vuex
 - vue3中的vuex 是 4.0版本
## 使用vuex
 - store.ts
```typescript
import { createStore } from 'vuex'  // 引入vuex
const store = createStore({
  // state数据
  state:{
    count:0
  },
  mutations:{
    // 定义修改state中count的方法
    add(state,num){
      state.count +=num
    }
  },
  actions:{},
  getters:{
    // 定义getter 相当于vue中的计算属性
    getCount(state){
      return state.count
    }
  },

})
``` 
 - main.ts
```typescript
import { createApp } from 'vue' // 引入vue
import App from './App.vue'  // 引入html模板
import store from './store' // 引入store配置
const app = createApp(App) // 实例化app
app.use(store) // app引入store
app.mount('#app') // 挂载模板
```
## useStore
 - 可以通过useStore在vue模板里面使用store数据
```typescript
import {useStore} from 'vuex'
const store = useStore() // 实例化store
const count = store.state.count // 获取store的数据
store.commit('add') // 调用muations修改state的数据
const getCount = compunted(()=>store.getter.getCount)  // 通过计算属性返回getter的数据
```


# Pinia的使用
## 什么是Pinia
 -  最初是在 2019 年 11 月左右重新设计使用 Composition API
 - 同时支持 vue2 和vue3
 - 并且不需要您使用组合 API。 除了安装和 SSR 之外，两者的 API 都是相同的

## 为什么要使用Pinia
 - 是vue的存储库，它允许您跨组件/页面共享状态
 - dev-tools的支持 
 - 热模块的更换
 - 支持typescript
 - 服务端渲染的支持
## 安装
```
npm install pinia

// pinia最新版需要typescript4.4.4以上版本才支持
```
## 基本使用
 - main.ts
```typescript
import {createApp} from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' //引入pinia
// 创建pinia实例
const pinia = createPinia()
app = createApp(App)
app.use(pinia) // 挂载pinia
app.mount('#app')
```
 - sotre.ts
```typescript
// 配置store数据
import { defineStore } from "pinia"
// 1.定义容器
// 参数1：容器的ID，必须唯一，将来pinia会把所有的容器挂载到跟容器，每个容器的名字就是这里的ID
const useMainStore = defineStore('main',{
/**
 * state类似于组件的data（setup）用来存储全局的状态
 * 1. state必须是函数，这样是为了更好的在服务端渲染时避免交叉请求导致的数据污染，如果是客户端渲染则无所谓
 * 2. 必须是箭头函数，这样是为了更好的ts类型推导
 * 3. 返回值是一个函数，调用该函数即可得到容器实例
 */
 state:()=>{
  return {
    count:100,
    arr:[1,2,3]
  }
 },
 /**
  * 类似于组件的coumputed,用来封装计算属性，有缓存功能，在同一组件中多次调用则只调用一次
  */
 getters:{
  // getter有两种定义的方式，
  // 1. 一种可以通过获取到state来操作数据，这样有ts的类型推导
  // 2. 第二种可以通过this的方式来操作state，这样没有类型推导
  CountJIA(state){
    return state.count++
  }
  //（不建议）如果不使用state而使用this，此时就不能对返回值类型做自动推导了，必须手动指定
  countJIA():number{
    return this.count++ 
  }
 },
 actions:{
  /**
   * 注意 不能使用箭头函数来定义actions，一定要使用普通函数，因为使用箭头函数就没办法使用this了
   */
  changeState(num:number){
    // 单独修改state
    this.count = num
    //批量修改state
    this.$path((state)=>{
      state.count += num
      state.arr.push(4)
    })
  }
 }
})
export default useMainStore //将数据暴露出去
```
## 在组件中使用pinia存储的数据
 - main.vue
```html
<template>
  <div>{{store.arr}}</div>
  <div>{{count}}</div>
  <button @click="setValue"></button>
</template>

<script setup lang="ts">
import useStore from '../store.ts' // 导入上面定义的pinia配置
// 【哪里使用写哪里】，此时要在HelloWorld组件中用，那就写这里。这很Composition API
const store = useStore() // 实例化store数据

// 获取到sotre的数据
// 禁止！这样会丧失响应性，因为pinia在底层将state用reactive做了处理
// const { count, arr } = mainStore
// 解决方案：将结构出的数据做ref响应式代理
const {count,arr} =  storeToRefs(store) //如果需要解构赋值，需要通过pinia提供的sotreToRefs来解构，因为store下都是reactive定义的数据，如果单纯的解构只会获取到值，不会获取到proxy对象

const setValue = ()=>{
  // ==============数据修改的几种方式=============
  // 方式一：直接修改
  store.count++
  // 方式二 使用$path(对象)，批量修改，如果需要修改多个数据建议使用这个方法，因为底层做了性能优化
  store.$path({
    count: store.count += 1,
    arr: [...store.arr,4] // 这就不优雅了，所以有了方式三
  })
  // 方式三 使用$path(回调函数)，这个更优雅，更推荐
  // 回调函数中的state参数，就是store里面定义的state
  store.$path((state)=>{
    state.count++
    state.arr.push(4)
  })
  // 方式四 当逻辑较为复杂的时候应该封装到actions中，并对外暴露
  store.CountJIA()
}


</script>
```

# Pinia的使用问题
## 在vue3中使用异步方法
 - 在vue3中使用异步的话，如果不对异步操作进行限制的话，默认会先执行setup中其它的同步函数，执行完同步函数后才会执行异步函数
 - 解决方法： 可以在setup 或者setup语法糖中使用 async await 让异步操作变成同步的，不过需要在该组件的父组件内加入 <Suspense /> 组件来接受这个组件的promise
 - 详情见 https://coding.imooc.com/learn/questiondetail/GjNdEXKDenq69rn4.html
## pinia的局部导入使用，顺序问题
```
import axios from 'axios'

import { useStore } from '@/store'

// 导出axios
// 实例化axios
const service = axios.create({
  baseURL: 'http://apis.imooc.com/api/',
  timeout: 5000
})
// 创建请求拦截器
service.interceptors.request.use(config => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 这里
  const store = useStore() // 这里为什么要在拦截器里面引入还是以因为顺序问题，request被引入的时候pinia的实例是没有被创建的，所以我们需要等待pinia的实例创建完成后才能后调用pinia
  //  https://blog.csdn.net/u011401390/article/details/123074721

  store.setLoading(true)
  // 拦截请求给添加code参数
  if (config.method === 'get') {
    // get 请求，添加到 url 中
    config.params = { ...config.params, icode: 'CC11D7C996704085' }
  } else {
    // 其他请求，添加到 body 中
    // 如果是上传文件，添加到 FormData 中
    if (config.data instanceof FormData) {
      config.data.append('icode', 'CC11D7C996704085')
    } else {
      // 普通的 body 对象，添加到 data 中
      config.data = { ...config.data, icode: 'CC11D7C996704085' }
    }
  }
  return config
})

// 创建响应拦截器
service.interceptors.response.use(config => {
  const store = useStore() // 这里为什么要在拦截器里面引入还是以因为顺序问题，request被引入的时候pinia的实例是没有被创建的，所以我们需要等待pinia的实例创建完成后才能后调用pinia
  //  https://blog.csdn.net/u011401390/article/details/123074721
  store.setLoading(false)

  return config
})
export default service
```