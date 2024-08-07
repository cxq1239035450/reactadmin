import { Observer } from 'mobx-react'
import store from '@/store/user'

const Fun: FC = () => {
  console.log(store.info)

  return (
    <Observer>
      {() => {
        return <div>22222</div>
      }}
    </Observer>
  )
}

export default Fun
