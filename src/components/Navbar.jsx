import React, { useState } from 'react';
import '../App.css';
import { useCart } from '../context/CartContext';
import { BsCart3,BsTrash } from "react-icons/bs";
import { Button, Offcanvas, Card } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../globals.css';


function Navbar() {
  const { cartItems,cartCount,removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleToggleCart = () => setShowCart((prev) => !prev);

  const handleRemove = (product) => {
    removeFromCart(product);
  };


  return (
    <header className="p-3 text-bg-dark sticky">
      <div className="container ">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2 text-white">Home</a></li>
            <li><a href="/pc-builder" className="nav-link px-2 text-white">PC Builder</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
            <li><a href={`/compare`} className="nav-link px-2 text-white">Compare</a></li>
            <li>
              <div style={{ width: "3rem", height: "3rem", position: "relative" }}>
                <Button variant="" onClick={handleToggleCart} className="nav-link px-2 text-white" >
                  <BsCart3 size={30}  />
                </Button>
                <div className="rounded-circle bg-danger d-flex justify-content-center aligh-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(50%,-25%)"
                  }}>
                  {cartCount}
                </div>
              </div>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">Lorem</button>
            <button type="button" className="btn btn-warning">Ipsum</button>
          </div>
        </div>
      </div>
      <Offcanvas
          show={showCart}
          onHide={handleCloseCart}
          placement="end"
          scroll={true}
          backdrop={false}>
        <Offcanvas.Header style={{ backgroundColor: "rgb(50,50,50)", color:"white", display: "flex", justifyContent: "space-between" }}>
          <Offcanvas.Title style={{color:'white'}}>Your Cart</Offcanvas.Title>
          <Button variant="" onClick={handleCloseCart}  style={{ color: "white" }}><AiOutlineClose size={25}/></Button>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: "rgb(252, 252, 252)" }}>
        <div className="d-flex flex-column flex-wrap"style={{ paddingBottom: '120px',width:'100%' }}>
            {/* Map through cartItems to render cart content */}
            {cartItems.map((item, index) => (
              <Card key={index} className="mb-3 position-relative" style={{ width: '100%', 
                transition: "box-shadow 0.3s ease", overflow: "hidden",}}
            onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = "0px 0px 15px 5px rgba(0,0,0,0.1)";
            e.currentTarget.querySelector('.card-img-top').style.transform = "scale(1.1)"}}

            onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.querySelector('.card-img-top').style.transform = "scale(1)";}}  
            >
              <Card.Header className="position-relative p-2" style={{ backgroundColor: "transparent", border: "none" }}>
                <div style={{ position: "absolute", top: "0%", right: "0%", transform: "translateY(0%)" }}>
                  <div onClick={() => handleRemove(item)} onMouseOver={(e) => { e.target.style.color = "red" }} onMouseOut={(e) => { e.target.style.color = "" }}>
                    <AiOutlineClose size={15} style={{ cursor: 'pointer', backgroundColor: "transparent", border: "none" }} />
                  </div>
                </div>
              </Card.Header>

              <Link to={`/product/${item.id}`} style={{textDecoration:'none',color:'black'}}>
                  <div className="d-flex">
                    <Card.Img className='card-img-top' src={`http://localhost:5000/uploads/${item.image}`} style={{ width: '100px', height: '100px' }} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '12px' }}>{item.product}</Card.Title>
                      <Card.Text style={{ fontSize: '12px' }}>
                        TK {item.price} x {item.quantity}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "50px", left: "0", right: "0", backgroundColor: "rgb(242,242,242)", color: "black", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <p></p>
            <p></p>
            <hr style={{ width: "100%", margin: "5px 0" }} />
            <div><strong>Total: TK {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</strong> </div>
          </div>
          <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", backgroundColor: "rgb(242,242,242)", color: "black", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Link to="/cart" style={{ width: "100%" }}>
            <Button variant="dark" style={{ width: "100%" }}>Checkout</Button>
            </Link>
          </div>

          
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Navbar;
