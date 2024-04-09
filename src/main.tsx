import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterDom from '@/router/index.tsx'
import '@/sass/index.scss'
import 'virtual:uno.css'
import { ConfigProvider } from 'antd'
import { Provider } from 'mobx-react'
import rootStore from '@/store/index'
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
  // <React.StrictMode>
  <Provider store={rootStore}>
    <ConfigProvider theme={config}>
      <RouterDom />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
)
