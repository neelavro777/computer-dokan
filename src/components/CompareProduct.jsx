import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SpecificationTable from './SpecificationTable';
import SearchProduct from './SearchProduct';
import ProductCard from './ProductCard';


const CompareProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);


    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/get-item`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };
        fetchProducts();
    }, []);
    
    const handleProductClick = (product) => {
        console.log(product);
        const newCategory = product.category;
        const existingCategories = selectedProducts.map(product => product.category);
        if (existingCategories.length > 0 && !existingCategories.includes(newCategory)) {
            alert('Can only compare products with the same category.');
            return;
        }
        setSelectedProducts(prevProducts => [...prevProducts, product]);

    };

    const handleCloseButtonClick = (index) => {
        setSelectedProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

  return (
<div className='container mx-auto w-75'>
    <h1 className='mt-4'>Compare Product</h1>
    <SearchProduct products={products} onProductClick={handleProductClick}/>
    <div className="d-flex justify-content-between py-3">
        {selectedProducts.map((product, index) => (
            <div key={index} className="border rounded p-3">
                <h1 className='h4' style={{ wordWrap: 'break-word', maxWidth: '500px' }}>{product.product}</h1>
                <SpecificationTable specifications={product.specifications}  />
                <button className="btn btn-sm btn-danger mt-2" onClick={() => handleCloseButtonClick(index)}>Close</button>
            </div>
        ))}
    </div>
</div>

  )
}

export default CompareProduct