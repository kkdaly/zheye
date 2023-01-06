import { defineStore } from 'pinia'

// 2.使用容器的state
import { PostProps, ColumnProps } from '@/components/GlobalInterface'
import { currentUser } from '@/mock/Mock'

import { getColumn, getColumns, getPosts } from '@/api/column'

// 1. 定义容器
// 参数1是容器的id，必须唯一，将来pinia会把所有的容器挂载到根容器
// 参数2选项对象
export const useStore = defineStore('main', {
  state: () => {
    return {
      columns: [] as ColumnProps[],
      posts: [] as PostProps[],
      user: currentUser,
      loading: false
    }
  },
  getters: {
    // 根据专栏id获取专栏
    getColumn (state) {
      return (currentId:string) => {
        return state.columns.find(c => c._id === currentId)
      }
    },
    // 根据专栏id获取该专栏的文章信息
    getPosts (state) {
      return (currentId:string) => {
        return state.posts.filter(post => post.column === currentId)
      }
    }
  },

  actions: {
    // 添加专栏文章信息
    createPost (newPost:PostProps) {
      this.posts.push(newPost)
    },
    // 获取columns专栏数据
    async fetchColumns () {
      // const { data } = await service.get('/columns')
      const data = await getColumns() // 获取专栏列表数据
      this.columns = data
    },
    // 根据专栏id获取专栏数据
    async fetchColumn (cid:string) {
      const data = await getColumn(cid)
      // const { data } = await service.get(`/columns/${cid}`)
      this.columns = [data]
    },
    // 获取专栏内的文章数据
    async fetchPosts (cid:string) {
      const data = await getPosts(cid)
      // const { data } = await service.get(`/columns/${cid}/posts`)
      this.posts = data
    },
    setLoading (status:boolean) {
      this.loading = status
    }
  }
})
