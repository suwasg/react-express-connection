import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>

<div className="container-fluid bg-warning">

<footer className="py-5 px-4">
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-dark  text-decoration-none">Home</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Products</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Pricing</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">FAQs</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">About</Link></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Home</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Features</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Pricing</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">FAQs</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">About</Link></li>
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Home</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Features</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">Pricing</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">FAQs</Link></li>
          <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-dark text-decoration-none">About</Link></li>
        </ul>
      </div>

      <div className="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
            <button className="btn btn-dark" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>&copy; 2024 <Link to="https://github.com/suwasg" className='text-dark text-decoration-none'>SuwasGhale</Link>&#10084;, Inc. All rights reserved.</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3"><Link className="text-dark text-decoration-none fs-3" to="https://www.facebook.com"><FaFacebook/></Link></li>
        <li className="ms-3"><Link className="text-dark text-decoration-none fs-3" to="https://www.x.com/"><FaTwitter/></Link></li>
        <li className="ms-3"><Link className="text-dark text-decoration-none fs-3" to="https://www.instagram.com/"><FaInstagram/></Link></li>
        <li className="ms-3"><Link className="text-dark text-decoration-none fs-3" to="https://www.whatsapp.com/"><FaWhatsapp/></Link></li>
      </ul>
    </div>
  </footer>

</div>

    </>
  )
}

export default Footer