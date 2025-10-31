import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import './index.css'
import 'normalize.css';
import { LibrariesProvider } from './context/LibrariesContext'
import { AppInitializer } from './AppInitializer';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LibrariesProvider>
      <AppInitializer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LibrariesProvider>
  </StrictMode>,
)
