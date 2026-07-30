import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/600.css";
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const query = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <QueryClientProvider client={query}>  
    
    <App />
    
  </QueryClientProvider>
  </BrowserRouter>
  </StrictMode>,
)
