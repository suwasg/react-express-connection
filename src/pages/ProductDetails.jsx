import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, IMG_URL } from '../config';

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const params = useParams()

    const id = params.productID
    useEffect(()=>{
        axios.get(`${API_URL}/productdetails/${id} `)
        .then(res=>
            // console.log(res.data),
            setProduct(res.data.product)
       )
        .catch(err=> console.log(err))
    }, [id])


    const addToCart=()=>{
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const productItem = {
        id: product._id,
        name:product.product_name,
        price:product.product_price,
        rating: product.product_rating,
        image:product.product_images[0],
        stock:product.count_in_stock,
        quantity: 1,
        
      }

      const existingItem = cartItems && cartItems.find(item=> item.id === productItem.id)

      if (existingItem){
        toast.error(`${productItem.name} is already in the cart.`)
      }
      else{
        cartItems.push(productItem)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        toast.success(`${productItem.name} is added to the cart.`)
      }
    }

  return (
    <>

    <Helmet>
      <title>{product.product_name}</title>
    </Helmet>

    <ToastContainer theme='colored' autoClose={1000} position='top-center' />

  <div className="container my-3">
        <div className="row d-flex justify-content-evenly align-items-center shadow">

          <div className="col-md-4">
          {
                product.product_images && 
                product.product_images.length>0 && 
                product.product_images.slice(0,1)
                .map((pic,index)=>(
                  // console.log(`${IMG_URL}/${product_images}`)
                  // <img src={`${pic}`} alt={product_name}  />
                  <img src={`${IMG_URL}/${product.product_images[0]}`} alt="" height={200}/>
                ))
              }
          </div>

          <div className="col-md-6">
            <h1 className="text-muted">{product.product_name}</h1>
            <h2>Rs: {product.product_price}</h2>
            <strong>Category: {product.category && product.category.category_name}</strong>
            <p>{product.product_description}</p>
            <p>Available in stock: {product.count_in_stock}</p>

            <div className="my-2">
              <button className="btn btn-warning" onClick={addToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductDetails