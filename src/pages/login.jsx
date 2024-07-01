// src/pages/login.jsx
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Container, Box, Typography, Paper } from '@mui/material';

import { useAuth } from 'src/contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    login(decoded);
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Sign in
            </Typography>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Paper>
        </Box>
      </Container>
    </>
  );
}