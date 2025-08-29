import AdminHeader from '../components/Admin/AdminHeader'
import AdminFooter from '../components/Admin/AdminFooter'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </div>
  )
}

export default AdminLayout