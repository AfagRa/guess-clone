import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const splitCsv = (s) =>
  String(s || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

const emptyForm = () => ({
  name: '',
  slug: '',
  gender: 'women',
  price: '',
  sale_price: '',
  percentage_off: '0',
  brand: 'GUESS',
  material: '',
  description: '',
  availability: 'In Stock',
  tags: '',
  colors: '',
  sizes: '',
  category_path: '',
});

const AdminProductsPage = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.set('page', String(page));
      if (search.trim()) q.set('search', search.trim());
      const body = await apiFetch(`/admin/products?${q.toString()}`);
      const data = unwrap(body);
      const list = Array.isArray(data) ? data : data.items ?? data.data ?? data.products ?? [];
      setItems(list);
      const m =
        body.meta ??
        (data && typeof data === 'object' && !Array.isArray(data)
          ? data.meta ?? data.pagination
          : null);
      setMeta(m ?? null);
    } catch (e) {
      setError(e.body?.message || e.message || 'Failed to load products');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const lastPage = useMemo(() => {
    if (!meta) return 1;
    return meta.last_page ?? meta.lastPage ?? 1;
  }, [meta]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    const cp = row.category_path ?? row.categoryPath;
    const tags = row.tags;
    const colors = row.colors;
    const sizes = row.sizes;
    setForm({
      name: row.name || '',
      slug: row.slug || '',
      gender: row.gender || 'women',
      price: row.price != null ? String(row.price) : '',
      sale_price: row.sale_price != null || row.salePrice != null ? String(row.sale_price ?? row.salePrice) : '',
      percentage_off: String(row.percentage_off ?? row.percentageOff ?? 0),
      brand: row.brand || 'GUESS',
      material: row.material || '',
      description: row.description || '',
      availability: row.availability || 'In Stock',
      tags: Array.isArray(tags) ? tags.join(', ') : '',
      colors: Array.isArray(colors) ? colors.join(', ') : '',
      sizes: Array.isArray(sizes) ? sizes.join(', ') : '',
      category_path: Array.isArray(cp) ? cp.join(', ') : typeof cp === 'string' ? cp : '',
    });
    setModalOpen(true);
  };

  const buildPayload = () => {
    const name = form.name.trim();
    const slug = (form.slug.trim() || slugify(name)) || 'product';
    const price = parseFloat(form.price);
    const sale = form.sale_price.trim() ? parseFloat(form.sale_price) : null;
    const pct = parseInt(form.percentage_off, 10) || 0;
    return {
      name,
      slug,
      gender: form.gender,
      price: Number.isFinite(price) ? price : 0,
      sale_price: sale,
      percentage_off: pct,
      brand: form.brand.trim() || 'GUESS',
      material: form.material.trim() || null,
      eco_info: null,
      description: form.description.trim() || null,
      availability: form.availability.trim() || 'In Stock',
      tags: splitCsv(form.tags),
      colors: splitCsv(form.colors),
      sizes: splitCsv(form.sizes),
      category_path: splitCsv(form.category_path),
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload();
      if (editingId) {
        await apiFetch(`/admin/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/admin/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`/admin/products/${deleteId}`, { method: 'DELETE' });
      setDeleteId(null);
      await load();
    } catch (err) {
      alert(err.body?.message || err.message || 'Delete failed');
    }
  };

  const onNameChange = (v) => {
    setForm((f) => {
      const next = { ...f, name: v };
      if (!editingId) next.slug = slugify(v);
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-lg font-medium">Products</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (setSearch(searchInput), setPage(1))}
            placeholder="Search…"
            className="border border-gray-300 px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-black"
          />
          <button
            type="button"
            onClick={() => {
              setSearch(searchInput);
              setPage(1);
            }}
            className="text-sm border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
          >
            Search
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="text-sm bg-black text-white px-4 py-1.5 font-medium hover:bg-gray-900"
          >
            Add product
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Sale</th>
              <th className="px-4 py-3 font-medium">Gender</th>
              <th className="px-4 py-3 font-medium">Availability</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 max-w-[200px] truncate">{row.name}</td>
                <td className="px-4 py-3 tabular-nums">
                  {row.price != null ? `$${Number(row.price).toFixed(2)}` : '—'}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {row.sale_price != null || row.salePrice != null
                    ? `$${Number(row.sale_price ?? row.salePrice).toFixed(2)}`
                    : '—'}
                </td>
                <td className="px-4 py-3 capitalize">{row.gender}</td>
                <td className="px-4 py-3">{row.availability}</td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <button type="button" className="underline" onClick={() => openEdit(row)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="underline text-red-700"
                    onClick={() => setDeleteId(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && lastPage > 1 && (
        <div className="flex items-center gap-3 mt-4 text-sm">
          <button
            type="button"
            disabled={page <= 1}
            className="underline disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {lastPage}
          </span>
          <button
            type="button"
            disabled={page >= lastPage}
            className="underline disabled:opacity-40"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-md font-medium mb-4">{editingId ? 'Edit product' : 'New product'}</h2>
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
                <label className="block text-xs text-gray-600 mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                >
                  <option value="women">women</option>
                  <option value="men">men</option>
                  <option value="unisex">unisex</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    required
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Sale price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.sale_price}
                    onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))}
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Percentage off</label>
                <input
                  type="number"
                  value={form.percentage_off}
                  onChange={(e) => setForm((f) => ({ ...f, percentage_off: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Brand</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Material</label>
                <input
                  value={form.material}
                  onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Availability</label>
                <input
                  value={form.availability}
                  onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black resize-y"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Colors (comma separated)</label>
                <input
                  value={form.colors}
                  onChange={(e) => setForm((f) => ({ ...f, colors: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Sizes (comma separated)</label>
                <input
                  value={form.sizes}
                  onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Category path (comma separated)</label>
                <input
                  value={form.category_path}
                  onChange={(e) => setForm((f) => ({ ...f, category_path: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-black text-white text-sm px-4 py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-sm underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 p-6 max-w-sm w-full">
            <p className="text-sm mb-4">Delete this product?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-black text-white text-sm px-4 py-2 font-medium"
              >
                Delete
              </button>
              <button type="button" onClick={() => setDeleteId(null)} className="text-sm underline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
