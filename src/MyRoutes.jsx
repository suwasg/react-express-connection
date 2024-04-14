import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layouts from './components/Layouts'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Confirm from './auth/Confirm'
import ForgetPassword from './auth/ForgetPassword'
import ResetPassword from './auth/ResetPassword'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './admin/Dashboard'
import AdminProducts from './admin/AdminProducts'
import AdminCategories from './admin/AdminCategories'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import AddCategory from './admin/AddCategory'
import NotFound from './pages/NotFound'
import Shipping from './pages/Shipping'
const MyRoutes = () => {
  return (
    <Router>

        <Routes>


          <Route path='/' element={<Layouts/>}>
            <Route index element={<Homepage/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='product-details/:productID' element={<ProductDetails/>}/>
            <Route path='cart' element={<Cart/>}/>
            
            <Route path='email/confirmation/:token' element={<Confirm/>}/>
            <Route path='forgetpassword' element={<ForgetPassword/>}/>
            <Route path='reset/password/:token' element={<ResetPassword/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='signin' element={<Signin/>}/>

          </Route>

    {/* admin routes */}
          <Route path='/admin/' element={<AdminRoute/>}>

              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='products' element={<AdminProducts/>}/>


              <Route path='category' element={<AdminCategories/>}/>

              <Route path='addproduct' element={<AddProduct/>}/>
              <Route path='updateproduct/:productId' element={<UpdateProduct/>}/>
              <Route path='addcategory' element={<AddCategory/>}/>
          </Route>


          <Route path='/*' element={<NotFound/>}/> 
          {/* catch-all route */}


        </Routes>

    </Router>
  )
}

export default MyRoutes