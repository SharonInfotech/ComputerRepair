import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initWebVitals } from './utils/vitals.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Initialize Google Core Web Vitals (LCP, INP, CLS, TTFB) tracking
initWebVitals();

// Register Service Worker for PWA caching in production, unregister in dev to prevent reload loops
if ('serviceWorker' in navigator) {
  const isProd = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
  if (isProd) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => {
          console.debug('[SW] Registration notice:', err);
        });
    });
  } else {
    // Unregister any active service worker during development to prevent refresh/reload loops
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}

