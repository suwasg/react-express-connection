import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
import { FaCartPlus, FaChartBar, FaEnvelope, FaFolder, FaFolderPlus, FaHackerNews, FaNewspaper, FaRegNewspaper, FaShoppingCart } from 'react-icons/fa';
const AdminSidebar = () => {
    const navigate = useNavigate();
    const { user } = isAuthenticated();
    const [offcanvasVisible, setOffcanvasVisible] = useState(false);


    // Function to close the offcanvas
    const closeOffcanvas = () => {
        setOffcanvasVisible(false);
    };


    return (
        <>

            <div className="container  " >

                    {/* <div className="logo-image">
                        <img src="/images/Logo/Logo.png" alt="Logo" height={70} />
                    </div> */}
                    <Link to='/' className='text-decoration-none'>
                        <h1 className='text-warning fw-bold mb-4 '>BrandG.</h1>
                    </Link>
                    <ul className="list-unstyled">
                                  <li>
                                      <Link
                                          to="dashboard"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                      <span className='text-warning fs-4'><FaChartBar/></span>    Dashboard
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/products"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                      <span className='text-warning fs-4'><FaShoppingCart/></span>    Products
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/category"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                      <span className='text-warning fs-4'><FaFolder/></span>     Category
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/blogs"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                      <span className='text-warning fs-4'><FaRegNewspaper/></span>     Blogs
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/contacts"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                        <span className='text-warning fs-4'><FaEnvelope/></span>   Messages
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/addproduct"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                      <span className='text-warning fs-4'><FaCartPlus/></span>     Add Product
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/addcategory"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                        <span className='text-warning fs-4'><FaFolderPlus/></span>   Add Category
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to="/admin/addblog"
                                          className="text-decoration-none text-white"
                                          onClick={closeOffcanvas} // Close the offcanvas on click
                                      >
                                       <span className='text-warning fs-4'><FaNewspaper/></span>    Add Blog
                                      </Link>
                                  </li>
                                  </ul>
                    <div className='mt-5'>
                    <ul className="list-unstyled">
                                      <li>
                                          <Link to="#" className="text-decoration-none text-white">
                                              <b>Name : </b>
                                              <span className="text-white fs-6">
                                              {user && user?.name}
                                              </span>

                                          </Link>
                                      </li>
                                      <li>
                                          <Link to="#" className="text-decoration-none text-white ">
                                              <b>Email : </b>  <span className="text-white fs-6">
                                              {user.email}
                                                  </span>
                                          </Link>
                                      </li>
                                  </ul>
                                  <Link
                                      to="/signin"
                                      className="btn btn-danger "
                                      onClick={() => signout(() => {
                                          navigate('/signin')
                                      })}
                                  >
                                      Logout
                                  </Link>
                    </div>
                </div>

        </>
    )
}

export default AdminSidebar

