// src/pages/charts.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { ChartsView } from 'src/sections/charts/view';

import { fetchChartData } from 'src/services/api';

export default function ChartsPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const data = await fetchChartData();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    getChartData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Charts | Minimal UI </title>
      </Helmet>

      <ChartsView chartData={chartData} loading={loading} />
    </>
  );
}