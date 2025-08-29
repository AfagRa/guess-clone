import { Link } from "react-router"

const CategoryHeader = ({path}) => {
  return (
    <div className="text-xs text-gray-700 flex space-x-1">
      {path.map((crumb, i) => (
      <div key={i} className="flex items-center">
        {i > 0 && <span className="mx-1"> / </span>}
        <Link to={`/category/${path.map(p=>p).join("/")}`}>
          <span className="capitalize">{crumb.replace('-', ' ')}</span>
        </Link>
      </div>
      ))}
    </div>
  )
}


export default CategoryHeader