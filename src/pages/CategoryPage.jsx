import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useCompatibility } from '../context/CompatibilityContext';
import '../globals.css'

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addProduct, checkCompatibility } = useCompatibility();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/get-productsByCat/${category}`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [category]);

    const handleOnAdd = (product) => {
        const isCompatible = checkCompatibility(product);
        if (!isCompatible) {
            return;
        }
        addProduct(product); 
        navigate('/pc-builder', { state: { product: product } });
    };

    return (
        <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
            <Navbar />
            <div className="container mt-4">
                <h1 className="mb-4">Category Page</h1>
                <div className="row">
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p>No products found for this category.</p>
                    ) : (
                        products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100 "
                            style={{

                                transition: "box-shadow 0.3s ease",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "500px",
                                overflow: "auto",}}
                            onMouseOver={(e) => {
                            e.currentTarget.style.boxShadow = "0px 0px 15px 5px rgba(0,0,0,0.1)";
                            e.currentTarget.querySelector('.card-img-top').style.transform = "scale(1.1)"}}

                            onMouseOut={(e) => {
                                e.currentTarget.style.boxShadow = "";
                                e.currentTarget.querySelector('.card-img-top').style.transform = "scale(1)";}}  
                            >
                                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <div style={{ overflow: 'hidden' }}>
                                        <img
                                            src={`http://localhost:5000/uploads/${product.image}`}
                                            className="card-img-top"
                                            alt="product"
                                            style={{ 
                                                width: "100%", 
                                                maxHeight: "100%", 
                                                objectFit: "cover", 
                                                transition: "transform 0.3s ease"
                                            }}
                                        />
                                    </div>
                                    <div className="card-body" >
                                        <h5 className="card-title">{product.product}</h5>
                                        <p className="card-text">{product.price}</p>
                                        {product.keySpecifications && (
                                            <ul className="list-group list-group-flush">
                                                {Object.entries(product.keySpecifications).slice(0, 4).map(([key, value]) => (
                                                    <li key={key} className="list-group-item">
                                                        <strong>{key}:</strong> {value}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </Link>
                                <div className="card-footer">
                                    <button className="btn btn-dark w-100" onClick={() => handleOnAdd(product)}>Add to Build</button>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
