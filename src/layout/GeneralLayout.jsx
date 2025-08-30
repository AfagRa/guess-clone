import { Outlet } from 'react-router'
import UserFooter from '../components/User/UserFooter'
import UserNavbar from '../components/User/UserNavbar'
import ScrollToTopButton from '../components/ui/ScrollToTopButton'
import ScrollToTop from '../components/ui/ScrollToTop'

const GeneralLayout = () => {
  return (
    <div>
      <ScrollToTop />
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