import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaArrowUp } from "react-icons/fa";
import { isAuthenticated } from "../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import './style.css'
import { Helmet } from "react-helmet";
const AdminCategories = () => {
  const { token } = isAuthenticated();
  const [categories, setCategory] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  
  useEffect(() => {
    const fetchCategory = async () => {
      await axios.get(`${API_URL}/categorylist`)
        .then((response) => {
          if (response.status === 200) {
            // Handle successful response
            console.log(response.data.categories);
            setCategory(response.data.categories)
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
    fetchCategory()

  }, []);
  console.log('this is categories in admin: ', categories)



  // delete category:
  const deleteCategory = (id) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this category?"
    );
    if (confirmed) {
      axios
        .delete(`${API_URL}/deletecategory/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Category deleted successfully.");
          setCategory(categories.filter((c) => c._id !== id));
        })
        .catch((err) => {
          toast.error("Failed to delete category.");
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


  return (
    <>
      <Helmet>
        <title>Categorys</title>
      </Helmet>
      <ToastContainer theme="colored" position="top-center" autoClose="1200" />
      <div className="container mt-2 mt-sm-5">
   

        <div className="row d-flex justify-content-center">
          <div className=" col-12 col-sm-12 col-md-12  shadow">
            <div className="table-responsive">
              <table className="table  table-bordered table-hover custom-responsive-table ">
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                   
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length > 0 ?
                    categories.map((c, i) => (
                      <tr key={i}>
                        <td>{c?.category_name}</td>
                
                        <td>
                          <Link to={`/admin/updatecategory/${c?._id}`} className="btn btn-success">
                            <FaEdit />
                          </Link>
                          <br />
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteCategory(c?._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7}>
                         <b> No categories found</b>
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
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

export default AdminCategories;
