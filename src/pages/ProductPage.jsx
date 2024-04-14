import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewForm from '../components/ReviewForm'
import axios from 'axios'

const ProductPage = () => {
    const { id } = useParams()
    const [useriD, setUseriD] = useState('');
    const [username,setusername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (token) {
            setUseriD(localStorage.getItem("userId"));
            setusername(localStorage.getItem("userName"));
        }
      }, []);
  return (
    <div>
    <ReviewForm productID={id} userID={useriD} userName={username}/>
    <div><h1>ProductPage</h1>
    <p>Product ID: {id}</p>
    <p>User ID: {useriD}</p>
    <p>Username: {username}</p>
    </div></div>


  )
}

export default ProductPage