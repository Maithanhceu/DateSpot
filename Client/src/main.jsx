import { StrictMode } from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const domain =import.meta.env.VITE_AUTH0_DOMAIN;
const clientId =import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider 
    domain ={domain} 
    clientId={clientId} 
    redirectUri={window.location.origin}
    >

      <App />
    </Auth0Provider>
  </StrictMode>,
)
