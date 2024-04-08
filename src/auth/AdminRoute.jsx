import React from 'react'
import { isAuthenticated } from '.'
import AdminSidebar from '../admin/AdminSidebar'
import AdminSidebar2 from '../admin/AdminSidebar2'
import {Outlet, Navigate} from 'react-router-dom'
import './sidebar.css'
const AdminRoute = () =>(

    isAuthenticated() && isAuthenticated().user.role===1 ?

    <>

    <div className="container-fluid">
        <div className="row d-flex">
            <div id="sidebar" className="col-md-2 position-sitcky bg-dark  d-none d-md-block">
                    <AdminSidebar/>
            </div>

            <div className="col-md-2 d-block d-md-none ">
    <AdminSidebar2/>
            </div>

            <div className="col-md-10">
                <Outlet/>
            </div>

        </div>
    </div>
    

    
    </>

    :

    (
        <Navigate to='/signin'/>
    )

)

export default AdminRoute