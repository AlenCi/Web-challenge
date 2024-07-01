// src/sections/products/product-card.jsx
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRef, useEffect } from 'react';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-out',
  transformStyle: 'preserve-3d',
  willChange: 'transform',
  cursor: 'pointer',

  boxShadow: theme.shadows[2],
  // Add some margin to ensure the shadow is always visible
  margin: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, onProductClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    let bounds;

    function rotateToMouse(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      }
      const distance = Math.sqrt(center.x**2 + center.y**2);

      card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
    
      `;
  
    }

    function removeListener() {
      card.style.transform = '';
      card.style.boxShadow = '';
    }

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      document.addEventListener('mousemove', rotateToMouse);
    });

    card.addEventListener('mouseleave', () => {
      document.removeEventListener('mousemove', rotateToMouse);
      removeListener();
    });

    return () => {
      card.removeEventListener('mouseenter', () => {
        document.addEventListener('mousemove', rotateToMouse);
      });
      card.removeEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
      });
    }
  }, []);

  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  return (
    <StyledCard ref={cardRef} onClick={() => onProductClick(product)}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        <StyledProductImg alt={product.title} src={product.thumbnail} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {product.title}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {product.category}
          </Typography>
          <Typography variant="subtitle1">
            {fCurrency(product.price)}
          </Typography>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  onProductClick: PropTypes.func,
};