import type { MenuProps, MenuTheme } from 'antd'
import { Menu, Switch } from 'antd'
import {
  AppstoreOutlined,
  SettingOutlined,
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
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem(
      'Item 1',
      'g1',
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group'
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group'
    ),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group'
  ),
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
