import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const editRoles = ['user', 'admin', 'superadmin'];
const addRoles = ['admin', 'superadmin'];

const emptyEditForm = () => ({ name: '', email: '', role: 'user' });
const emptyAddForm = () => ({ name: '', email: '', password: '', role: 'admin' });

const AdminUsersPage = () => {
  const me =
    useSelector((s) => s.auth.user) ?? JSON.parse(localStorage.getItem('auth_user') || 'null');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm());
  const [addForm, setAddForm] = useState(emptyAddForm());
  const [savingEdit, setSavingEdit] = useState(false);
  const [savingAdd, setSavingAdd] = useState(false);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/admin/users');
      const data = unwrap(body);
      const list = Array.isArray(data) ? data : data.items ?? data.data ?? data.users ?? [];
      setItems(list);
    } catch (e) {
      setError(e.body?.message || e.message || 'Failed to load');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (me?.role === 'superadmin') load();
  }, [load, me?.role]);

  const visibleUsers = useMemo(() => {
    if (!me?.id) return items;
    return items.filter((u) => u.id !== me.id);
  }, [items, me?.id]);

  const openEdit = (row) => {
    setEditingId(row.id);
    setEditForm({
      name: row.name || '',
      email: row.email || '',
      role: row.role || 'user',
    });
    setEditModalOpen(true);
  };

  const closeEdit = () => {
    setEditModalOpen(false);
    setEditingId(null);
    setEditForm(emptyEditForm());
  };

  const openAdd = () => {
    setAddForm(emptyAddForm());
    setAddModalOpen(true);
  };

  const closeAdd = () => {
    setAddModalOpen(false);
    setAddForm(emptyAddForm());
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    setSavingEdit(true);
    try {
      await apiFetch(`/admin/users/${editingId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: editForm.role }),
      });
      await apiFetch('/user/profile', {
        method: 'PUT',
        body: JSON.stringify({ name: editForm.name.trim(), email: editForm.email.trim() }),
      });
      closeEdit();
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Save failed');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    setSavingAdd(true);
    try {
      const p = addForm.password;
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: addForm.name.trim(),
          email: addForm.email.trim(),
          password: p,
          password_confirmation: p,
          role: addForm.role,
        }),
      });
      closeAdd();
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Create failed');
    } finally {
      setSavingAdd(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Delete failed');
    }
  };

  if (me == null) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (me.role !== 'superadmin') {
    return <p className="text-sm text-red-600">Access restricted to superadmins only.</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-lg font-medium">Users</h1>
        <button
          type="button"
          onClick={openAdd}
          className="text-sm bg-black text-white px-4 py-1.5 font-medium hover:bg-gray-900 self-start sm:self-auto"
        >
          Add Admin
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Created at</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 break-all max-w-[200px]">{row.email}</td>
                <td className="px-4 py-3 capitalize">{row.role || '—'}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {row.created_at ? new Date(row.created_at).toLocaleString() : '—'}
                </td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <button
                    type="button"
                    className="underline cursor-pointer"
                    onClick={() => openEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="underline text-red-700 cursor-pointer"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-md font-medium mb-4">Edit user</h2>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black capitalize"
                >
                  {editRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="bg-black text-white text-sm px-4 py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {savingEdit ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={closeEdit} className="text-sm underline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-md font-medium mb-4">Add Admin</h2>
            <form onSubmit={handleSaveAdd} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  value={addForm.name}
                  onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  value={addForm.password}
                  onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Role</label>
                <select
                  value={addForm.role}
                  onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black capitalize"
                >
                  {addRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingAdd}
                  className="bg-black text-white text-sm px-4 py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {savingAdd ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={closeAdd} className="text-sm underline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
