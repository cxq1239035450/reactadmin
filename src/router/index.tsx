import { FC, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from '@/components/errorPage'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import MyLayout from '@/components/layout'
import LoginPage from '@/view/Login'
import HomePage from '@/view/Home'
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
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default RouterDom
