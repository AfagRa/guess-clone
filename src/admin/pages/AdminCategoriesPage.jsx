import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const AdminCategoriesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', parent_id: '' });
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/admin/categories');
      const data = unwrap(body);
      const list = Array.isArray(data) ? data : data.data ?? data.categories ?? [];
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

  const parentOptions = items.filter((c) => c.id !== editing);

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ name: '', slug: '', parent_id: '' });
  };

  const startEdit = (row) => {
    setCreating(false);
    setEditing(row.id);
    setForm({
      name: row.name || '',
      slug: row.slug || '',
      parent_id: row.parent_id != null ? String(row.parent_id) : '',
    });
  };

  const cancelForm = () => {
    setCreating(false);
    setEditing(null);
    setForm({ name: '', slug: '', parent_id: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: (form.slug.trim() || slugify(form.name)) || 'category',
        parent_id: form.parent_id ? parseInt(form.parent_id, 10) : null,
      };
      if (editing) {
        await apiFetch(`/admin/categories/${editing}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/admin/categories', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      cancelForm();
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await apiFetch(`/admin/categories/${id}`, { method: 'DELETE' });
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Delete failed');
    }
  };

  const parentLabel = (id) => {
    if (!id) return '—';
    const p = items.find((c) => c.id === id);
    return p?.name || `#${id}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-lg font-medium">Categories</h1>
        <button
          type="button"
          onClick={startCreate}
          className="text-sm bg-black text-white px-4 py-1.5 font-medium hover:bg-gray-900 self-start"
        >
          Add category
        </button>
      </div>

      {(creating || editing) && (
        <form onSubmit={submit} className="mb-6 bg-white border border-gray-200 p-4 max-w-md space-y-3 text-sm">
          <h2 className="font-medium">{editing ? 'Edit category' : 'New category'}</h2>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => ({
                  ...f,
                  name: v,
                  slug: editing ? f.slug : slugify(v),
                }));
              }}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              required
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Parent</label>
            <select
              value={form.parent_id}
              onChange={(e) => setForm((f) => ({ ...f, parent_id: e.target.value }))}
              className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
            >
              <option value="">None</option>
              {parentOptions.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white text-sm px-4 py-2 font-medium disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={cancelForm} className="text-sm underline">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[480px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Parent</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3 text-gray-600">{row.slug}</td>
                <td className="px-4 py-3">{parentLabel(row.parent_id)}</td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <button type="button" className="underline" onClick={() => startEdit(row)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="underline text-red-700"
                    onClick={() => remove(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
