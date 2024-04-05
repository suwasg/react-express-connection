import React from 'react'
import { Link } from 'react-router-dom'

import './card.css'
import { IMG_URL } from '../config'
const Card = (props) => {

  // object destructuring
  const {product_name, product_description, product_images, product_price, _id} = props.data
  console.log(product_images)
  return (
    <>
          
          <div class="col">
            <div class="card h-100">
              {/* <img src={image} class="card-img-top img-fluid" alt={title}/> */}
              {
                product_images && 
                product_images.length>0 && 
                product_images.slice(0,1)
                .map((pic,index)=>(
                  // console.log(`${IMG_URL}/${product_images}`)
                  // <img src={`${pic}`} alt={product_name}  />
                  <img src={`${IMG_URL}/${product_images[0]}`} alt="" />
                ))
              }
              <div class="card-body">
                <h5 class="card-title"> {product_name} </h5>
                <p className='text-danger fw-bold'>Rs.{product_price}</p>
                <p class="card-text">{product_description.slice(0,50)}....</p>
                <Link to={`/product-details/${_id}`} class="btn btn-warning text-dark px-4 py-2">View Details</Link>
              </div>
            </div>
          </div>

    </>
  )
}

export default Card