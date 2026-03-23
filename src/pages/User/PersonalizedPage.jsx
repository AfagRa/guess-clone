import { useMemo } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import ItemsGrid from '../../components/User/ProductDetailsComponents/ItemsGrid';
import { useProducts } from '../../hooks/useProducts';

const readRecentlyViewed = () => {
  try {
    const raw = localStorage.getItem('recently-viewed');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((p) => p?.id && p?.imagesByColor && p?.colors?.length) : [];
  } catch {
    return [];
  }
};

const PersonalizedPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const wishlistItems = useSelector((s) => s.wishlist.items);
  const { products, loading: productsLoading } = useProducts({});

  const recentlyViewed = useMemo(() => readRecentlyViewed(), [location.pathname, location.key]);

  const recommended = useMemo(() => {
    const wishIds = new Set(wishlistItems.map((w) => String(w.id)));
    const categoryHits = new Set();
    wishlistItems.forEach((w) => {
      const p = products.find((pr) => String(pr.id) === String(w.id));
      p?.categoryPath?.forEach((c) => categoryHits.add(c));
    });
    let pool = products.filter((p) => {
      if (wishIds.has(String(p.id))) return false;
      if (!categoryHits.size) return true;
      return p.categoryPath?.some((c) => categoryHits.has(c));
    });
    if (!pool.length) {
      pool = products.filter((p) => !wishIds.has(String(p.id)));
    }
    return pool.slice(0, 12);
  }, [wishlistItems, products]);

  const wishlistPreview = useMemo(() => {
    const list = wishlistItems
      .map((w) => products.find((p) => String(p.id) === String(w.id)))
      .filter(Boolean);
    return list.slice(0, 10);
  }, [wishlistItems, products]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-20 space-y-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-medium">For you</h1>
          <p className="text-sm text-gray-600 mt-1">Picks based on your browsing and favorites</p>
        </div>
        <Link to="/profile" className="text-sm underline text-gray-600">
          Account
        </Link>
      </div>

      {recentlyViewed.length > 0 ? (
        <ItemsGrid
          title="Continue shopping"
          products={recentlyViewed}
          height="300px"
          showPrice={true}
          maxWidth="auto"
        />
      ) : (
        <div>
          <h2 className="text-xl font-medium mb-2 px-4">Continue shopping</h2>
          <p className="text-sm text-gray-600 px-4 mb-2">No recently viewed items yet.</p>
          <Link to="/home" className="text-sm underline px-4 inline-block">
            Browse new arrivals
          </Link>
        </div>
      )}

      {productsLoading ? (
        <div>Loading...</div>
      ) : (
        recommended.length > 0 && (
          <ItemsGrid
            title="Recommended for you"
            products={recommended}
            height="300px"
            showPrice={true}
            maxWidth="auto"
          />
        )
      )}

      {productsLoading ? (
        <div>Loading...</div>
      ) : wishlistPreview.length > 0 ? (
        <ItemsGrid
          title="Your wishlist"
          products={wishlistPreview}
          height="300px"
          showPrice={true}
          maxWidth="auto"
        />
      ) : (
        <div>
          <h2 className="text-xl font-medium mb-2 px-4">Your wishlist</h2>
          <p className="text-sm text-gray-600 px-4 mb-2">Save items you love to see them here.</p>
          <Link to="/wishlist" className="text-sm underline px-4 inline-block">
            View favorites
          </Link>
        </div>
      )}
    </div>
  );
};

export default PersonalizedPage;
