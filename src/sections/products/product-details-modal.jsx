// src/sections/products/product-details-modal.jsx
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export default function ProductDetailsModal({ product, open, onClose }) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          Description: {product.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ProductDetailsModal.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};