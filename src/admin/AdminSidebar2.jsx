import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';

const AdminSidebar2 = () => {
    const navigate = useNavigate();
    const { user } = isAuthenticated();
    const [offcanvasVisible, setOffcanvasVisible] = useState(false); // State to control the offcanvas visibility
    const backdropRef = useRef(null);
    const { token } = isAuthenticated();

    // Function to toggle the offcanvas visibility
    const toggleOffcanvas = () => {
        setOffcanvasVisible(!offcanvasVisible);
    };

    // Function to close the offcanvas
    const closeOffcanvas = () => {
        setOffcanvasVisible(false);
    };

    // Event handler to close the offcanvas when clicking on the backdrop
    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            closeOffcanvas();
        }
    };

    // Event handler to close the offcanvas when clicking on a menu item and navigate
    const handleMenuItemClick = (path) => {
        closeOffcanvas();
        navigate(path); // Navigate to the specified path
    };

    const handleCloseButtonClick = () => {
        closeOffcanvas(); // Manually close the offcanvas
    };

    return (
        <>
            <div className="container mb-5">
                <nav className="navbar navbar-dark bg-dark fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/admin/dashboard">
                        <h1 className='text-warning fw-bold  '>BrandG.</h1>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            onClick={toggleOffcanvas} // Toggle the offcanvas visibility
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`offcanvas offcanvas-end text-bg-dark ${offcanvasVisible ? 'show' : ''}`} // Add 'show' class to make it visible
                            tabIndex="-1"
                            id="offcanvasDarkNavbar"
                            aria-labelledby="offcanvasDarkNavbarLabel"
                            onClick={handleBackdropClick} // Close the offcanvas when clicking the backdrop
                        >
                            <div className="offcanvas-header">
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    onClick={handleCloseButtonClick}
                                ></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li>
                                        <Link
                                            to="/admin/dashboard"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/dashboard')}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/products"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/products')}
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/category"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/category')}
                                        >
                                            Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/blogs"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/blogs')}
                                        >
                                            Blogs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/addproduct"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/addproduct')}
                                        >
                                            Add Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/addcategory"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/addcategory')}
                                        >
                                            Add Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/addblog"
                                            className="text-decoration-none text-white"
                                            onClick={() => handleMenuItemClick('/admin/addblog')}
                                        >
                                            Add Blog
                                        </Link>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Rest of your component */}
        </>
    );
};

export default AdminSidebar2;





