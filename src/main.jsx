import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './pages/Context/cartcontext.jsx'
import AuthProvider from './pages/Context/authcontext.jsx'
import { WishlistProvider } from './pages/Context/wishlistcontext.jsx'
import { Provider } from 'react-redux'
import { store } from './pages/redux/store.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />  
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>  
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
