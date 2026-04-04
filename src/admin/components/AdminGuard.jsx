import { useEffect, useState } from 'react';
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

export const AdminGuard = () => {
  const { user: reduxUser, token: reduxToken } = useSelector((s) => s.auth);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fromRedux = reduxUser;
    const fromStorage = loadUserFromLocalStorage();
    setUser(fromRedux ?? fromStorage ?? null);
    setChecked(true);
  }, [reduxUser, reduxToken]);

  if (!checked) {
    return null;
  }

  const token = reduxToken ?? localStorage.getItem('auth_token');

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
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fromRedux = reduxUser;
    const fromStorage = loadUserFromLocalStorage();
    setUser(fromRedux ?? fromStorage ?? null);
    setChecked(true);
  }, [reduxUser, reduxToken]);

  if (!checked) {
    return null;
  }

  const token = reduxToken ?? localStorage.getItem('auth_token');

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!token || user?.role !== 'superadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet />;
};
