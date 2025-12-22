import type { MenuProps, MenuTheme } from 'antd'
import { Menu, Switch } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('三角洲', 'sjz', <MailOutlined />, [
     getItem('交易行', 'trx')
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ]),
]

const MenuPage: FC = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }
  return (
    <div className="flex flex-col">
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <Menu
        className="flex-1 w-200px"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme={theme}
        items={items}
      />
    </div>
  )
}

export default MenuPage
