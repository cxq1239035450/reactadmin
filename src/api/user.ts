import request from '@/util/request'

export function getUserInfo(data: any) {
  return request({
    url: 'user/info',
    method: 'get',
    params: {
      id: 12345,
    },
  })
}
