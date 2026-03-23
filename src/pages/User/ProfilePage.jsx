import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const unwrap = (body) => body?.data ?? body;

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'My orders' },
  { id: 'basket', label: 'My bag' },
  { id: 'favorites', label: 'Favorites' },
];

const statusClass = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'delivered') return 'bg-gray-100 text-black border-gray-300';
  if (s === 'cancelled') return 'bg-white text-gray-500 border-gray-200';
  if (s === 'shipped' || s === 'processing') return 'bg-gray-50 text-black border-gray-200';
  return 'bg-white text-black border-gray-300';
};

const pickProductThumb = (product) => {
  if (!product) return null;
  const byColor = product.imagesByColor || product.images_by_color;
  if (byColor && product.colors?.[0]) {
    const imgs = byColor[product.colors[0]];
    if (imgs?.[0]) return imgs[0];
  }
  if (Array.isArray(product.images) && product.images[0]) {
    const first = product.images[0];
    return typeof first === 'string' ? first : first.image_url || first.url;
  }
  return null;
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user: authUser } = useSelector((s) => s.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabs.some((t) => t.id === tabParam) ? tabParam : 'profile';

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', avatar: '' });
  const [saveLoading, setSaveLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  const [basketRows, setBasketRows] = useState([]);
  const [basketLoading, setBasketLoading] = useState(false);
  const [basketError, setBasketError] = useState('');

  const [wishlistRows, setWishlistRows] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState('');

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const loadProfile = useCallback(async () => {
    setProfileError('');
    setProfileLoading(true);
    try {
      const body = await apiFetch('/auth/me');
      const u = unwrap(body);
      setUser(u);
      dispatch(setCredentials({ user: u, token: localStorage.getItem('auth_token') }));
      setForm({
        name: u.name || '',
        phone: u.phone || '',
        address: u.address || '',
        avatar: u.avatar || '',
      });
    } catch (e) {
      setProfileError(e.body?.message || e.message || 'Could not load profile');
    } finally {
      setProfileLoading(false);
    }
  }, [dispatch]);

  const loadOrders = useCallback(async () => {
    setOrdersError('');
    setOrdersLoading(true);
    try {
      const body = await apiFetch('/orders');
      const data = unwrap(body);
      setOrders(Array.isArray(data) ? data : data.orders || data.data || []);
    } catch (e) {
      setOrdersError(e.body?.message || e.message || 'Could not load orders');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const loadBasket = useCallback(async () => {
    setBasketError('');
    setBasketLoading(true);
    try {
      const body = await apiFetch('/basket');
      const data = unwrap(body);
      const rows = Array.isArray(data) ? data : data.items || data.basket || data.data || [];
      setBasketRows(rows);
    } catch (e) {
      setBasketError(e.body?.message || e.message || 'Could not load bag');
      setBasketRows([]);
    } finally {
      setBasketLoading(false);
    }
  }, []);

  const loadWishlist = useCallback(async () => {
    setWishlistError('');
    setWishlistLoading(true);
    try {
      const body = await apiFetch('/wishlist');
      const data = unwrap(body);
      const rows = Array.isArray(data) ? data : data.items || data.wishlist || data.data || [];
      setWishlistRows(rows);
    } catch (e) {
      setWishlistError(e.body?.message || e.message || 'Could not load favorites');
      setWishlistRows([]);
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadProfile();
  }, [isAuthenticated, loadProfile]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'orders') loadOrders();
    if (activeTab === 'basket') loadBasket();
    if (activeTab === 'favorites') loadWishlist();
  }, [isAuthenticated, activeTab, loadOrders, loadBasket, loadWishlist]);

  const setTab = (id) => {
    setSearchParams(id === 'profile' ? {} : { tab: id });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setProfileError('');
    try {
      const body = await apiFetch('/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: form.name,
          phone: form.phone || null,
          address: form.address || null,
          avatar: form.avatar || null,
        }),
      });
      const u = unwrap(body);
      setUser(u);
      dispatch(setCredentials({ user: u, token: localStorage.getItem('auth_token') }));
      setEditMode(false);
    } catch (err) {
      setProfileError(err.body?.message || err.message || 'Could not save');
    } finally {
      setSaveLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const displayUser = user || authUser;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <h1 className="text-lg font-medium">Account</h1>
        <Link to="/home" className="text-sm underline text-gray-600">
          Continue shopping
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`text-xs sm:text-sm pb-2 -mb-px border-b-2 transition-colors ${
              activeTab === t.id ? 'border-black font-medium' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="max-w-xl">
          {profileLoading && <p className="text-sm text-gray-500">Loading…</p>}
          {profileError && <p className="text-sm text-red-600 mb-4">{profileError}</p>}
          {!profileLoading && displayUser && !editMode && (
            <div className="space-y-4 text-sm">
              {displayUser.avatar && (
                <img src={displayUser.avatar} alt="" className="h-16 w-16 rounded-full object-cover border border-gray-200" />
              )}
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p>{displayUser.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p>{displayUser.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p>{displayUser.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="whitespace-pre-wrap">{displayUser.address || '—'}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="mt-4 bg-black text-white text-sm px-5 py-2 font-medium hover:bg-gray-900"
              >
                Edit
              </button>
            </div>
          )}
          {!profileLoading && editMode && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label htmlFor="pf-name" className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  id="pf-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="pf-phone" className="block text-xs text-gray-600 mb-1">Phone</label>
                <input
                  id="pf-phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="pf-address" className="block text-xs text-gray-600 mb-1">Address</label>
                <textarea
                  id="pf-address"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black resize-y"
                />
              </div>
              <div>
                <label htmlFor="pf-avatar" className="block text-xs text-gray-600 mb-1">Avatar URL</label>
                <input
                  id="pf-avatar"
                  type="url"
                  value={form.avatar}
                  onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-black text-white text-sm px-5 py-2 font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {saveLoading ? 'Saving…' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    if (displayUser) {
                      setForm({
                        name: displayUser.name || '',
                        phone: displayUser.phone || '',
                        address: displayUser.address || '',
                        avatar: displayUser.avatar || '',
                      });
                    }
                  }}
                  className="text-sm underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          {ordersLoading && <p className="text-sm text-gray-500">Loading orders…</p>}
          {ordersError && <p className="text-sm text-red-600 mb-4">{ordersError}</p>}
          {!ordersLoading && orders.length === 0 && !ordersError && (
            <p className="text-sm text-gray-600">You have no orders yet.</p>
          )}
          <ul className="divide-y divide-gray-200 border border-gray-200">
            {orders.map((order) => {
              const id = order.id ?? order.order_id;
              const total = order.total ?? order.grand_total;
              const status = order.status || 'pending';
              const created = order.created_at || order.createdAt;
              const items = order.order_items || order.items || [];
              const open = expandedOrderId === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setExpandedOrderId(open ? null : id)}
                    className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-left text-sm hover:bg-gray-50"
                  >
                    <span className="font-medium">#{id}</span>
                    <span className="text-gray-600">{created ? new Date(created).toLocaleDateString() : '—'}</span>
                    <span>{total != null ? `$${Number(total).toFixed(2)}` : '—'}</span>
                    <span className={`inline-block px-2 py-0.5 text-xs uppercase border ${statusClass(status)}`}>
                      {status}
                    </span>
                  </button>
                  {open && items.length > 0 && (
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                      <ul className="text-xs space-y-2 pt-3">
                        {items.map((line, idx) => {
                          const p = line.product || {};
                          const name = p.name || line.product_name || 'Item';
                          const price = line.price ?? p.price;
                          return (
                            <li key={idx} className="flex justify-between gap-2">
                              <span>{name} · {line.color} / {line.size} × {line.quantity}</span>
                              <span>{price != null ? `$${Number(price).toFixed(2)}` : ''}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {activeTab === 'basket' && (
        <div>
          {basketLoading && <p className="text-sm text-gray-500">Loading bag…</p>}
          {basketError && <p className="text-sm text-red-600 mb-4">{basketError}</p>}
          {!basketLoading && basketRows.length === 0 && !basketError && (
            <p className="text-sm text-gray-600 mb-4">Your saved bag is empty.</p>
          )}
          {!basketLoading && basketRows.length > 0 && (
            <ul className="space-y-4">
              {basketRows.map((row) => {
                const p = row.product || row;
                const pid = row.product_id ?? p.id ?? row.id;
                const thumb = pickProductThumb(p);
                const name = p.name || row.name || 'Product';
                const qty = row.quantity ?? 1;
                const price = p.sale_price ?? p.salePrice ?? p.price ?? row.price;
                return (
                  <li key={row.id ?? `${pid}-${row.color}-${row.size}`} className="flex gap-4 border border-gray-200 p-3">
                    {thumb && (
                      <img src={thumb} alt="" className="h-20 w-16 object-contain bg-gray-50 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 text-sm">
                      <Link to={`/product/${pid}`} className="font-medium hover:underline line-clamp-2">
                        {name}
                      </Link>
                      <p className="text-xs text-gray-600 mt-1">
                        {row.color || '—'} · {row.size || '—'} · Qty {qty}
                      </p>
                      {price != null && (
                        <p className="text-sm mt-1">${Number(price).toFixed(2)}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/basket" className="inline-block mt-6 text-sm underline">
            Open shopping bag
          </Link>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div>
          {wishlistLoading && <p className="text-sm text-gray-500">Loading favorites…</p>}
          {wishlistError && <p className="text-sm text-red-600 mb-4">{wishlistError}</p>}
          {!wishlistLoading && wishlistRows.length === 0 && !wishlistError && (
            <p className="text-sm text-gray-600 mb-4">No saved favorites on your account.</p>
          )}
          {!wishlistLoading && wishlistRows.length > 0 && (
            <ul className="space-y-4">
              {wishlistRows.map((row) => {
                const p = row.product || row;
                const pid = row.product_id ?? p.id ?? row.id;
                const thumb = pickProductThumb(p);
                const name = p.name || row.name || 'Product';
                return (
                  <li key={row.id ?? `${pid}-${row.color}-${row.size}`} className="flex gap-4 border border-gray-200 p-3">
                    {thumb && (
                      <img src={thumb} alt="" className="h-20 w-16 object-contain bg-gray-50 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 text-sm">
                      <Link to={`/product/${pid}`} className="font-medium hover:underline line-clamp-2">
                        {name}
                      </Link>
                      <p className="text-xs text-gray-600 mt-1">
                        {row.color || '—'} · {row.size || '—'}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/wishlist" className="inline-block mt-6 text-sm underline">
            View wishlist
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
