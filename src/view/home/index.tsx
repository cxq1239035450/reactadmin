import { inject, observer } from 'mobx-react'
import { Component, ReactNode } from 'react'
import CounterStore from '@/store/user'
@inject('store')
@observer
class HomePage extends Component {
  componentDidMount(): void {
    console.log('componentDidMount',this.props)
  }
  changeStore(){
    this.props.store.user.getUserInfoStore()
  }
  render(): ReactNode {
    return <div>
      <button onClick={()=> {
        this.changeStore()
      }}></button>
      <div>{CounterStore.info?.userName}</div>
    </div>
  }
}
export default HomePage
