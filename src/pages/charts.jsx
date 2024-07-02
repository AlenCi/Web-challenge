// src/pages/charts.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { ChartsView } from 'src/sections/charts/view';

import { fetchChartData, fetchAllProducts } from 'src/services/api';

export default function ChartsPage() {
  const [chartData, setChartData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chartDataResponse, productsResponse] = await Promise.all([
          fetchChartData(),
          fetchAllProducts()
        ]);
        setChartData(chartDataResponse);
        setProducts(productsResponse.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Charts | Minimal UI </title>
      </Helmet>

      <ChartsView chartData={chartData} loading={loading} products={products}/>
    </>
  );
}