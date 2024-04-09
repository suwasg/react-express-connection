import React, { useState } from 'react'
import { Link, useNavigate, useLocation,Navigate } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '.'


const Signin = () => {
    const navigate = useNavigate()
    // const pathname  = useLocation()
    const{user}=isAuthenticated()

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectTo: false,
        message:'',
        success:false
    })

    const { email, password, error, redirectTo } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setValues({...values})
        // call the signin function:
        signin({email,password})
        .then(data=>{
          if(data.success==false){
            setValues({...values,error:data.message})
          }
          else{
            authenticate(data,()=>{
              setValues({...values,redirectTo:true, success:true})
            })
          }
        })
      }

    // to show error msg
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

          // Redirect by user role:
  const redirectUser = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectParam = searchParams.get('redirect');
    const { user } = isAuthenticated();

    if (redirectTo) {
      if (user && user.role === 1) {
        return '/admin/dashboard'; // Return the path string for admin dashboard
        } 
        // else if (redirectParam === 'shipping') {
        //   return '/shipping';
      // } 
      else {
        return '/';
      }
    }
    return null; // Return null if no redirection is needed
  };
    return (
        <>
            <div className="container" style={{ marginBottom: '200px' }}>
                <div className="d-flex justify-content-center">
                    <div className=" col-10 col-md-6 mt-4 mb-3 p-3 shadow-lg">
                        <form>
                            {showError()}
                            {redirectTo && <>{window.location.href = redirectUser()}</>}

                            <div className="col-12 mb-3">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="example@gmail.com" className="form-control" onChange={handleChange('email')} value={email} />
                            </div>
                            <div className="col-12 mb-3">
                                <label for="password">Password</label>
                                <input type="password" name="pass" id="password" placeholder="***********" className="form-control" onChange={handleChange('password')} value={password} />
                            </div>

                            <div className="col-4 mb-3">
                                <button className="btn btn-warning form-control" onClick={handleSubmit}>Signin</button>
                            </div>
                            <div className="col-4 offset-md-8">
                                <Link to="/forgetpassword" className="text-decoration-none text-secondary">Forget Password?</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Signin