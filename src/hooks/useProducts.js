import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { products as staticProducts } from '../data/products';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        setError(null);
        const q = new URLSearchParams();
        if (filters.category) q.set('category', filters.category);
        if (filters.gender) q.set('gender', filters.gender);
        if (filters.search) q.set('search', filters.search);
        if (filters.sort) q.set('sort', filters.sort);
        const queryString = q.toString();
        const res = await apiFetch(queryString ? `/products?${queryString}` : `/products`);
        const list = res?.data?.items ?? res?.data ?? [];
        setProducts(list);
      } catch (e) {
        setError(e?.message || 'Request failed');
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters.category, filters.gender, filters.search, filters.sort]);

  return { products, loading, error };
};