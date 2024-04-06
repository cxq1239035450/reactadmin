/// <reference types="vite/client" />
import { FC as ReactFC } from 'react'
// 里面的类型是全局共享的
declare global {
  type FC<P = {}> = ReactFC<P>
}

// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE: string
//   // 更多环境变量...
// }
