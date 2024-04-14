import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { AiOutlineClose } from "react-icons/ai";

const CartPage = () => {
  const { cartItems,setCartItems,setCartCount, removeFromCart } = useCart();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false); 


  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'rgb(242, 242,242)';
    console.log(cartItems);
    
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserId(localStorage.getItem("userId"));
      setUsername(localStorage.getItem("userName"));
    } else {
      setRedirectToLogin(true);
    }
    
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const handleCheckout = () => {
    if (userId && username) {
      const data = {
        userId: userId,
        userName: username,
        products: cartItems
      };

      fetch('http://localhost:5000/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
      });
    } else {
      setRedirectToLogin(true);
    }
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setCartCount(prevCount => prevCount + 1);
    // Update cartItems state with the new array
  };

  const decreaseQuantity = (product) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity > 1) {
        setCartCount(prevCount => prevCount - 1);
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    // Update cartItems state with the new array
  };

  

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="mt-4">
          <table className="table border">
            <thead>
              <tr className='table-dark'>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.product}
                        className="img-thumbnail"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e)=>{e.target.style.textDecoration='underline'}} onMouseOut={(e)=>{e.target.style.textDecoration='none'}}>
                      {product.product}
                    </Link>
                    <p>TK {product.price}</p>
                  </td>
                  <td>{product.category}</td>
                  <td>Tk {product.price*product.quantity}</td>
                  <td>
                    <div className="input-group">
                      <button className="btn btn-outline-secondary" type="button" onClick={() => decreaseQuantity(product)}>-</button>
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "20px", textAlign: "center" }} 
                        value={product.quantity}
                        readOnly
                      />
                      <button className="btn btn-outline-secondary" type="button" onClick={() => increaseQuantity(product)}>+</button>
                    </div>
                  </td>
                  <td>
                    <div onClick={() => handleRemove(product)} onMouseOver={(e) => { e.target.style.color = "red" }} onMouseOut={(e) => { e.target.style.color = "" }}>
                      <AiOutlineClose size={30} style={{ cursor: 'pointer' }}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {redirectToLogin ? (
          <Link to="/login" className="btn btn-primary">Login to Checkout</Link>
        ) : (
          <button className="btn btn-dark" onClick={handleCheckout}>Checkout</button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
