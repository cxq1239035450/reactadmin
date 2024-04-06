import { Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import './index.scss'

const headerPage: FC = () => {
  return (
    <div id="headerPage">
      <div>111111111111111</div>
      <Breadcrumb
        items={[
          {
            href: '',
            title: <HomeOutlined />,
          },
          {
            href: '',
            title: (
              <>
                <UserOutlined />
                <span>Application List</span>
              </>
            ),
          },
          {
            title: 'Application',
          },
        ]}
      />
    </div>
  )
}
export default headerPage
