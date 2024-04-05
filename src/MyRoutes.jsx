import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './components/Layouts'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'


const MyRoutes = () => {
  return (
    <Router>

        <Routes>


          <Route path='/' element={<Layouts/>}>
            <Route index element={<Homepage/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='product-details/:productID' element={<ProductDetails/>}/>
            <Route path='cart' element={<Cart/>}/>
            {/* <Route path='register' element={<Register/>}/> */}
          </Route>

       
            
     

        </Routes>

    </Router>
  )
}

export default MyRoutes