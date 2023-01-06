// column 专栏数据
import service from '@/utils/request'
import { ColumnProps, PostProps } from '@/components/GlobalInterface'

// 获取专栏列表的方法
const getColumns = async ():Promise<ColumnProps[]> => {
  const { data } = await service.get('/columns')
  return data.data.list
}
// 根据id获取单个专栏
const getColumn = async (cid:string):Promise<ColumnProps> => {
  const { data } = await service.get(`/columns/${cid}`)
  return data.data
}
// 根据id获取当前专栏内的专栏文章
const getPosts = async (cid:string):Promise<PostProps[]> => {
  const { data } = await service.get(`/columns/${cid}/posts`)
  return data.data.list
}

export { getColumns, getColumn, getPosts }
