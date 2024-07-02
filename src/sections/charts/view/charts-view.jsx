// src/sections/charts/view/charts-view.jsx
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, CardContent, CircularProgress, Grid, TextField } from '@mui/material';
import ProductDetailsModal from 'src/sections/products/product-details-modal';
export default function ChartsView({ chartData, loading, products }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { productCount, cartSizeData, genderPurchases } = useMemo(() => {
        if (!chartData || !chartData.carts) {
            return { productCount: {}, cartSizeData: [], genderPurchases: {} };
        }

        const productCount = chartData.carts.reduce((acc, cart) => {
            cart.products.forEach(product => {
                acc[product.title] = (acc[product.title] || 0) + product.quantity;
            });
            return acc;
        }, {});


        const cartSizes = chartData.carts.map(cart => cart.totalQuantity);
        const cartSizeDistribution = cartSizes.reduce((acc, size) => {
            acc[size] = (acc[size] || 0) + 1;
            return acc;
        }, {});
        const cartSizeData = Object.entries(cartSizeDistribution).sort((a, b) => a[0] - b[0]);

        const genderPurchases = chartData.carts.reduce((acc, cart) => {
            const gender = cart.userId % 2 === 0 ? 'Female' : 'Male';
            acc[gender] = (acc[gender] || 0) + cart.totalQuantity;
            return acc;
        }, {});

        return { productCount, cartSizeData, genderPurchases };
    }, [chartData]);

    const filteredProducts = useMemo(() => {
        return Object.entries(productCount)
            .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => b[1] - a[1]);
    }, [productCount, searchTerm]);

    const topProducts = useMemo(() => {
        const searchedProduct = filteredProducts.find(([name]) =>
            name.toLowerCase() === searchTerm.toLowerCase()
        );

        let result = filteredProducts.slice(0, 10);

        if (searchedProduct && !result.includes(searchedProduct)) {
            result = [searchedProduct, ...result.slice(0, 9)];
        }

        return result;
    }, [filteredProducts, searchTerm]);

    if (loading) {
        return <CircularProgress />;
    }

    // Chart options and series
    const productChartOptions = {
        chart: {
            type: 'bar',
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const productName = config.w.globals.labels[config.dataPointIndex];
                    handleProductClick(productName);
                }
            }
        },
        xaxis: {
            categories: topProducts.map(([name]) => name),
            labels: { rotate: -45, trim: true, maxHeight: 120 }
        },
        yaxis: { title: { text: 'Quantity Sold' } },
        title: { text: 'Top Products by Quantity Sold' },
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

    const handleProductClick = (productName) => {
        const product = products.find(p => p.title === productName);
        if (product) {
            setSelectedProduct(product);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
            <ProductDetailsModal
                product={selectedProduct}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Grid>
    );
}

ChartsView.propTypes = {
    chartData: PropTypes.object,
    loading: PropTypes.bool.isRequired,
};