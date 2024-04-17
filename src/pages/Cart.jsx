import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';
import { IMG_URL } from '../config';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  const navigate=useNavigate()
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      // Attempt to parse the cart item from localStorage
      const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
      console.log(cartData)
      setItems(cartData);
    } catch (error) {
      // If parsing fails, log the error and initialize with an empty array
      console.error('Failed to parse cart items from localStorage:', error);
      setItems([]);
    }
  }, []);
  

  const increaseQty=id=>{
    const updatedItems=items.map( item=>{
      if(item.id === id  && item.quantity<item.stock ){
        return {...item, quantity:item.quantity+1}
      }
      return item 
    })

    setItems(updatedItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    
   }
// spread operator  ...

const decreaseQty=id=>{
  const updatedItems=items.map(item=>{
    if(item.id===id && item.quantity>1){  
      return{...item, quantity: item.quantity-1}
    }
    return item 
   
  })
  setItems(updatedItems)   //state change
  localStorage.setItem('cartItems', JSON.stringify(updatedItems))
}


// remove item from the cart
const removeCartHandler=id=>{
   const itemToRemove = items.find(item => item.id === id);
   const confirmed = window.confirm(`Are you sure you want to remove ${itemToRemove ? itemToRemove.name : 'the item'} from the cart?`);

  if (confirmed){
    const filterCart=items.filter(item=>item.id!==id)
    localStorage.setItem('cartItems', JSON.stringify(filterCart))
    setItems(filterCart)  
    toast.success(`${itemToRemove ? itemToRemove.name : 'The item'} is removed from the cart.`);
  }
}

  const shippingHandler=()=>{
    navigate('/signin?redirect=shipping')
  }


    return (
    <>
      <ToastContainer theme='colored' position='top-center' autoClose={1000} pauseOnHover />
      <div className="container">
        <div className="row d-flex justify-content-between my-4">
          
          {items && items.length === 0 ? (
            <div>
            <h2 className='text-center text-danger'>
              Your cart is Empty.
            </h2>
            <div className="row d-flex align-items-center">
            <div className="col-6 offset-3">
            <img src='/images/graphql2.png' alt='cart-photo' height={'250px'} width={'500px'} className='rounded-4'/>
            </div>
           
           <div className="col-3">
            {/* <button className="btn btn-primary rounded-3 border-0" onClick={productsShow()}> Shop Here</button>  */}

            <Link to='/products' className='btn btn-warning rounded-3'>Shop Here</Link>
           </div>
            </div>
          
          
            </div>
          ) : (
            <Fragment>
              <h2 className='text-center'>Your Cart Items</h2>
              {/* items details */}
              <div className="col-md-8 shadow">
                {items&&items?.map((item) => (
                  <Fragment key={item.id}>
                    <hr />
                    <div className="row d-flex align-items-center">
                      <div className="col-2">
                        <img src={` ${IMG_URL}/${item?.image}`} alt={item.name} width={'50'} />
                        {/* {console.log('item.image: ',item.image)} */}
                      </div>
                      <div className="col-3">
                        <strong>{item.name}</strong>
                      </div>
                      <div className="col-1 text-warning">
                        ${item.price}
                      </div>
                      <div className="col-2">
                        {item.rating} stars
                      </div>
                      <div className="col-3">
                        <div className="d-flex align-items-center">
                          {item.quantity > 0 && (
                            <button
                              className="btn btn-danger me-1"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </button>
                          )}
                          <strong>{item.quantity}</strong>
                       {item.quantity>=1 && 
                          <button
                          className="btn btn-success ms-1"
                          // onClick={() => increaseQuantity(item.id)}
                          onClick={()=>increaseQty(item.id)}
                        >
                          +
                        </button>
                       }
                       
                        </div>
                      </div>
                      <div className="col-1">
                        {item.quantity>0 && 
                            <button
                            className=" btn btn-danger"
                            onClick={()=>removeCartHandler(item.id)}
                          >
                            <FaTrash />
                          </button>
                        }
                    
                      </div>
                    </div>

                    <hr />
                  </Fragment>
                ))}
              </div>

              {/* summary */}
              <div className="col-md-3 " >

                  <div className="shadow p-2">
                        <h3 className='fw-bold'>Cart Summary</h3>
                        <hr/>
                        <p><strong>Units:</strong>{items.reduce((a,b)=>a+ Number(b.quantity),0)} </p>
                        <p><strong>Total:</strong>${items.reduce((ac,item)=> ac+(item.quantity*item.price) ,0  )}    
                        </p>
                        <hr />
                        <button className="btn btn-warning"  onClick={shippingHandler}>Check Out</button>
                  </div>


              </div>
            </Fragment>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Cart;