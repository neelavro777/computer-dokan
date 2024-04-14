import React, { useEffect,useState } from 'react';
// import gcardSvg from '../images/gcard.svg';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {useCompatibility} from '../context/CompatibilityContext';
import pros from '../images/GPU.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';
import { AiOutlineClear } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';


const PCbuilderPage = () => {
    const categories = ["Graphics Card","Processor","Motherboard","RAM","RAM","Storage","Storage","Power Supply","Cooling","Case","Monitor","Keyboard","Mouse","Headphone"];
    const coreComponents = ["Processor", "Motherboard", "Graphics Card", "Power Supply", "RAM", "Storage"];
    const quantity=1;

    // const location = useLocation();
    // const product = location.state?.product;
    const {calculateTotalPowerUsage,calculateTotalPrice,selectedProducts,removeProduct,removeAllProducts} = useCompatibility();
    const {addToCart} = useCart();


    const handleRemove = (id) => {
        removeProduct(id);
        
    }

const handleOnClick = () => {
    // Find the missing core components
    // const missingComponents = coreComponents.filter(component =>
    //     !selectedProducts.some(product => product.category === component)
    // );

    // // If there are missing components, display an alert with the list of missing components
    // if (missingComponents.length > 0) {
    //     const missingComponentsString = missingComponents.join(', ');
    //     toast.error(`Please select the following core components: ${missingComponentsString}`);
    //     return; // Abort further execution
    // }

    // Proceed with adding to cart if all core components are present
    selectedProducts.forEach(product => {
        addToCart({ ...product, quantity });
    });
    toast.success("Added to cart");
};

    const handleClearAll = () => {
        removeAllProducts();
    }
        


    return (
        <div className="" style={{ minHeight: "100vh"}}>
            <Navbar />
            <div className='floating-window'>
            <div className='cart-counter'>
            <div className=""><FaShoppingCart size={30} style={{ color: 'white' }}/></div> 
            </div>
            </div>

            <div className="container-fluid border">
    <div className="container mx-auto w-75 border">
        <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-center mb-4">PC Builder Page</h1>
            <div className="d-flex align-items-center" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="mr-3" onMouseOver={(e) => { e.target.style.color = "green" }} onMouseOut={(e) => { e.target.style.color = '#000' }} onClick={handleOnClick}>
                    <div className="px-3"><FaShoppingCart size={30} style={{ color: '#000' }}/></div>
                    <div >Add to Cart</div>
                </div>
                <div className="px-3">
                    <div className="px-2" onClick={handleClearAll}><AiOutlineClear size={30} style={{ color: '#FF0000' }}/></div>
                    
                    <div className='px-'>Clear All</div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card border-dark">
                    <div className="card-header bg-dark text-white">
                        Estimated Power Usage
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Estimated Power Usage</h5>
                        <p className="card-text">{calculateTotalPowerUsage()}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card border-dark">
                    <div className="card-header bg-dark text-white">
                        Total Cost
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Total Cost</h5>
                        <p className="card-text" style={{color:"green"}}>{calculateTotalPrice()}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
        {categories.map((category, index) => {
    const product = selectedProducts.find(p => p.category === category);
    return (
        <div key={index} className="col-md-6 mb-4">
            <div className="card bg-transparent border border-primary">
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="image-container" style={{ height: "100px", overflow: "hidden" }}>
                            {product ? (
                                <Link to={`/product/${product.id}`}>
                                    <img src={`http://localhost:5000/uploads/${product.image}`} className="img-fluid rounded-start" alt="..." style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }} />
                                </Link>
                            ) : (
                                <img src={pros} className="img-fluid rounded-start" alt="..." style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }} />
                            )}
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h5 className="card-title" style={{ fontSize: '1em', fontWeight: 'bold' }}>{category}</h5>
                                {product && (
                                    <>
                                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e)=>{e.target.style.textDecoration='underline'}} onMouseOut={(e)=>{e.target.style.textDecoration=""}} >
                                            <p style={{ margin: '0.25em 0', fontSize: '0.75em', fontWeight: 'bold' }}>{product.product}</p>
                                        </Link>
                                        <p style={{ margin: '0.25em 0', fontSize: '0.75em', fontWeight: 'bold' }}>Product Price: {product.price}</p>
                                    </>
                                )}
                            </div>
                            {product ? (
                                // <div>
                                //     <p></p>
                                //     <button onClick={() => handleRemove(product.id)} className="btn btn-danger">Remove</button>
                                // </div>
                                <div onClick={() => handleRemove(product.id)} onMouseOver={(e) => { e.target.style.color = "red" }} onMouseOut={(e) => { e.target.style.color = "" }}>
                                    <p></p>
                                <AiOutlineClose size={30} style={{ cursor: 'pointer' }}/>
                              </div>
                            ) : (
                                <div>
                                    <Link to={`/category/${category}`} className="btn btn-dark" onMouseOver={(e) => { e.target.style.backgroundColor = "#000080" }} onMouseOut={(e) => { e.target.style.backgroundColor = '' }}>Add</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})}
        </div>
    </div>
</div>



        </div>
    );
}

export default PCbuilderPage;