import UserNavbar from '../components/User/UserNavbar'
import { Outlet } from 'react-router'
import UserFooter from '../components/User/UserFooter'

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </div>
  )
}

export default UserLayout