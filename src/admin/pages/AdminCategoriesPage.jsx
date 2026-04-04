import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const emptyForm = () => ({ name: '', slug: '', parent_id: '' });

const parentIdOf = (c) => c.parent_id ?? c.parentId ?? null;

const buildTreeRows = (list) => {
  const ids = new Set(list.map((c) => c.id));
  const nameSort = (a, b) => String(a.name || '').localeCompare(String(b.name || ''));
  const roots = list.filter((c) => {
    const p = parentIdOf(c);
    return p == null || p === '' || !ids.has(p);
  });
  const used = new Set();
  const rows = [];
  roots.sort(nameSort).forEach((parent) => {
    rows.push({ row: parent, depth: 0 });
    used.add(parent.id);
    list
      .filter((c) => parentIdOf(c) === parent.id)
      .sort(nameSort)
      .forEach((child) => {
        rows.push({ row: child, depth: 1 });
        used.add(child.id);
      });
  });
  list
    .filter((c) => !used.has(c.id))
    .sort(nameSort)
    .forEach((c) => {
      rows.push({ row: c, depth: parentIdOf(c) ? 1 : 0 });
    });
  return rows;
};

const AdminCategoriesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/admin/categories');
      const data = unwrap(body);
      const nested = Array.isArray(data) ? data : data.items ?? data.data ?? [];
      const flat = [];
      nested.forEach(parent => {
        flat.push({ ...parent, children: undefined });
        if (Array.isArray(parent.children)) {
          parent.children.forEach(child => flat.push(child));
        }
      });
      setItems(flat);
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

  const displayRows = useMemo(() => buildTreeRows(items), [items]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      name: row.name || '',
      slug: row.slug || '',
      parent_id: parentIdOf(row) != null ? String(parentIdOf(row)) : '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
  };

  const onNameChange = (v) => {
    setForm((f) => {
      const next = { ...f, name: v };
      if (!editingId) next.slug = slugify(v);
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: (form.slug.trim() || slugify(form.name)) || 'category',
        parent_id: form.parent_id ? parseInt(form.parent_id, 10) : null,
      };
      if (editingId) {
        await apiFetch(`/admin/categories/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/admin/categories', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      closeModal();
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
          onClick={openCreate}
          className="text-sm bg-black text-white px-4 py-1.5 font-medium hover:bg-gray-900 self-start"
        >
          Add category
        </button>
      </div>

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
            {displayRows.map(({ row, depth }) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className={`px-4 py-3 ${depth === 1 ? 'pl-8' : ''}`}>
                  {depth === 1 ? `- ${row.name}` : row.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{row.slug}</td>
                <td className="px-4 py-3">{parentLabel(parentIdOf(row))}</td>
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-md font-medium mb-4">{editingId ? 'Edit category' : 'New category'}</h2>
            <form onSubmit={handleSave} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => onNameChange(e.target.value)}
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
                <label className="block text-xs text-gray-600 mb-1">Parent category</label>
                <select
                  value={form.parent_id}
                  onChange={(e) => setForm((f) => ({ ...f, parent_id: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                >
                  <option value="">None (top level)</option>
                  {items.filter(c => !c.parent_id).map(c => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">e.g. Women, Men, Handbags</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-black text-white text-sm px-4 py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="text-sm underline">
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

export default AdminCategoriesPage;
