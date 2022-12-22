import { ref, onMounted, onUnmounted, Ref } from 'vue'
// 注意 这里 Ref是一个构造函数，elementRef表示这个变量时Ref类型

// 判断传递的document元素是否被点击了
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useClickOutside = (elementRef:Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false) // 定义一个flag，是否点击到了外边
  const handler = (e:MouseEvent) => {
    // 判断当前点击的元素是否在ref元素里面
    // 如果在里面的话就返回true，如果没在就返回false
    if (elementRef.value?.contains(e.target as HTMLElement)) {
      isClickOutside.value = true
    } else {
      isClickOutside.value = false
    }
  }

  // 初始化的时候挂载点击事件
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  // 卸载的时候取消点击事件
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
