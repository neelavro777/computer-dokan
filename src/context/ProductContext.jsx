import React, { useState, createContext, useContext } from 'react';

export const ProductContext = createContext();

export const useProductContext = () =>  useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
    const [productPrice, setproductPrice] = useState('')
    const [product, setProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offerStatus, setOfferStatus] = useState(false);
    const [newOffer, setNewOffer] = useState(null);
    return (
      <ProductContext.Provider value={{ productPrice, setproductPrice, product, setProduct, selectedProduct, setSelectedProduct, setOffers, offers, setSelectedOffer, selectedOffer, offerStatus, setOfferStatus, newOffer, setNewOffer}}>
        {children}
      </ProductContext.Provider>
    );

};