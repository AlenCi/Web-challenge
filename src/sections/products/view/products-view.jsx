// src/sections/products/view/products-view.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Iconify from 'src/components/iconify';
import ProductCard from '../product-card';
import ProductDetailsModal from '../product-details-modal';

import {
    fetchProducts, searchProducts, getProductCategories, getProductsByCategories,
    addProduct, updateProduct, deleteProduct
} from 'src/services/api';
const PRODUCTS_PER_PAGE = 30;

export default function ProductsView({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);
    const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) => {
            if (prev.some(c => c.slug === category.slug)) {
                return prev.filter(c => c.slug !== category.slug);
            } else {
                return [...prev, category];
            }
        });
    };

    const applySort = useCallback((productsToSort) => {
        console.log("applied sort")
        if (sortOrder) {
            return [...productsToSort].sort((a, b) => {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            });
        }
        return productsToSort;
    }, [sortOrder]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getProductCategories();
                console.log('Fetched categories:', categoriesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const loadMoreProducts = useCallback(async () => {
        console.log('loadMoreProducts called. Current state:', {
            page,
            sortOrder,
            searchQuery,
            selectedCategories: selectedCategories.map(c => c.name),
            productsLength: products.length,
            displayedProductsLength: displayedProducts.length,
            totalProducts
        });

        if (products.length >= totalProducts) {
            console.log('All products loaded. Setting hasMore to false.');
            setHasMore(false);
            return;
        }

        try {
            const skip = products.length;
            let newProducts;

            if (searchQuery) {
                newProducts = await searchProducts(searchQuery, PRODUCTS_PER_PAGE, skip, sortOrder);
            } else if (selectedCategories.length > 0) {
                const categories = selectedCategories.map(c => c.slug);
                newProducts = await getProductsByCategories(categories, PRODUCTS_PER_PAGE, skip, sortOrder);
            } else {
                newProducts = await fetchProducts(PRODUCTS_PER_PAGE, skip, sortOrder);
            }

            console.log('Loaded more products:', newProducts);

            if (newProducts.products.length === 0) {
                console.log('No more products to load. Setting hasMore to false.');
                setHasMore(false);
            } else {
                const updatedProducts = [...products, ...newProducts.products];
                const sortedProducts = applySort(updatedProducts);

                console.log('Updating state:', {
                    newProductsCount: newProducts.products.length,
                    updatedProductsLength: sortedProducts.length,
                    totalProducts: newProducts.total
                });

                setProducts(sortedProducts);
                setDisplayedProducts(sortedProducts);
                setPage(prevPage => prevPage + 1);
                setTotalProducts(newProducts.total);
                setHasMore(sortedProducts.length < newProducts.total);
            }
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, sortOrder, searchQuery, selectedCategories, products, totalProducts, applySort]);

    useEffect(() => {
        const applyFiltersAndSort = async () => {
            setIsLoading(true);
            setPage(0);
            try {
                let newProducts;

                if (searchQuery) {
                    newProducts = await searchProducts(searchQuery, PRODUCTS_PER_PAGE, 0,sortOrder);
                } else if (selectedCategories.length > 0) {
                    const categories = selectedCategories.map(c => c.slug);
                    newProducts = await getProductsByCategories(categories, PRODUCTS_PER_PAGE, 0,sortOrder);
                } else {
                    console.log(sortOrder)
                    newProducts = await fetchProducts(PRODUCTS_PER_PAGE, 0,sortOrder);
                }

                const sortedProducts = applySort(newProducts.products);

                console.log('Filtered and sorted products:', sortedProducts);

                setProducts(sortedProducts);
                setDisplayedProducts(sortedProducts);
                setTotalProducts(newProducts.total);
                setHasMore(sortedProducts.length < newProducts.total);
                setPage(1);
            } catch (error) {
                console.error('Error applying filters and sort:', error);
            } finally {
                setIsLoading(false);
            }
        };

        applyFiltersAndSort();
    }, [searchQuery,sortOrder, selectedCategories, applySort]);

    // useEffect(() => {
    //     const sortAllProducts = () => {
    //         const sortedProducts = applySort(products);
    //         setProducts(sortedProducts);
    //         setDisplayedProducts(sortedProducts);
    //     };

    //     sortAllProducts();
    // }, [sortOrder, products, applySort]);
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const productGrid = useMemo(() => (
        <Grid container spacing={3}>
            {displayedProducts.map((product) => (
                <Grid key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard product={product} onProductClick={() => handleProductClick(product)} />
                </Grid>
            ))}
        </Grid>
    ), [displayedProducts]);
    useEffect(() => {
        console.log('State updated:', {
            productsLength: products.length,
            displayedProductsLength: displayedProducts.length,
            page,
            hasMore
        });
    }, [products, displayedProducts, page, hasMore]);
    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Products
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <TextField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        onClick={handleFilterClick}
                        endIcon={<Iconify icon="eva:funnel-fill" />}
                        color={selectedCategories.length > 0 ? "primary" : "inherit"}
                    >
                        Filter {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                    </Button>
                    <Select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Sort by price' }}
                    >
                        <MenuItem value="">
                            <em>Sort by Price</em>
                        </MenuItem>
                        <MenuItem value="asc">Price: Low to High</MenuItem>
                        <MenuItem value="desc">Price: High to Low</MenuItem>
                    </Select>
                </Stack>
            </Stack>

            <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
            >
                {categories.map((category) => (
                    <MenuItem key={category.slug} onClick={() => handleCategoryToggle(category)}>
                        <Checkbox checked={selectedCategories.some(c => c.slug === category.slug)} />
                        <ListItemText primary={category.name} />
                    </MenuItem>
                ))}
            </Menu>
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={displayedProducts.length}
                    next={loadMoreProducts}
                    hasMore={hasMore}
                    loader={
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <CircularProgress />
                        </div>
                    }
                    endMessage={
                        <Typography variant="body2" sx={{ textAlign: 'center', padding: '20px' }}>
                            No more products to load.
                        </Typography>
                    }
                >
                    {productGrid}
                </InfiniteScroll>
            )}

            <ProductDetailsModal
                product={selectedProduct}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Container>
    );
}

ProductsView.propTypes = {
    initialProducts: PropTypes.array.isRequired,
};