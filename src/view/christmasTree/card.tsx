import { Observer } from 'mobx-react'

const Card: FC = () => {

  return (
    <Observer>
      {() => {
        return <div>22222</div>
      }}
    </Observer>
  )
}

export default Card
