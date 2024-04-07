import React,{useState} from 'react'
import { signup } from '.'

const Signup = () => {
    // initial values field
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        phone:'',
        error:'',
        success:false
    })

    // const {name, setName}=useState()
      
    const{name,email,password,phone,error,success}=values 
    // name: values.name

    const handleChange=name=>
    event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit=event=>{
        event.preventDefault()
        setValues({...values,error:false})
        //signup function
        signup({name,email,password,phone})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,name:'',email:'',password:'',phone:'',success:true})
            }
        })
        
    }

    // to show error msg
    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    //to show success msg
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
       New account created, verify your account before login.
    </div>
    )
    

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-md-7 mt-4 mb-3 p-3 shadow-lg">
                        <form>
                            {showError()}
                            {showSuccess()}
                            <div className="col-12 mb-3">
                                <label htmlFor="firstname">Name</label>
                                <input type="text" name="fname" id="firstname" placeholder="Name" className="form-control"
                                onChange={handleChange('name')} 
                                // onChange={(e)=>setName(e.target.value)}
                                value={name}
                                />
                            </div>
                            
                            <div className="col-12 mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="example@gmail.com" className="form-control"
                                onChange={handleChange('email')} value={email}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="pass" id="password" placeholder="***********" className="form-control"
                                onChange={handleChange('password')} value={password}
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="firstname">Phone</label>
                                <input type="text" name="phone" id="phone" placeholder="Phone" className="form-control"
                                onChange={handleChange('phone')} value={phone}
                                />
                            </div>
                            
                            <div className="col-6">
                                <button className="btn btn-warning form-control"
                                onClick={handleSubmit}
                                >Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Signup