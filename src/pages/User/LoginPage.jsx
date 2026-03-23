import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = body.data ?? body;
      const token = data.token ?? data.access_token;
      const user = data.user ?? data;
      if (!token || !user) {
        setError('Invalid response from server');
        return;
      }
      dispatch(setCredentials({ user, token }));
      navigate('/home');
    } catch (err) {
      const msg = err.body?.message || err.message || 'Login failed';
      setError(typeof msg === 'string' ? msg : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-16 pb-24">
      <h1 className="text-lg font-medium mb-8 text-center">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
        <div>
          <label htmlFor="login-email" className="block text-xs text-gray-600 mb-1">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-xs text-gray-600 mb-1">
            Password
          </label>
          <input
            id="login-password"
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
      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="underline text-black">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
