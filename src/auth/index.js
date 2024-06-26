import { API_URL } from "../config"

//for signup
export const signup=(user)=>{
    return fetch(`${API_URL}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//signin
export const signin=(user)=>{
    return fetch(`${API_URL}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}
//authenticate
export const authenticate=(data,next)=>{
    if(typeof window !=='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

// export const isAuthenticated=()=>{
//     if(typeof window === undefined){
//         return false
//     }
//     if(localStorage.getItem('jwt')){
//         return JSON.parse(localStorage.getItem('jwt'))
//     }
//     else{
//         return false
//     }
// }

export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    const jwt = localStorage.getItem('jwt');
    console.log('JWT:', jwt); // Add this line
    if (jwt) {
        return JSON.parse(jwt);
    } else {
        return false;
    }
};



export const signout=next=>{
    if(typeof window!== 'undefined'){
        localStorage.removeItem('jwt')  
        next()
        return fetch(`${API_URL}/signout`,{
            method:'POST'
        })
        .then(res=>{
            console.log('signout',res)
        })
        .catch(err=>console.log(err))
    }
}

//forget password
export const forgetpassword=(user)=>{
    return fetch(`${API_URL}/forgetpassword`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}