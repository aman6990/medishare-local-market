
// Ensure React is imported first to avoid hooks initialization issues
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Use the non-concurrent mode React 18 API to avoid potential issues
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
