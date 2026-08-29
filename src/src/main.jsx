import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './store/themeStore'; // ensures persisted store import runs before paint
import './styles/index.css';

// Default to dark mode on first-ever load (before the theme store rehydrates),
// preventing a light-mode flash for new visitors.
if (!localStorage.getItem('pulse-theme')) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
