import React, { useState, useEffect } from 'react'
import { API_URL } from '../config'
import axios from 'axios'
import { isAuthenticated } from '../auth'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Payment = () => {

    const navigate=useNavigate()
    const stipe=useStripe()
    const elements=useElements()
    const{user, token} = isAuthenticated()
    console.log('user: ', user)
    console.log('token: ', token)
    const cartItems=JSON.parse(localStorage.getItem("cartItems"))
    const shippingInfo=JSON.parse(localStorage.getItem('shippingInfo'))

    const orderItems=cartItems.map(item=>({
        product:item.id,
        quantity:item.quantity
    }))

    const order={
        order_items:orderItems,
        shipping_address1:shippingInfo.shipping_address1,
        shipping_address2:shippingInfo.shipping_address2,
        city:shippingInfo.city,
        zip:shippingInfo.zip,
        country:shippingInfo.country,
        phone:shippingInfo.phone,
        user:user._id
    }
    console.log('order: ', order)


  return (
    <>
    
    
    <ToastContainer theme='colored' position='top-center' autoClose={1000} />
            <div className="container my-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-5 shadow p-3 my-4">
                        <form onSubmit={submitHandler}>
                            <h2 className='mb-3'> Cart Information</h2>
                            <div className="mb-3">
                                <label htmlFor="card-number">Card Number</label>
                                <CardNumberElement type='text' className='form-control' id='card-number' options={options} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="card-expiry">Card Expiry</label>
                                <CardExpiryElement type='text' className='form-control' id='card-expiry' options={options} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="card-cvc">Card CVC</label>
                                <CardCvcElement type='text' className='form-control' id='card-cvc' options={options} />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-success px-4 py-2 form-control" id='pay-btn'>
                                    Pay Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    
    </>
  )
}

export default Payment