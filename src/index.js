import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import { ProductContextProvider } from './context/ProductContext';
import { ChatContextProvider } from './context/ChatContext';
import { CartProvider } from './context/CartContext';
import { CompatibilityProvider } from './context/CompatibilityContext'; // Import the CompatibilityProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <ProductContextProvider>
          <CompatibilityProvider>
              <ChatContextProvider>
                <CartProvider>
                  <SocketContextProvider>
                      <App />
                      <ToastContainer />
                    </SocketContextProvider> 
                  </CartProvider>
              </ChatContextProvider>
          </CompatibilityProvider>
        </ProductContextProvider>  
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
