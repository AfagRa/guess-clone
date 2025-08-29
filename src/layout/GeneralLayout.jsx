import { Outlet } from 'react-router'
import UserFooter from '../components/User/UserFooter'
import UserNavbar from '../components/User/UserNavbar'
import ScrollToTopButton from '../components/ui/ScrollToTopButton'

const GeneralLayout = () => {
  return (
    <div>
      <UserNavbar />
      <div className='mt-[85px]'>
        <Outlet />
      </div>
      <UserFooter />

      <ScrollToTopButton />
    </div>
  )
}

export default GeneralLayout