import { defineStore } from 'pinia'

// 2.使用容器的state
import { PostProps } from '@/components/GlobalInterface'
import { testData, testPosts, currentUser } from '@/mock/Mock'

// 1. 定义容器
// 参数1是容器的id，必须唯一，将来pinia会把所有的容器挂载到根容器
// 参数2选项对象
const useStore = defineStore('main', {
  state: () => {
    return {
      columns: testData,
      posts: testPosts,
      user: currentUser
    }
  },
  getters: {
    // 根据专栏id获取专栏
    getColumn (state) {
      return (currentId:number) => {
        return state.columns.find((c: { id: number }) => c.id === currentId)
      }
    },
    // 根据专栏id获取该专栏的文章信息
    getPosts (state) {
      return (currentId:number) => {
        return state.posts.filter((post: { columnId: number }) => post.columnId === currentId)
      }
    }
  },

  actions: {
    // 添加专栏文章信息
    createPost (newPost:PostProps) {
      this.posts.push(newPost)
    }
  }
})

export default useStore
