import { CiHeart } from 'react-icons/ci'

const EmptyWishlist = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center pt-8">
        <div className="w-full text-sm mb-4">Your favorites are empty.</div>
        <div className="w-full pt-4 pb-16 border-b border-b-gray-300"> Click on the <CiHeart size={20} className='inline-flex' /> while you shop.</div>
    </div>
  )
}

export default EmptyWishlist