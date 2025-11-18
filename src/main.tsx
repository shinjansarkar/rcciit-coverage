import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Load auth debug utility (only in development)
if (import.meta.env.DEV) {
  import('./utils/authDebug');
}

createRoot(document.getElementById("root")!).render(<App />);
