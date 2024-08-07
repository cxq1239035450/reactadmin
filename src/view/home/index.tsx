import { inject, observer } from 'mobx-react'
import { Component, ReactNode } from 'react'

@inject('store')
@observer
class HomePage extends Component {
  componentDidMount(): void {
    console.log(this.props)
  }
  render(): ReactNode {
    return <div></div>
  }
}
export default HomePage
