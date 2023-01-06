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
