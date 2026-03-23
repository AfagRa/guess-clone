import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const isAdminRole = (role) => role === 'admin' || role === 'superadmin';

const AdminIndexRedirect = () => {
  const { user, token, isAuthenticated } = useSelector((s) => s.auth);
  if (isAuthenticated && token && isAdminRole(user?.role)) {
    return <Navigate to="dashboard" replace />;
  }
  return <Navigate to="login" replace />;
};

export default AdminIndexRedirect;
