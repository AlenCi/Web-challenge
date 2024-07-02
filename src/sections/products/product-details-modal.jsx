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
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{product.title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                      objectFit: 'cover',
                    }}
                    alt={`${product.title} - ${index + 1}`}
                    src={image}
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