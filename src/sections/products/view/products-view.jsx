// src/sections/products/view/products-view.jsx
import { useState, useEffect, useCallback } from 'react';
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

import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductDetailsModal from '../product-details-modal';
import { searchProducts, fetchProducts, fetchAllProducts } from 'src/services/api';

const PRODUCTS_PER_PAGE = 20;

export default function ProductsView({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = useCallback(async () => {
    console.log('loadMoreProducts called. Current page:', page);
    if (sortOrder || searchQuery) return; // Don't load more if sorting or searching
  
    const nextPage = page + 1;
    console.log('Fetching products for page:', nextPage);
    const newProducts = await fetchProducts(PRODUCTS_PER_PAGE, (nextPage - 1) * PRODUCTS_PER_PAGE);
    
    console.log('Fetched products:', newProducts.products.length);
    if (newProducts.products.length === 0) {
      setHasMore(false);
    } else {
      setProducts(prevProducts => {
        console.log('Previous products count:', prevProducts.length);
        return [...prevProducts, ...newProducts.products];
      });
      setDisplayedProducts(prevDisplayed => {
        console.log('Previous displayed products count:', prevDisplayed.length);
        return [...prevDisplayed, ...newProducts.products];
      });
      setPage(nextPage);
      console.log('Page set to:', nextPage);
    }
  }, [page, sortOrder, searchQuery]);

  useEffect(() => {
    console.log('useEffect triggered. Current page:', page);
    if (searchQuery) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        const searchResults = await searchProducts(searchQuery);
        setDisplayedProducts(searchResults.products);
        setHasMore(false);
        setIsLoading(false);
        setPage(1);  // Only reset page for new searches
        console.log('Page reset to 1 for new search');
      };
      fetchSearchResults();
    } else if (!sortOrder) {
      setDisplayedProducts(products);
      setHasMore(true);
    }
  }, [searchQuery, products, sortOrder]);

  useEffect(() => {
    if (sortOrder) {
      const fetchAndSortAllProducts = async () => {
        setIsLoading(true);
        if (allProducts.length === 0) {
          const allProductsData = await fetchAllProducts();
          setAllProducts(allProductsData.products);
        }
        
        const sortedProducts = [...allProducts].sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
        
        setDisplayedProducts(sortedProducts);
        setHasMore(false);
        setIsLoading(false);
      };
      
      fetchAndSortAllProducts();
    }
  }, [sortOrder, allProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          <Grid container spacing={3}>
            {displayedProducts.map((product) => (
              <Grid key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} onProductClick={() => handleProductClick(product)} />
              </Grid>
            ))}
          </Grid>
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