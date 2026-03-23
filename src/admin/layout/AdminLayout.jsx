import { NavLink, Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const linkClass = ({ isActive }) =>
  `block px-4 py-2 text-sm border-l-2 ${
    isActive ? 'border-black bg-gray-50 font-medium' : 'border-transparent text-gray-600 hover:bg-gray-50'
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const isSuper = user?.role === 'superadmin';

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST', body: JSON.stringify({}) });
    } catch {}
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-200 pt-8 pb-4">
        <div className="px-4 mb-6 text-xs font-medium text-gray-400 uppercase tracking-wide">
          Admin
        </div>
        <nav className="space-y-0">
          <NavLink to="/dashboard" className={linkClass} end>Dashboard</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/categories" className={linkClass}>Categories</NavLink>
          <NavLink to="/orders" className={linkClass}>Orders</NavLink>
          {isSuper && (
            <NavLink to="/users" className={linkClass}>Users</NavLink>
          )}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
          <button type="button" onClick={handleLogout} className="text-sm underline text-gray-700">
            Log out
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;