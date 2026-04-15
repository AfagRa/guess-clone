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

const genImageRowId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

const ibcToRowsState = (ibc) => {
  const o = {};
  if (ibc && typeof ibc === 'object' && !Array.isArray(ibc)) {
    for (const [color, urls] of Object.entries(ibc)) {
      const arr = Array.isArray(urls) ? urls : urls != null ? [urls] : [];
      const rows = arr
        .filter((u) => u != null && String(u).trim() !== '')
        .map((u) => ({
          id: genImageRowId(),
          mode: 'link',
          value: String(u).trim(),
        }));
      o[color] = rows.length ? rows : [{ id: genImageRowId(), mode: 'link', value: '' }];
    }
  }
  return o;
};

const emptyForm = () => ({
  name: '',
  slug: '',
  gender: 'women',
  price: '',
  sale_price: '',
  percentage_off: '0',
  material: '',
  description: '',
  availability: 'In Stock',
  quantity: '0',
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
  const [imageRowsByColor, setImageRowsByColor] = useState({});
  const [activeImageColor, setActiveImageColor] = useState('');
  const [committedColors, setCommittedColors] = useState([]);

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

  const imageColorTabs = useMemo(() => {
    const a = splitCsv(committedColors.join(','));
    const b = Object.keys(imageRowsByColor).map((x) => String(x || '').trim()).filter(Boolean);
    const seen = new Set();
    const out = [];
    for (const x of [...a, ...b]) {
      if (!x || seen.has(x)) continue;
      seen.add(x);
      out.push(x);
    }
    return out;
  }, [committedColors, imageRowsByColor]);

  useEffect(() => {
    if (!modalOpen) return;
  
    setImageRowsByColor((prev) => {
      const next = {};
      
      for (const color of committedColors) {
        if (prev[color]) {
          next[color] = prev[color];
        } else {
          next[color] = [
            { id: genImageRowId(), mode: 'link', value: '' }
          ];
        }
      }
  
      return next;
    });
  
  }, [committedColors, modalOpen]);

  useEffect(() => {
    if (!modalOpen || !imageColorTabs.length) return;
    if (!imageColorTabs.includes(activeImageColor)) setActiveImageColor(imageColorTabs[0]);
  }, [modalOpen, imageColorTabs, activeImageColor]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setImageRowsByColor({});
    setActiveImageColor('');
    setCommittedColors([]);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    const cp = row.category_path ?? row.categoryPath;
    const tags = row.tags;
    const colors = row.colors;
    const sizes = row.sizes;
    const rawAv = String(row.availability || 'In Stock').trim().toLowerCase();
    const availability = rawAv === 'out of stock' ? 'Out of Stock' : 'In Stock';
    const ibc = row.images_by_color ?? row.imagesByColor;
    const cols = Array.isArray(colors) ? colors : splitCsv(typeof colors === 'string' ? colors : '');
    const rowMap = ibcToRowsState(ibc);
    const allColors = [...new Set([...cols, ...Object.keys(rowMap)])];
    for (const c of allColors) {
      if (!rowMap[c]) rowMap[c] = [{ id: genImageRowId(), mode: 'link', value: '' }];
    }
    setImageRowsByColor(rowMap);
    setCommittedColors(allColors);
    setActiveImageColor(allColors[0] || '');
    setForm({
      name: row.name || '',
      slug: row.slug || '',
      gender: row.gender || 'women',
      price: row.price != null ? String(row.price) : '',
      sale_price: row.sale_price != null || row.salePrice != null ? String(row.sale_price ?? row.salePrice) : '',
      percentage_off: String(row.percentage_off ?? row.percentageOff ?? 0),
      material: row.material || '',
      description: row.description || '',
      availability,
      quantity: String(row.quantity ?? row.stock_quantity ?? row.stock ?? 0),
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
    const qty = parseInt(form.quantity, 10);
    const quantity = form.availability === 'In Stock' ? (Number.isFinite(qty) ? qty : 0) : 0;
    return {
      name,
      slug,
      gender: form.gender,
      price: Number.isFinite(price) ? price : 0,
      sale_price: sale,
      percentage_off: pct,
      brand: 'GUESS',
      material: form.material.trim() || null,
      eco_info: null,
      description: form.description.trim() || null,
      availability: form.availability.trim() || 'In Stock',
      quantity,
      tags: splitCsv(form.tags),
      colors: splitCsv(form.colors),
      sizes: splitCsv(form.sizes),
      category_path: splitCsv(form.category_path),
      images_by_color: Object.fromEntries(
        Object.entries(imageRowsByColor)
          .map(([color, rows]) => [
            color,
            (rows || []).map((r) => r.value.trim()).filter(Boolean),
          ])
          .filter(([, urls]) => urls.length > 0),
      ),
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

  const onColorsChange = (val) => {
    setForm((f) => ({ ...f, colors: val }));
    if (val.endsWith(',') || val.endsWith(' ')) {
      setCommittedColors(splitCsv(val));
    }
  };

  const updateImageRow = (color, rowId, patch) => {
    setImageRowsByColor((prev) => ({
      ...prev,
      [color]: (prev[color] || []).map((row) =>
        row.id === rowId ? { ...row, ...patch } : row,
      ),
    }));
  };

  const addImageRow = (color) => {
    setImageRowsByColor((prev) => ({
      ...prev,
      [color]: [...(prev[color] || []), { id: genImageRowId(), mode: 'link', value: '' }],
    }));
  };

  const removeImageRow = (color, rowId) => {
    setImageRowsByColor((prev) => ({
      ...prev,
      [color]: (prev[color] || []).filter((r) => r.id !== rowId),
    }));
  };

  const onImageFileSelected = async (color, rowId, file) => {
    if (!file || !file.type.startsWith('image/')) return;
    updateImageRow(color, rowId, { uploading: true, uploadError: '' });
    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('auth_token');
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const res = await fetch(`${apiBase}/admin/products/upload-image`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
        body: formData,
      });
      let data = {};
      try { data = await res.json(); } catch { data = {}; }
      const url = data?.data?.url ?? '';
      if (!res.ok) {
        updateImageRow(color, rowId, { uploading: false, uploadError: data?.message || 'Upload failed' });
        return;
      }
      if (!url) {
        updateImageRow(color, rowId, { uploading: false, uploadError: 'Upload failed' });
        return;
      }
      updateImageRow(color, rowId, { value: url, mode: 'device', uploading: false, uploadError: '' });
    } catch (e) {
      updateImageRow(color, rowId, { uploading: false, uploadError: e?.message || 'Upload failed' });
    }
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
            onClick={() => { setSearch(searchInput); setPage(1); }}
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
                  <button type="button" className="underline cursor-pointer" onClick={() => openEdit(row)}>
                    Edit
                  </button>
                  <button type="button" className="underline text-red-700 cursor-pointer" onClick={() => setDeleteId(row.id)}>
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
          <button type="button" disabled={page <= 1} className="underline disabled:opacity-40" onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Previous
          </button>
          <span>Page {page} of {lastPage}</span>
          <button type="button" disabled={page >= lastPage} className="underline disabled:opacity-40" onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-md font-medium mb-4">{editingId ? 'Edit product' : 'New product'}</h2>
            <form onSubmit={handleSave} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input value={form.name} onChange={(e) => onNameChange(e.target.value)} required className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. Classic Logo T-Shirt</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. classic-logo-t-shirt</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Gender</label>
                <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black">
                  <option value="women">women</option>
                  <option value="men">men</option>
                  <option value="unisex">unisex</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Price</label>
                  <input type="number" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                  <p className="text-xs text-gray-500 mt-0.5">e.g. 49.99</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Sale price</label>
                  <input type="number" step="0.01" value={form.sale_price} onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                  <p className="text-xs text-gray-500 mt-0.5">e.g. 39.99</p>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Percentage off</label>
                <input type="number" value={form.percentage_off} onChange={(e) => setForm((f) => ({ ...f, percentage_off: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. 20</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Material</label>
                <input value={form.material} onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. 100% Cotton</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Availability</label>
                <select value={form.availability} onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value, quantity: e.target.value === 'In Stock' ? f.quantity : '0' }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black">
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              {form.availability === 'In Stock' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                  <input type="number" min="0" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                  <p className="text-xs text-gray-500 mt-0.5">e.g. 120</p>
                </div>
              )}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black resize-y" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. Soft crew neck tee with embroidered logo at the chest.</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. casual, summer, essentials</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Colors (comma separated)</label>
                <input
                  value={form.colors}
                  onChange={(e) => onColorsChange(e.target.value)}
                  onBlur={(e) => setCommittedColors(splitCsv(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black"
                />
                <p className="text-xs text-gray-500 mt-0.5">e.g. Black, White, Navy — type a comma after each color</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Sizes (comma separated)</label>
                <input value={form.sizes} onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. S, M, L, XL</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Category path (comma separated)</label>
                <input value={form.category_path} onChange={(e) => setForm((f) => ({ ...f, category_path: e.target.value }))} className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-black" />
                <p className="text-xs text-gray-500 mt-0.5">e.g. women, apparel, tops</p>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Images by color</label>
                {!imageColorTabs.length ? (
                  <p className="text-xs text-gray-500">Type a color name followed by a comma to manage images per color.</p>
                ) : (
                  <div className="border border-gray-200 p-3 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {imageColorTabs.map((c) => (
                        <button key={c} type="button" onClick={() => setActiveImageColor(c)} className={`text-xs px-2 py-1 border ${activeImageColor === c ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                    {activeImageColor && (imageRowsByColor[activeImageColor] || []).length === 0 && (
                      <div className="flex justify-end">
                        <button type="button" onClick={() => addImageRow(activeImageColor)} className="text-sm w-8 h-8 border border-gray-300 leading-none hover:bg-gray-50">+</button>
                      </div>
                    )}
                    {activeImageColor && (imageRowsByColor[activeImageColor] || []).map((row) => (
                      <div key={row.id} className="flex flex-wrap items-start gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex gap-1 shrink-0">
                          <button type="button" onClick={() => updateImageRow(activeImageColor, row.id, { mode: 'link', value: row.value.startsWith('data:') ? '' : row.value, uploading: false, uploadError: '' })} className={`text-xs px-2 py-0.5 border ${row.mode === 'link' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:bg-gray-50'}`}>
                            Link
                          </button>
                          <button type="button" onClick={() => updateImageRow(activeImageColor, row.id, { mode: 'device', value: /^https?:\/\//i.test(row.value) ? '' : row.value, uploading: false, uploadError: '' })} className={`text-xs px-2 py-0.5 border ${row.mode === 'device' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:bg-gray-50'}`}>
                            Device
                          </button>
                        </div>
                        <div className="flex-1 min-w-[200px] space-y-1">
                          {row.mode === 'link' ? (
                            <input type="text" value={row.value.startsWith('data:') ? '' : row.value} onChange={(e) => updateImageRow(activeImageColor, row.id, { value: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:border-black" />
                          ) : (
                            <>
                              <input type="file" accept="image/*" disabled={row.uploading} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) onImageFileSelected(activeImageColor, row.id, f); }} className="w-full text-xs" />
                              {row.uploading && <p className="text-xs text-gray-500 mt-1">Uploading…</p>}
                              {row.uploadError && <p className="text-xs text-red-600 mt-1">{row.uploadError}</p>}
                              {!row.uploading && row.value && /^https?:\/\//i.test(row.value) && (
                                <img src={row.value} alt="" className="max-h-[60px] w-auto object-contain border border-gray-200 mt-1" />
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0 items-center">
                          <button type="button" onClick={() => addImageRow(activeImageColor)} className="text-sm w-7 h-7 border border-gray-300 leading-none hover:bg-gray-50">+</button>
                          <button type="button" onClick={() => removeImageRow(activeImageColor, row.id)} className="text-sm w-7 h-7 border border-gray-300 leading-none hover:bg-gray-50 text-red-700">×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-black text-white text-sm px-4 py-2 font-medium hover:bg-gray-900 disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={() => setModalOpen(false)} className="text-sm underline">
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
              <button type="button" onClick={handleDelete} className="bg-black text-white text-sm px-4 py-2 font-medium">Delete</button>
              <button type="button" onClick={() => setDeleteId(null)} className="text-sm underline">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;