import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError('');
      setLoading(true);
      try {
        const body = await apiFetch('/admin/dashboard');
        const data = unwrap(body);
        if (!cancelled) setStats(data);
      } catch (e) {
        if (!cancelled) setError(e.body?.message || e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const p = stats?.total_products ?? stats?.totalProducts;
  const u = stats?.total_users ?? stats?.totalUsers;
  const o = stats?.total_orders ?? stats?.totalOrders;
  const r = stats?.revenue ?? stats?.total_revenue ?? stats?.totalRevenue;

  const cards = [
    { label: 'Total products', value: p },
    { label: 'Total users', value: u },
    { label: 'Total orders', value: o },
    {
      label: 'Total revenue',
      value: r != null ? `$${Number(r).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : null,
    },
  ];

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Dashboard</h1>
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="bg-white border border-gray-200 p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{c.label}</p>
              <p className="text-2xl font-medium tabular-nums">{c.value ?? '—'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
