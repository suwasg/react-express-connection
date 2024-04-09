import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify'
import './style.css'
import { Helmet } from 'react-helmet'
const AddProduct = () => {
    

    return (
        <>
        <Helmet>
            <title>Add Product</title>
        </Helmet>
            <ToastContainer theme='colored' position='top-center' autoClose={1000} />
            <div className="container mt-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form className="shadow p-3">
                            <h3 className="text-center text-muted ">Add Product</h3>

                            <div className="mb-2">
                                <label htmlFor="pname">Product Name</label>
                                <input type="text"
                                    name="pname"
                                    id="pname"
                                    className="form-control"
                                    onChange={e => setProductName(e.target.value)}
                                    value={product_name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price">Product Price</label>
                                <input type="number"
                                    name="price"
                                    id="price"
                                    min={0}
                                    className="form-control"
                                    onChange={e => setProductPrice(e.target.value)}
                                    value={product_price} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price">Product Rating</label>
                                <input type="number"
                                    name="price"
                                    id="price"
                                    min={0}
                                    max={5}
                                    className="form-control"
                                    onChange={e => setProductRating(e.target.value)}
                                    value={product_rating} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="qty"> Quantity</label>
                                <input type="number"
                                    name="qty"
                                    id="qty"
                                    min={1}
                                    className="form-control"
                                    onChange={e => setCountInStock(e.target.value)}
                                    value={count_in_stock} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor='desc' >Product Description</label>
                                <textarea name="desc" id="desc" cols="30" rows="10" className='form-control' onChange={e => setProductDescription(e.target.value)} value={product_description}>

                                </textarea>
                            </div>
                            <div className="mb-2">
                                { product_images && product_images.length > 0
                                    ? product_images.map((pic, index) => (
                                        <div key={index}>{JSON.stringify(pic.name)}</div>
                                    ))
                                    : null}
                                <input
                                    type="file"
                                    name="product_images"
                                    id="product_images"
                                    className="form-control"
                                    onChange={handleProductImages}
                                />
                            </div>
                            <div className="mb-2">
                                <select
                                    name="category"
                                    id="category"
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories && categories.map((c,i)=>(
                                            <option value={c._id} key={i}>
                                                {c?.category_name}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="mb-2">
                                <button className="btn btn-primary px-4 py-2"
                                    onClick={handleSubmit}>
                                    Add
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddProduct