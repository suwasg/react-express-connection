import React from 'react'
import { isAuthenticated } from '.'
import {Outlet, Navigate} from 'react-router-dom'
const UserRoute = () =>  (

    isAuthenticated() && isAuthenticated().user.role===0 ? 
    <Outlet/>
    :
    <Navigate  to='/signin'/>

  )


export default UserRoute