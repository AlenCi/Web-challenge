// src/pages/app.jsx
import { Helmet } from 'react-helmet-async';
import { Typography, Container, Box } from '@mui/material';

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <Typography variant="h2" sx={{ mb: 5 }}>
            Web Challenge
          </Typography>
        </Box>
      </Container>
    </>
  );
}