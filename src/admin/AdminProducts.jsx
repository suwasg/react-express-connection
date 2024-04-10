import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaArrowUp, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { isAuthenticated } from "../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { API_URL, IMG_URL } from "../config";
import './style.css'
import { Helmet } from "react-helmet";
const AdminProducts = () => {
  const { token } = isAuthenticated();
  const [products, setProduct] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchQuery, setSearchQuery] = useState("");
  const limit = 5
  useEffect(() => {
    const fetchProduct = async () => {
      const encodedSearchQuery = encodeURIComponent(searchQuery); // Encode the search query
      await axios.get(`${API_URL}/productlist`)
        .then((response) => {
          if (response.status === 200) {
            // Handle successful response
            console.log(response.data.products);
            setProduct(response.data.products)
            setTotalPages(response.data.totalPages)
          } else {
            // Handle error response
            console.error('Request failed with status:', response.status);
          }
        })
        .catch((error) => {
          // Handle network or other errors
          console.error('Request failed:', error);
        });
    }
    fetchProduct()

  }, [currentPage, searchQuery]);
  console.log('this is products in admin: ', products)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1)
  };



  // delete category:
  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this product?"
    );
    if (confirmed) {
      axios
        .delete(`${API_URL}/deleteproduct/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product deleted successfully.");
          setProduct(products.filter((p) => p._id !== id));
        })
        .catch((err) => {
          toast.error("Failed to delete.");
          toast.error(err.res.data.error);
        });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      }
      else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <ToastContainer theme="colored" position="top-center" autoClose="1200" />
      <div className="container mt-2 mt-sm-5">
        <div className="row">
          <div className=" col-sm-11 col-md-4 offset-md-8">
            <div className="d-flex justify-content-end mb-3">
              <input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className=" col-12 col-sm-12 col-md-12  shadow">
            <div className="table-responsive">
              <table className="table  table-bordered table-hover custom-responsive-table ">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" >Product Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ?
                    products.map((p, i) => (
                      <tr key={i}>
                        <td>{p?.product_name}</td>
                        <td>{p?.product_price}</td>
                        <td>{p?.count_in_stock}</td>
                        <td>{p?.product_description.slice(0, 100)}</td>
                        <td>
                          {p?.product_images && p?.product_images.length > 0 && p.product_images.slice(0, 1).map((picture, index) => (
                            <img
                              key={index}
                              src={`${IMG_URL}/${picture}`}
                              // alt={p?.product_name || 'Product Image'}
                              alt="product images"
                              width={100}
                              height={150}
                            />
                          ))}


                          {/* {
                p?.product_images && 
                p?.product_images.length>0 && 
                p?.product_images.slice(0,1)
                .map((pic,index)=>(
                  <img src={`${IMG_URL}/${p?.product_images[0]}`} alt={p?.product_name}  width={100}
                  height={150} />
                ))
              } */}

                        </td>
                        <td>{p?.category?.category_name}</td>
                        <td>
                          <Link to={`/admin/updateproduct/${p._id}`} className="btn btn-success">
                            <FaEdit />
                          </Link>
                          <br />
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteProduct(p._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7}>
                          <b> No products found</b>
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
            <div className="text-end m-1">
              <button className="btn btn-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                <FaChevronLeft />prev
              </button>
              <span className="p-2">{currentPage} of {totalPages}</span>
              <button className="btn btn-success " onClick={handleNextPage} disabled={currentPage === totalPages}>
                next<FaChevronRight />
              </button>
            </div>

          </div>
        </div>



      </div>
      <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
        <button onClick={scrollToTop} className="btn btn-warning rounded-100" style={{ zIndex: 500 }}><FaArrowUp /></button>
      </div>
    </>
  );
};

export default AdminProducts;
