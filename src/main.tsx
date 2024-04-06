import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterDom from '@/router/index.tsx'
import '@/sass/normalize.css'
import '@/sass/index.scss'
import 'virtual:uno.css'
import { ConfigProvider } from 'antd'

const config = {
  components: {
    Breadcrumb: {
      itemColor: '#FFFFFF',
      linkColor: '#FFFFFF',
      separatorColor: '#FFFFFF',
      linkHoverColor: '#16beff',
      lastItemColor: '#1677ff',
      algorithm: true, // 启用算法
    },
  },
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <RouterDom />
    </ConfigProvider>
  </React.StrictMode>
)
