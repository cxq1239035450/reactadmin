import ky from 'ky'
import { responseType, optionsType, kyOptionsType } from '@/type/request'

const baseURL = import.meta.env.VITE_BASE_URL // api的base_url

const service = ky.create({
  prefixUrl: baseURL,
  timeout: 60000,
  retry: 1,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    /*
    Type: Function[]
    Default: []
    new Response()来替代返回结果
    */
    beforeRequest: [
      // request => {
      //   const token = 1
      //   request.headers.set('Authorization', `token ${token}`)
      // },
    ],
    //重试前
    beforeRetry: [],
    //错误前
    beforeError: [],

    afterResponse: [],
  },
})
const dispose = (config: optionsType) => {
  const options = {
    ...config,
    json: config.data,
    searchParams: config.params,
  }
  if (config.method === 'get' || config.method === 'GET') {
    delete options.json
  }
  return options
}
const request = (config: optionsType) => {
  return new Promise<responseType>((resolve, reject) => {
    const options = dispose(config)

    service(config.url, options as any)
      .then(async data => {
        resolve(await data.json())
      })
      .catch(error => {
        reject(error)
      })
  })
}
export default request
