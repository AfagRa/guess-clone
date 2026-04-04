import { useState } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const unwrap = (body) => body?.data ?? body;

const isAdminRole = (role) => role === 'admin' || role === 'superadmin';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth);

  if (token && user && isAdminRole(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = unwrap(body);
      const t = data.token ?? data.access_token;
      const u = data.user ?? data;
      if (!t || !u) {
        setError('Invalid response');
        return;
      }
      if (!isAdminRole(u.role)) {
        setError('Access denied. Admin credentials required.');
        return;
      }
      dispatch(setCredentials({ user: u, token: t }));
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.body?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 p-8">
        <h1 className="text-lg font-medium text-center mb-8">Admin sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <label htmlFor="adm-email" className="block text-xs text-gray-600 mb-1">
              Email
            </label>
            <input
              id="adm-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="adm-password" className="block text-xs text-gray-600 mb-1">
              Password
            </label>
            <input
              id="adm-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm py-2.5 font-medium hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
