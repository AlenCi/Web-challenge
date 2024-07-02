import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';

export default function ProductDetailsModal({ product, open, onClose }) {
  const [mainImage, setMainImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(true);
      setMainImage(''); // Clear the current image immediately
      if (product.images.length > 0) {
        const img = new Image();
        img.onload = () => {
          setMainImage(product.images[0]);
          setIsLoading(false);
        };
        img.onerror = () => {
          setMainImage(''); // Set to a default image or leave blank
          setIsLoading(false);
        };
        img.src = product.images[0];
      } else {
        setIsLoading(false);
      }
    }
  }, [product]);

  if (!product) return null;

  const handleImageClick = (image) => {
    setIsLoading(true);
    setMainImage(''); // Clear the current image immediately
    const img = new Image();
    img.onload = () => {
      setMainImage(image);
      setIsLoading(false);
    };
    img.onerror = () => {
      setMainImage(''); // Set to a default image or leave blank
      setIsLoading(false);
    };
    img.src = image;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: 300,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Box
                  component="img"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                  alt={product.title}
                  src={mainImage}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  sx={{
                    height: 80,
                    width: 80,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: mainImage === image ? '2px solid #1976d2' : '2px solid transparent',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  alt={`${product.title} - ${index}`}
                  src={image}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Rating: {product.rating}/5</Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>
            <Typography variant="body1" mt={2}>{product.description}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}