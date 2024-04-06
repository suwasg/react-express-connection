import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../config'

const Confirm = () => {
    const params=useParams()
    const [values,setValues] = useState({
        error:'',
        success:false
    })
    const{error,success} = values

    useEffect(()=>{
        const token=params.token.trim()
        fetch(`${API_URL}/confirmation/${token}`,{
            method:"PUT",
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,error:'',success:true})
            }
        })
        .catch(err=>console.log(err))
    },[params.token])

     // to show error msg
     const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    //to show success msg
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
      Your account has been verified,<Link to='/signin' class='text-decoration-none'>login to continue
       </Link>
    </div>
    )
    return (
        <>
        {showSuccess()}
        {showError()}
            
        </>
    )
}

export default Confirm