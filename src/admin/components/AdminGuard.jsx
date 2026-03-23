import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const isAdminRole = (role) => role === 'admin' || role === 'superadmin';

export const AdminGuard = () => {
  const { user, token, isAuthenticated } = useSelector((s) => s.auth);
  if (!isAuthenticated || !token || !isAdminRole(user?.role)) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export const SuperAdminGuard = () => {
  const { user, token, isAuthenticated } = useSelector((s) => s.auth);
  if (!isAuthenticated || !token || user?.role !== 'superadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet />;
};
