import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import { isAuthenticated } from '../auth'
import { ToastContainer, toast } from 'react-toastify'
import './style.css'
import { Helmet } from 'react-helmet'
const UpdateProduct = () => {
    // const navigate=useNavigate()
    // const history=useHistory()
    const [product_name, setProductName] = useState("");
    const [count_in_stock, setCountInStock] = useState("");
    const [product_price, setProductPrice] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_images, setProductImages] = useState([]);
    const [product_rating, setProductRating]=useState('')
    const [categoryId, setCategoryId] =useState('')

    const { token } = isAuthenticated()

    const [categories, setCategories] = useState([]);

    const params=useParams()
    const id=params.productId
    const[initialValues, setInitialValues] = useState({})


  
    // Fetch products and categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get(
                    `${API_URL}/categorylist`
                );
                setCategories(categoryResponse.data.categories);
             
            } catch (error) {
                console.log("Error fetching category:", error);
            }
        };

        fetchCategories();

        const fetchProductDetails=async()=>{
            try{
                const productRes=await axios.get(`${API_URL}/productdetails/${id}`)
                .then(res=>{
                    // console.log('res.data on details: ',res.data.product.category.category_name)
                    setInitialValues(res.data.product)
                    setProductName(res.data.product.product_name)
                    setCountInStock(res.data.product.count_in_stock)
                    setProductPrice(res.data.product.product_price)
                    setProductRating(res.data.product.product_rating)
                    setProductDescription(res.data.product.product_description)
                    setProductImages(res.data.product.product_images)
                    // console.log('product_images',product_images)
                    setCategoryId(res.data.product?.category?._id)
                })
            }
            catch(error){
                console.log(error)
            }
        }
        fetchProductDetails()
    }, [id]);

    console.log('product_images: ', product_images)

    // Function to handle adding a product

    const updateProduct = async (formData) => {
        try {
            const response = await axios.put(`${API_URL}/updateproduct/${id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer ${token}`, // Include the token in the headers
                },
            });

            if (response.status === 200) {
                setProductName('');
                setCountInStock('');
                setProductPrice('');
                setProductDescription('');
                setCategoryId('');
                setProductImages(null);
                setProductRating('')
                
                
                toast.success('Product updated successfully.');
                // setTimeout(()=>{
                //     // navigate(to='/admin/products')
                //     history.push('/admin/products')
                // }, 5000)
                
            } else {
                console.log('Failed to update product:', response.data.message);
                toast.error(response.data.message); // Display the actual error message
            }
        } catch (error) {
            console.log('error part: ', error);
            toast.error(' error part:', error.message);

        }
    };

    const handleProductImages = (e) => {
        setProductImages([...product_images, e.target.files[0]]);
    };


    const handleProductImages2 = (e) => {
        if (e.target.files.length > 0) {
            setProductImages(e.target.files[0]);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("product_name", product_name);
            formData.append("count_in_stock", count_in_stock);
            formData.append("product_price", product_price);
            formData.append("product_description", product_description);
            formData.append("product_rating", product_rating);
            // formData.append("category", category);
            // Check if category is empty, if so, use the previous category value
        const selectedCategory = categoryId || initialValues?.category?._id;
        formData.append("category", selectedCategory);
        console.log('selected category: ', selectedCategory)
            // Check if product_images is empty
        if (product_images.length === 0) {
            // If it's empty, append previous image URLs from initialValues
            console.log('initial values: ', initialValues.product_images);
            initialValues.product_images.forEach((imageUrl) => {
                // Assuming imageUrl is a string representing the URL or path of the image
                formData.append("product_images", imageUrl);
            });
        } else {
            // If it's not empty, append the new images
            for (let pic of product_images) {
                formData.append("product_images", pic);
            }
        }
    
            // Call updateProduct function to update the product
            await updateProduct(formData);
        } catch (error) {
            console.log('Error on submit: ', error);
        }
    };
    
    


    return (
        <>
        <Helmet>
            <title>Update Product</title>
        </Helmet>
            <ToastContainer theme='colored' position='top-center' autoClose={1000} />
            <div className="container mt-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form className="shadow p-3">
                            <h3 className="text-center text-muted ">Update Product</h3>

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
                                {/* { product_images && product_images.length > 0
                                    ? product_images.map((pic, index) => (
                                        <div key={index}>{JSON.stringify(pic.name)}</div>
                                    ))
                                    : null} */}
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
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories && categories.map((c,i)=>(
                                            <option value={c?._id} key={i}>
                                                {c?.category_name}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="mb-2">
                                <button className="btn btn-warning px-4 py-2"
                                    onClick={handleSubmit}>
                                    Update
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateProduct