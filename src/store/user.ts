import { makeAutoObservable } from 'mobx'
import { getUserInfo } from '@/api/user'
class CounterStore {
   info: Object = {}
  constructor() {
    makeAutoObservable(this)
  }
  async getUserInfoStore(data: any) {
    // 异步操作
    try {
      const resData = await getUserInfo(data)
      this.info = resData
    } catch {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  }
}

export default new CounterStore()
