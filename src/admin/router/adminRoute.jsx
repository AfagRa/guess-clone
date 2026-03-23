import { Navigate, Route, Routes } from 'react-router';
import AdminIndexRedirect from '../components/AdminIndexRedirect';
import { AdminGuard, SuperAdminGuard } from '../components/AdminGuard';
import AdminLayout from '../layout/AdminLayout';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import AdminUsersPage from '../pages/AdminUsersPage';

const AdminRoutes = () => (
  <Routes>
    <Route index element={<AdminIndexRedirect />} />
    <Route path="login" element={<AdminLoginPage />} />
    <Route element={<AdminGuard />}>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route element={<SuperAdminGuard />}>
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AdminRoutes;