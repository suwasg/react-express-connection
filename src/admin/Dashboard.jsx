import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import {  FaCartPlus, FaFolder, FaFolderPlus, FaNewspaper, FaRegNewspaper, FaShoppingCart } from 'react-icons/fa'
import { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
const Dashboard = () => {
    const {user}= isAuthenticated()
    // const [products, setProducts]=useState([])
    const [totalProducts, setTotalProducts]=useState([])
    const [blogs, setBlogs]=useState([])
    const [category, setCategory]=useState([])

    useEffect(()=>{
        const fetchData=async ()=>{
           try{
            const totalProductsResponse = await axios.get(`${API_URL}/totalproducts`);
            // console.log(totalProductsResponse)
            setTotalProducts(totalProductsResponse.data.total_products);
         
            const totalCategoryResponse = await axios.get(`${API_URL}/totalcategories`);
            // console.log(totalCategoryResponse)
            setCategory(totalCategoryResponse.data.total_categories);

            
           }
           catch(error){
            // console.log(error)
            console.log('Error on fetching the data: ', error)
           }
        }
        fetchData()
    },[])
    return (
        <>
        <Helmet>
            <title>Admin Dashboard</title>
        </Helmet>
            <div className="container-fluid">
                <h2 className="text-center my-3 text-dark">
                    Admin Dashboard
                </h2>

                <div className="row d-flex mt-3 ">
                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="/admin/products" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-info">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-white fw-bold text-xs mb-1 text-center">
                                                <span>
                                                     Products
                                                </span>
                                            </div>
                                           
                                            <div className="col-auto text-center fs-1 text-white">
                                                <FaShoppingCart/>
                                            </div>
                                            <div className="text-dark fw-bold mb-0 text-center">
                                                {/* <span>Total Products: <b>{products && products?.length} </b></span> */}
                                                <span>Total Products: <b>{totalProducts} </b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to='/admin/category' className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-warning">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Categories
                                                </span>
                                            </div>
                                           
                                            <div className="col-auto text-center fs-1 text-white">
                                                <FaFolder/>
                                            </div>
                                            <div className="text-dark fw-bold mb-0 text-center">
                                                <span>Total categories: <b>{category}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="/admin/blogs" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-success">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Blogs
                                                </span>
                                            </div>
                                            
                                            <div className="col-auto text-center fs-1 text-white">
                                                <FaRegNewspaper/>
                                            </div>
                                            <div className="text-dark fw-bold mb-0 text-center">
                                                <span>Total Blogs: <b>55</b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="/admin/addproduct" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-danger">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Add Product
                                                </span>
                                            </div>
                                            <div className="col-auto text-center fs-1 text-warning">
                                                <FaCartPlus/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="/admin/addcategory" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-primary">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                Add Category
                                                </span>
                                            </div>
                                            <div className="col-auto text-center fs-1 text-warning">
                                                <FaFolderPlus/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 col-xl-4 mb-4">
                        <Link to="/admin/addblog" className="text-decoration-none">
                            <div className="card shadow border-0 py-2 bg-dark">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-light fw-bold text-xs mb-1 text-center">
                                                <span>
                                                    Add Blog
                                                </span>
                                            </div>
                                           
                                            <div className="col-auto text-center fs-1 text-warning">
                                                    <FaNewspaper/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Dashboard