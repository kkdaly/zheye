// mitt自定义事件回调 （全局事件总线）
import mitt from 'mitt'
export type ValidateFunc = ()=> boolean // 定义获取到的校验函数（input组件传递过来的）
// 新版mitt会有严格的参数校验，在初始化时需要将传递的参数都通过泛型传递给mitt
type Events = {
    'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>() // 初始化mitt
