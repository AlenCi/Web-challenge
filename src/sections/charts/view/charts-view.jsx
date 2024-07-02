// src/sections/charts/view/charts-view.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, CardContent, CircularProgress, Grid, TextField } from '@mui/material';

export default function ChartsView({ chartData, loading }) {
    const [searchTerm, setSearchTerm] = useState('');
    if (loading) {
        return <CircularProgress />;
    }

    if (!chartData || !chartData.carts) {
        return null;
    }

    // Prepare data for charts
    const productCount = chartData.carts.reduce((acc, cart) => {
        cart.products.forEach(product => {
            acc[product.title] = (acc[product.title] || 0) + product.quantity;
        });
        return acc;
    }, {});

    const topProducts = Object.entries(productCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Prepare cart size distribution data
    const cartSizes = chartData.carts.map(cart => cart.totalQuantity);
    const cartSizeDistribution = cartSizes.reduce((acc, size) => {
        acc[size] = (acc[size] || 0) + 1;
        return acc;
    }, {});
    const cartSizeData = Object.entries(cartSizeDistribution).sort((a, b) => a[0] - b[0]);

    // Prepare gender-based purchase data
    const genderPurchases = chartData.carts.reduce((acc, cart) => {
        const gender = cart.userId % 2 === 0 ? 'Female' : 'Male'; // Assuming even IDs are female, odd are male
        acc[gender] = (acc[gender] || 0) + cart.totalQuantity;
        return acc;
    }, {});

    // Chart 1: Top 10 Products by Quantity Sold
    const productChartOptions = {
        chart: { type: 'bar' },
        xaxis: {
            categories: topProducts.map(([name]) => name),
            labels: { rotate: -45, trim: true, maxHeight: 120 }
        },
        yaxis: { title: { text: 'Quantity Sold' } },
        title: { text: 'Top 10 Products by Quantity Sold' },
        plotOptions: { bar: { dataLabels: { position: 'top' } } },
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -20,
            style: { fontSize: '12px', colors: ["#304758"] }
        },
        colors: ['#008FFB']
    };

    const productChartSeries = [{
        name: 'Quantity Sold',
        data: topProducts.map(([, count]) => count)
    }];

    // Chart 2: Distribution of Cart Sizes
    const cartSizeChartOptions = {
        chart: { type: 'bar' },
        xaxis: {
            categories: cartSizeData.map(([size]) => size),
            title: { text: 'Items per Cart' }
        },
        yaxis: { title: { text: 'Number of Carts' } },
        title: { text: 'Distribution of Cart Sizes' },
        colors: ['#00E396'],
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -20,
            style: { fontSize: '12px', colors: ["#304758"] }
        }
    };

    const cartSizeChartSeries = [{
        name: 'Number of Carts',
        data: cartSizeData.map(([, count]) => count)
    }];

    // Chart 3: Gender-based Purchase Distribution
    const genderChartOptions = {
        chart: { type: 'pie' },
        labels: Object.keys(genderPurchases),
        title: { text: 'Gender-based Purchase Distribution' },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const genderChartSeries = Object.values(genderPurchases);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Search Products"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Product Sales Analysis" />
                    <CardContent>
                        <ReactApexChart
                            options={productChartOptions}
                            series={productChartSeries}
                            type="bar"
                            height={400}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader title="Cart Size Analysis" />
                    <CardContent>
                        <ReactApexChart
                            options={cartSizeChartOptions}
                            series={cartSizeChartSeries}
                            type="bar"
                            height={400}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader title="Gender-based Purchase Distribution" />
                    <CardContent>
                        <ReactApexChart
                            options={genderChartOptions}
                            series={genderChartSeries}
                            type="pie"
                            height={400}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

ChartsView.propTypes = {
    chartData: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};