import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const body = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
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
      const msg = err.body?.message || err.message || 'Registration failed';
      if (typeof msg === 'object' && msg !== null) {
        const first = Object.values(msg).flat?.()[0];
        setError(typeof first === 'string' ? first : 'Registration failed');
      } else {
        setError(typeof msg === 'string' ? msg : 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-16 pb-24">
      <h1 className="text-lg font-medium mb-8 text-center">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
        <div>
          <label htmlFor="register-name" className="block text-xs text-gray-600 mb-1">
            Name
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label htmlFor="register-email" className="block text-xs text-gray-600 mb-1">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label htmlFor="register-password" className="block text-xs text-gray-600 mb-1">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label htmlFor="register-password-confirm" className="block text-xs text-gray-600 mb-1">
            Confirm password
          </label>
          <input
            id="register-password-confirm"
            type="password"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white text-sm py-2.5 font-medium hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="underline text-black">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
