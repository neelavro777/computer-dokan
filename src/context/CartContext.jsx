// CartContext.js
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = React.createContext();

const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  const [cartCount, setCartCount] = useState(() => {
    const localData = localStorage.getItem('cartCount');
    return localData ? JSON.parse(localData) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartItems, cartCount]);

  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevItems => [...prevItems, product]);
    }
    setCartCount(prevCount => prevCount + product.quantity);
  };

  const removeFromCart = (product) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== product.id);
      setCartCount(newItems.length);
      return newItems;
    });
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    setCartCount,
    setCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider, useCart };


