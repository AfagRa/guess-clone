const EmptyBasket = () => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center pt-8">
        <div className="w-full text-sm mb-8">You have no items in your bag.</div>
        <div className="w-full py-4 text-gray-600 border-t border-b border-gray-300 text-md">Spend $125+ for free shipping</div>
        <div className="w-full pt-4 pb-16 border-b border-b-gray-300">
            <p className="my-4">Don't see your items?</p>
            <button className="cursor-pointer border-2 border-black py-3 px-20 rounded-full text-md">Sign in or create an account</button>
        </div>
    </div>
  )
}

export default EmptyBasket