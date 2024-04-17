import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify'
import './style.css'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
const AddProduct = () => {

    // product field(variables) and their setter functions.
    const navigate=useNavigate()
    const[product_name, setProductName]=useState("")
    const[product_price, setProductPrice]=useState("")
    const[product_description, setProductDescription]=useState("")
    const[count_in_stock, setCountInStock]=useState("")
    const[product_rating, setProductRating]=useState(0)
    const[product_images, setProductImages]=useState([])
    const[category, setCategory]=useState("")

    const {token} = isAuthenticated()

    const [categories, setCategories]=useState([])

    // fetch the categorylist from the server
  
    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
                const categoryRes=await axios.get(`${API_URL}/categorylist`)
                console.log(categoryRes.data)
                setCategories(categoryRes.data.categories)
            }
            catch(error){
                console.log("error on category list api fetch: ", error)
            }
        }
        fetchCategories()
    },[])


    // define the function to add product 
    const addProduct=async(formData)=>{
        try{
            const response = await axios.post(`${API_URL}/postproduct`, formData, {
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            })

            if(response.status===201){
                setProductName("")
                setProductPrice("")
                setProductDescription("")
                setProductImages([])
                setProductRating("")
                setCategory("")
                setCountInStock("")

                toast.success("Product Added Successfully.", response.data.message)

                setTimeout(()=>{
                    navigate('/admin/products')
                }, 3000)
            }
            else{
                console.log("Error on adding product.")
                toast.error("Error on adding product")
            }

        }
        catch(error){
            console.log(error)
            toast.error("error on add product.", error.message)
        }
    }

    // handle product images
    const handleProductImages=(e)=>{
        setProductImages([...product_images, e.target.files[0]])
    }


    // handlesubmit
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const formData= new FormData()
            formData.append("product_name", product_name)
            formData.append("product_description", product_description)
            formData.append("product_price", product_price)
            formData.append("product_rating", product_rating)
            formData.append("count_in_stock", count_in_stock)
            formData.append('category', category)

            // for (let pic in product_images){
            //     formData.append("product_images", pic)
            // }

            for (let i = 0; i < product_images.length; i++) {
                formData.append("product_images", product_images[i]);
            }
            


            await addProduct(formData)
        }
        catch(error){
            console.log(error)
        }
    }
   


   
    

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
                                    multiple
                                    
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

export default AddProduct