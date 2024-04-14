import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import ReviewDisplay from '../components/ReviewDisplay';
import ProductPageDashboard from '../components/ProductPageDashboard';
import SpecificationTable from '../components/SpecificationTable';  
import Navbar from '../components/Navbar'; 
// import RatingGraph from '../components/RatingGraph';

const ProductPage = () => {
    const { id } = useParams();
    const [useriD, setUseriD] = useState('');
    const [username, setusername] = useState('');
    const [activeTab, setActiveTab] = useState('active');
    const [product, setProduct] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    // const ratings=[1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
    // const specifications = [
    //   {
    //     "product specs": [
    //       { "Processor": "Intel Core i7" },
    //       { "RAM": "16GB DDR4" },
    //       { "Storage": "1TB SSD" },
    //       { "Graphics": "NVIDIA GeForce RTX 3080" }
    //     ]
    //   },
    //   {
    //     "product specs": [
    //       { "Processor": "AMD Ryzen 9" },
    //       { "RAM": "32GB DDR4" },
    //       { "Storage": "2TB SSD" },
    //       { "Graphics": "AMD Radeon RX 6800 XT" }
    //     ]
    //   },
    //   {
    //     "product specs": [
    //       { "Processor": "Intel Core i9" },
    //       { "RAM": "64GB DDR4" },
    //       { "Storage": "4TB SSD" },
    //       { "Graphics": "NVIDIA Quadro RTX 6000" }
    //     ]
    //   },
    //   {
    //     "product specs": [
    //       { "Processor": "AMD Ryzen 7" },
    //       { "RAM": "8GB DDR4" },
    //       { "Storage": "512GB SSD" },
    //       { "Graphics": "NVIDIA GeForce GTX 1660 Ti" }
    //     ]
    //   }
    // ];
    


    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     if (token) {
    //         setUseriD(localStorage.getItem("userId"));
    //         setusername(localStorage.getItem("userName"));
    //     }
    // }, []);
    
    useEffect(() => {
        const originalBackgroundColor = document.body.style.backgroundColor;
        document.body.style.backgroundColor = 'rgb(242, 242,242)';
        const token = localStorage.getItem("accessToken");
        if (token) {
            setUseriD(localStorage.getItem("userId"));
            setusername(localStorage.getItem("userName"));
        }
        return () => {
            document.body.style.backgroundColor = originalBackgroundColor;
        };
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/get-product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className=''>
            <Navbar />
            <h1>ProductPage</h1>
            {/* <RatingGraph ratings={ratings} />   */}

            <div className='py-5'><ProductPageDashboard productID={id} product={product}/></div>
            <div className='container mx-auto w-75'>
                <div className="btn-group text-white py-3" role="group" aria-label="...">
                    <button
                        type="button"
                        className={`btn btn-${activeTab==='active'?'dark':'default'} ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                        onMouseOver={(e) => activeTab === 'active' ? e.target.style.backgroundColor = '' : e.target.style.backgroundColor = '#343a40'}
                        onMouseOut={(e) => activeTab === 'active' ? e.target.style.backgroundColor = '' : e.target.style.backgroundColor = 'white'}
                    >
                        Specifications
                    </button>
                    <button
                        type="button"
                        className={`btn btn-${activeTab==='link'?'dark':'default'} ${activeTab === 'link' ? 'active' : ''}`}
                        onClick={() => setActiveTab('link')}
                        onMouseOver={(e) => activeTab === 'link' ? e.target.style.backgroundColor = '' : e.target.style.backgroundColor = '#343a40'}
                        onMouseOut={(e) => activeTab === 'link' ? e.target.style.backgroundColor = '' : e.target.style.backgroundColor = 'white'}
                    >
                        Reviews
                    </button>
                    <button
                        type="button"
                        className={`btn btn-default ${activeTab === 'disabled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('disabled')}
                        disabled
                    >
                        Disabled
                    </button>
                </div>
                {activeTab === 'link'?
                <div className='py-3 '>  
                  <div className=''><ReviewDisplay productID={id} /></div>
                  <div className=''>
                    <button className="btn btn-dark "type="button" onClick={() => setShowReviewForm(prevShowReviewForm => !prevShowReviewForm)}>Write Review</button>
                    {showReviewForm && <ReviewForm productID={id} userID={useriD} userName={username} />}
                  </div>
                </div>: null}
                {activeTab === 'active' && 
                <div className='border rounded '>

                <SpecificationTable specifications={product.specifications}/>
                </div>}
            </div>
        </div>
    );
};

export default ProductPage;
