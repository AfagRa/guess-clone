import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const roles = ['user', 'admin', 'superadmin'];

const AdminUsersPage = () => {
  const me = useSelector((s) => s.auth.user);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/admin/users');
      const data = unwrap(body);
      const list = Array.isArray(data) ? data : data.data ?? data.users ?? [];
      setItems(list);
    } catch (e) {
      setError(e.body?.message || e.message || 'Failed to load');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateRole = async (id, role) => {
    try {
      await apiFetch(`/admin/users/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Update failed');
    }
  };

  if (me?.role !== 'superadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Users</h1>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 break-all max-w-[200px]">{row.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.role || 'user'}
                    onChange={(e) => updateRole(row.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-xs bg-white capitalize"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
