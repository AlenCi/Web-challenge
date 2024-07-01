// src/pages/products.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { ProductsView } from 'src/sections/products/view';

import { fetchProducts } from 'src/services/api';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(20, 0);
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductsView initialProducts={products} />
      )}
    </>
  );
}