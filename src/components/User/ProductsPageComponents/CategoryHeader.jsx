import { Link } from "react-router"
import { useDispatch } from 'react-redux'
import { deactivateSearch } from '../../../store/searchSlice'

const CategoryHeader = ({ path, searchQuery }) => {
  const dispatch = useDispatch()

  const handleHomeClick = () => {
    dispatch(deactivateSearch())
  }

  // If search is active, show search breadcrumb
  if (path[0] === 'search' && searchQuery) {
    return (
      <div className="text-xs text-gray-700 flex space-x-1">
        <Link to="/" onClick={handleHomeClick}>
          <span>Home</span>
        </Link>
        <span> / </span>
        <span>Search</span>
        <span> / </span>
        <span>"{searchQuery}"</span>
      </div>
    )
  }

  // Normal category breadcrumb
  return (
    <div className="text-xs text-gray-700 flex space-x-1">
      {path.map((crumb, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && <span className="mx-1"> / </span>}
          <Link to={`/${path.slice(0, i + 1).join("/")}`}>
            <span className="capitalize">{crumb.replace('-', ' ')}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryHeader