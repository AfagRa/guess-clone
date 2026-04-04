import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams();
        if (filters.category) q.set('category', filters.category);
        if (filters.gender) q.set('gender', filters.gender);
        if (filters.search) q.set('search', filters.search);
        if (filters.sort) q.set('sort', filters.sort);
        if (filters.page) q.set('page', filters.page);
        q.set('per_page', filters.perPage || 100);
        const res = await apiFetch(`/products?${q.toString()}`);
        const list = res?.data?.items ?? res?.data ?? [];
        setProducts(list);
        setPagination(res?.data?.pagination ?? null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters.category, filters.gender, filters.search, filters.sort, filters.page, filters.perPage]);

  return { products, loading, error, pagination };
};