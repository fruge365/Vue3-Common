import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求队列
const pendingRequests = new Map()
let loadingInstance = null
let loadingCount = 0

// 显示loading
const showLoading = () => {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service({
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  loadingCount++
}

// 隐藏loading
const hideLoading = () => {
  loadingCount--
  if (loadingCount <= 0) {
    loadingInstance?.close()
    loadingInstance = null
    loadingCount = 0
  }
}

// 生成请求key
const generateRequestKey = (config) => {
  return `${config.method}:${config.url}:${JSON.stringify(config.params)}:${JSON.stringify(config.data)}`
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 防重复请求
    const requestKey = generateRequestKey(config)
    if (pendingRequests.has(requestKey)) {
      const cancelToken = pendingRequests.get(requestKey)
      cancelToken.cancel('重复请求被取消')
    }
    
    // 创建取消令牌
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    pendingRequests.set(requestKey, source)
    
    // 添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 显示loading（可通过config.hideLoading = true关闭）
    if (!config.hideLoading) {
      showLoading()
    }
    
    return config
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 移除请求队列
    const requestKey = generateRequestKey(response.config)
    pendingRequests.delete(requestKey)
    
    // 隐藏loading
    if (!response.config.hideLoading) {
      hideLoading()
    }
    
    // 统一处理响应数据
    const { data, code, message } = response.data
    
    // 根据业务状态码处理
    if (code === 200 || code === 0) {
      return response.data
    } else if (code === 401) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('token')
      router.push('/login')
      return Promise.reject(new Error(message || '登录已过期'))
    } else if (code === 403) {
      ElMessage.error('没有权限访问该资源')
      return Promise.reject(new Error(message || '权限不足'))
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  (error) => {
    // 移除请求队列
    if (error.config) {
      const requestKey = generateRequestKey(error.config)
      pendingRequests.delete(requestKey)
    }
    
    // 隐藏loading
    if (error.config && !error.config.hideLoading) {
      hideLoading()
    }
    
    // 处理取消请求
    if (axios.isCancel(error)) {
      console.log('请求被取消:', error.message)
      return Promise.reject(error)
    }
    
    // 处理网络错误
    let errorMessage = '网络异常，请稍后重试'
    
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          errorMessage = data?.message || '请求参数错误'
          break
        case 401:
          errorMessage = '登录已过期，请重新登录'
          localStorage.removeItem('token')
          router.push('/login')
          break
        case 403:
          errorMessage = '没有权限访问该资源'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = data?.message || `请求失败 (${status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请稍后重试'
    } else if (error.message.includes('Network Error')) {
      errorMessage = '网络连接失败，请检查网络'
    }
    
    ElMessage.error(errorMessage)
    return Promise.reject(error)
  }
)

// 导出实例
export default request

// 导出常用方法
export const get = (url, params, config = {}) => {
  return request.get(url, { params, ...config })
}

export const post = (url, data, config = {}) => {
  return request.post(url, data, config)
}

export const put = (url, data, config = {}) => {
  return request.put(url, data, config)
}

export const del = (url, config = {}) => {
  return request.delete(url, config)
}