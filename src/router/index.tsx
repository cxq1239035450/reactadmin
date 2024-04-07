import { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from '@/components/errorPage'
import LoginPage from '@/view/login'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import MyLayout from '@/components/layout'
const RouterDom: FC = (...arg) => {
  useEffect(() => {
    nprogress.done()
    return () => {
      //清理函数
      nprogress.start()
    }
  })
  return <RouterProvider router={router} {...arg} />
}
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: 'i',
        element: <div>i111</div>,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default RouterDom
