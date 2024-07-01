// src/sections/products/product-details-modal.jsx
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
} from '@mui/material';

export default function ProductDetailsModal({ product, open, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              sx={{
                height: 200,
                width: '100%',
                objectFit: 'contain',
              }}
              alt={product.title}
              src={product.thumbnail}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Rating: {product.rating}/5</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" mt={2}>{product.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ProductDetailsModal.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};