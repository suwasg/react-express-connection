import React, { useState, useEffect } from 'react'
import { API_URL } from '../config'
import axios from 'axios'
import { isAuthenticated } from '../auth'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const options={
    style:{
        base:{
            fontSize:'18px'
        },
        invalid:{
            color:'red' 
        }
    }
}

const Payment = () => {

    const navigate=useNavigate()
    const stripe=useStripe()
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

    const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))
    console.log('orderInfo: ', orderInfo)

    const paymentData={
        amount:Math.round(orderInfo.totalPrice*100)
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        document.querySelector("#pay-btn").disabled=true

        let response;
        try{
            const config= {
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            response=axios.post(`${API_URL}/process/payment`, paymentData,config)
            const client_secret=(await response).data.client_secret
            console.log('client secret: ', client_secret)

            if(!stripe || !elements){
                return
            }

            const paymentMethod={
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user?.name,
                        email:user?.email,
                    phone:user?.phone  
                    }
                }
            }
            const result=await stripe.confirmCardPayment(`${client_secret}`,paymentMethod )

            if(result.error){
                toast.error(result.error.message)
                document.querySelector('#pay-btn').disabled=false
            }
            else{
                // payment processed or not
                if(result.paymentIntent.status==='succeeded'){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                }

                try{
                    const config= {
                        headers:{
                            'Content-Type':'application/json',
                            Authorization:`Bearer ${token}`
                        }
                    }
                    const {data}= await axios.post(`${API_URL}/postorder`, order, config)
                    localStorage.removeItem('cartItems')
                    navigate('/success')

                }
                catch(error){
                        toast.error(error)
                }
            }

        }
        catch(error){
            document.querySelector('#pay-btn').disabled=false
            toast.error(error)
        }

    }


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