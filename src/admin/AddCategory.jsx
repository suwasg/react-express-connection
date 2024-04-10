import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify'
import './style.css'
import { Helmet } from 'react-helmet'
const AddCategory = () => {
    const [category_name, setCategoryName] = useState("");
    const { token } = isAuthenticated()
    // Function to handle adding a product

    const addCategory= async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/postcategory`, formData, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });

            if (response.status === 400) {
                console.log('Failed to add category:', response.data.error);
                toast.error(response.data.error); // Display the actual error message
            
            } else {
                setCategoryName('');
             
                toast.success('Category Added successfully.');
            }
        } catch (error) {
            console.log('error part: ', error);
            toast.error(' error part:', error.error);

        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("category_name", category_name);

            // Call addProduct function to add the product
            await addCategory(formData);
        } catch (error) {
            console.log('error on submit: ', error);
        }
    };


    return (
        <>
        <Helmet>
            <title>Add Category</title>
        </Helmet>
            <ToastContainer theme='colored' position='top-center' autoClose={1000} />
            <div className="container mt-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form className="shadow p-3">
                            <h3 className="text-center text-muted ">Add Category</h3>

                            <div className="mb-2">
                                <label htmlFor="pname">Category Name</label>
                                <input type="text"
                                    name="pname"
                                    id="pname"
                                    className="form-control"
                                    onChange={e => setCategoryName(e.target.value)}
                                    value={category_name} />
                            </div>
                       
                            <div className="mb-2">
                                <button className="btn btn-warning px-4 py-2"
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

export default AddCategory