// user信息的数据类型
export interface UserProps{
    isLogin:boolean;
    name?:string;
    id?:number;
    columnId?:number;
}
// 列表信息的类型
export interface ColumnProps{
    id:number;
    title:string;
    avatar?:string;
    description:string;
}
// 表单参数校验的数据类型
// 定义校验参数接口
type rangeProp = {message?:string, length:number} // 定义range长度类型
interface RuleProp{
    type:'required' | 'email' | 'range';
    message?:string;
    min?:rangeProp,
    max?:rangeProp
}
export type RulesProp = RuleProp[] // 将接口变成列表形式定义成 自定义类型

// 创建专栏数据类型
export interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    columnId: number;
}

// store的接口
export interface GlobalInterface {
    columns:ColumnProps[];
    posts?:PostProps[];
    user?:UserProps;
}
