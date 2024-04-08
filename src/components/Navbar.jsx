import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {isAuthenticated, signout } from '../auth'
const Navbar = () => {
  const navigate=useNavigate()
  const user=isAuthenticated()
  return (
    <>
       <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand  fw-bold" to="#">BrandG.</Link>
        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-lg-center " id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Blogs</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About Us
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Our Company</Link></li>
                  <li><Link className="dropdown-item" to="#">Our Team</Link></li>
                  <li><Link className="dropdown-item" to="#">Legal Documents</Link></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex flex-column flex-lg-row  align-items-lg-center">
                <div className="mb-2 mb-lg-0 ">
                    {/* <button className="btn btn-dark text-white">
                        Log In
                    </button> */}

                {
                  !isAuthenticated() && 
                  <>
                  <NavLink to='/signin' type='button' className='btn btn-dark text-white me-2'> Login </NavLink>

                  <NavLink to='/signup' type='button' className='btn btn-dark text-white me-2'> Register </NavLink>

                  </>
                  
                }


                {
                  isAuthenticated() && isAuthenticated().user?.role===1 && 
                  <NavLink to='/admin/dashboard' type='button' className='btn btn-dark me-2'>Admin</NavLink>
                }

{
                  isAuthenticated() && isAuthenticated().user?.role===0 && 
                  <NavLink to='/' type='button' className='btn btn-dark me-2'>Profile</NavLink>
                }


              {

                isAuthenticated() && 
                <button className="btn btn-danger mx-2 my-1"
                onClick={()=>signout(
                  ()=>navigate('/signin')
                )}>
                  Logout
                </button>
              }

                    
                </div>
                
                <div className="mb-2 mb-lg-0 ms-2">
                  <Link to="/cart" className='text-decoration-none'>
                  <FaShoppingCart className='fs-2 text-dark' />   
                  </Link>
                 </div>
            </div>
          
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;