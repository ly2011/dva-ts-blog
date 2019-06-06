import axios, { AxiosRequestConfig } from 'axios'
import Qs from 'qs'

const { API_URL = '' } = process.env

axios.defaults.baseURL = API_URL // 接口地址
//设置默认请求头
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置POST请求头
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置delete请求头
// 带cookie请求 axios.defaults.withCredentials = true;

const needTransformMethods = ['post', 'POST', 'put', 'PUT', 'delete', 'DELETE']

interface ServiceAxiosRequestConfig extends AxiosRequestConfig {
  useQs?: any
}

// 创建axios实例
const service = axios.create({
  timeout: 30000 // 请求超时时间
  // transformRequest: [
  //   function(data) {
  //     // Do whatever you want to transform the data
  //     return Qs.stringify(data)
  //   }
  // ],
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

// request拦截器，设置token、POST传参序列化
service.interceptors.request.use(
  (config: ServiceAxiosRequestConfig) => {
    const { method, useQs } = config
    const token = ''
    if (!config.data) {
      config.data = {}
    }
    if (!(!useQs && useQs !== undefined) && needTransformMethods.includes(method)) {
      config.data = Qs.stringify(config.data, { allowDots: true })
    }
    config.data.token = token || ''
    return config
  },
  error => {
    // Do something with request error console.log(error); // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    return Promise.resolve(err.response)
    // return Promise.reject(err);
  }
)

export default service
