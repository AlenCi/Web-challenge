// src/pages/login.jsx
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </>
  );
}