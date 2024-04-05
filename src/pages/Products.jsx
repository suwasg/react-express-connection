import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { ColorRing } from 'react-loader-spinner'
import { API_URL } from '../config'

const Products = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchProduct=async()=>{
      try{
        const response=await axios.get(`${API_URL}/productlist`)
        setProducts(response.data.products)
        setLoading(false)
       
      }
      catch (err){
            console.log(err)
      }
    }
    // simulate 2 seconds delay before fetching product
    const delay=setTimeout(()=>{
        fetchProduct()
        clearTimeout(delay)
    },2000)
  },[])


  return (
    <>

    <Helmet>
      <title>products</title>
    </Helmet>

    {
      loading? (
        <div className="d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
            <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
        </div>
      )
      :
      (

<div class="container my-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          
       {
        products && products.slice(0,limit).map((pr,ind)=>(
          <Card data={pr} key={ind} />
        ))
       }

      <div className="mx-auto">
        <div className="col-6">
          {
            limit<products.length && 
            <button className='btn btn-warning px-4 py-2' onClick={ ()=> setLimit(limit+3)  } >Load More</button>
          }
        </div>
      </div>


          </div>
          </div>
      )}
    </>
  )
}

export default Products