import { FC, useEffect, lazy, Suspense } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from '@/components/errorPage'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import MyLayout from '@/components/layout'
import LoginPage from '@/view/login'
import HomePage from '@/view/home'

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
function lazyImportant(
  importComponent: () => Promise<{ default: FC<any> }>
): FC {
  const LazyLoadComponent = lazy(importComponent)
  return () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoadComponent />
    </Suspense>
  )
}
const LazyFun = lazyImportant(() => import('@/view/fun'))

const router = createHashRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'fun',
        element: <LazyFun />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default RouterDom
