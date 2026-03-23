import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import { unwrap } from '../utils/unwrap';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrdersPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const body = await apiFetch('/admin/orders');
      const data = unwrap(body);
      const list = Array.isArray(data) ? data : data.data ?? data.orders ?? [];
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

  const userEmail = (row) => row.user?.email ?? row.user_email ?? row.email ?? '—';

  const openRow = async (row) => {
    const id = row.id;
    if (expandedId === id) {
      setExpandedId(null);
      setDetail(null);
      return;
    }
    setExpandedId(id);
    const embedded = row.order_items ?? row.items;
    if (embedded?.length) {
      setDetail(row);
      return;
    }
    setDetail(null);
    setDetailLoading(true);
    try {
      const body = await apiFetch(`/admin/orders/${id}`);
      setDetail(unwrap(body));
    } catch {
      setDetail(row);
    } finally {
      setDetailLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/admin/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      await load();
      if (expandedId === id && detail) {
        setDetail((d) => (d ? { ...d, status } : d));
      }
    } catch (err) {
      alert(err.body?.message || err.message || 'Update failed');
    }
  };

  const lines = detail?.order_items ?? detail?.items ?? [];

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Orders</h1>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[720px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 align-top">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="underline text-left"
                    onClick={() => openRow(row)}
                  >
                    #{row.id}
                  </button>
                </td>
                <td className="px-4 py-3 break-all max-w-[180px]">{userEmail(row)}</td>
                <td className="px-4 py-3 tabular-nums">
                  {row.total != null ? `$${Number(row.total).toFixed(2)}` : '—'}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={row.status || 'pending'}
                    onChange={(e) => updateStatus(row.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="border border-gray-300 rounded px-2 py-1 text-xs capitalize bg-white"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {row.created_at
                    ? new Date(row.created_at).toLocaleString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expandedId != null && (
        <div className="mt-6 bg-white border border-gray-200 p-4 max-w-2xl">
          <h2 className="text-sm font-medium mb-3">Order #{expandedId}</h2>
          {detailLoading && <p className="text-sm text-gray-500">Loading details…</p>}
          {!detailLoading && lines.length === 0 && (
            <p className="text-sm text-gray-600">No line items.</p>
          )}
          {!detailLoading && lines.length > 0 && (
            <ul className="text-sm space-y-2">
              {lines.map((line, idx) => {
                const p = line.product || {};
                const name = p.name || line.product_name || 'Item';
                return (
                  <li key={idx} className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                    <span>
                      {name} · {line.color} / {line.size} × {line.quantity}
                    </span>
                    <span className="tabular-nums">
                      {line.price != null ? `$${Number(line.price).toFixed(2)}` : ''}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
