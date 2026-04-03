import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const isAdminRole = (role) => role === 'admin' || role === 'superadmin';

const loadUserFromLocalStorage = () => {
  const raw = localStorage.getItem('auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const resolveSession = (reduxUser, reduxToken) => {
  const user = reduxUser ?? loadUserFromLocalStorage();
  const token = reduxToken ?? localStorage.getItem('auth_token');
  return { user, token };
};

export const AdminGuard = () => {
  const { user: reduxUser, token: reduxToken } = useSelector((s) => s.auth);
  const { user, token } = resolveSession(reduxUser, reduxToken);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!token || !isAdminRole(user?.role)) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export const SuperAdminGuard = () => {
  const { user: reduxUser, token: reduxToken } = useSelector((s) => s.auth);
  const { user, token } = resolveSession(reduxUser, reduxToken);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!token || user?.role !== 'superadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet />;
};
