// src/main.jsx
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <GoogleOAuthProvider clientId="948990571448-av1dnjgs45j7puuf62re3om3mbe9cfpf.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);