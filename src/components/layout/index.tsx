import MenuPage from './components/menu'
import HeaderPage from './components/header'
import './index.scss'
const LayoutPage: FC = () => {
  return (
    <div id="layoutPage">
      <MenuPage />
      <div className="flex-1 flex flex-col">
        <HeaderPage />
        <div className="bg-#f5f5f5 flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
export default LayoutPage
