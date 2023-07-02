import React from "react";
import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState } from 'react'

import Products from "../Layouts/Seller/Products/Products";
import Orders from "../Layouts/Seller/Orders/Orders";
import Ordered from "../Layouts/Seller/Orders/Ordered/Ordered";
import Transport from "../Layouts/Seller/Orders/Transport/Transport";
import Received from "../Layouts/Seller/Orders/Received/Received";
import Statistics from "../Layouts/Seller/Statistics/Statistics";
import Setting from "../Layouts/Seller/Setting/Setting";
import { logout } from "../APIs/auth.api";
import { useNavigate } from "react-router-dom";

function Sidebar_Seller() {
const [item, setItem] = useState('products');
const navigate = useNavigate();
  const handleLogout = () => {
    // alert("a");
    logout(navigate);
  };
  return (
    <div class="container-fluid">
    <div class="row">
        <div class="col-2 collapse show d-md-flex bg-light pt-2 pl-0 min-vh-100 border-right" id="sidebar">
            <ul class="nav flex-column flex-nowrap overflow-hidden mt-4" style={{ marginLeft : "15%" }}>
                <li class="nav-item"><a class="nav-link text-truncate" style={{ cursor : "pointer"}}><i class="fa fa-list-alt" style={{ marginRight : "15px" }}></i> <span class="d-none d-sm-inline" onClick={() => setItem('products')}>Products</span></a></li>
                <li class="nav-item">
                    <a class="nav-link text-truncate" href="#submenu1sub1" data-toggle="collapse" data-target="#submenu1sub1"><i class="fa fa-shopping-cart" style={{ marginRight : "15px" }}></i> <span class="d-none d-sm-inline" onClick={() => setItem('orders')}>Orders</span></a>
                    <div class="collapse" id="submenu1sub1" aria-expanded="false">
                        <ul class="flex-column nav pl-4">
                            <li class="nav-item">
                                <a class="nav-link p-1 text-truncate" style={{ cursor : "pointer"}} onClick={() => setItem('ordered')}>
                                    <i class="fa fa-shopping-cart" style={{ marginRight : "15px" }}></i> Ordered </a>
                            </li>
                        </ul>
                    </div>
                    <div class="collapse" id="submenu1sub1" aria-expanded="false">
                        <ul class="flex-column nav pl-4">
                            <li class="nav-item">
                                <a class="nav-link p-1 text-truncate" style={{ cursor : "pointer"}} onClick={() => setItem('transport')}>
                                    <i class="fa fa-shopping-cart" style={{ marginRight : "15px" }}></i> Transport </a>
                            </li>
                        </ul>
                    </div>
                    <div class="collapse" id="submenu1sub1" aria-expanded="false">
                        <ul class="flex-column nav pl-4">
                            <li class="nav-item">
                                <a class="nav-link p-1 text-truncate" style={{ cursor : "pointer"}} onClick={() => setItem('received')}>
                                    <i class="fa fa-shopping-cart" style={{ marginRight : "15px" }}></i> Received </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item"><a class="nav-link text-truncate" style={{ cursor : "pointer"}}><i class='fa fa-line-chart' style={{ marginRight : "15px" }}></i> <span class="d-none d-sm-inline" onClick={() => setItem('statistics')}>Statistics</span></a></li>
                <li class="nav-item"><a class="nav-link text-truncate" style={{ cursor : "pointer"}}><i class="fa fa-sign-out" style={{ marginRight : "15px" }}></i> <span class="d-none d-sm-inline" 
                    onClick={() => {
                    handleLogout();
                    }} >
                  Logout</span></a></li>
            </ul>
        </div>
        <div class="col pt-2 bg-light">
            {item === 'products' && (
                <Products/>
            )}
            {item === 'orders' && (
                <Orders/>
            )}
            {item === 'ordered' && (
                <Ordered/>
            )}
            {item === 'transport' && (
                <Transport/>
            )}
            {item === 'received' && (
                <Received/>
            )}
            {item === 'statistics' && (
                <Statistics/>
            )}
             {item === 'setting' && (
                <Setting/>
            )}
        </div>
    </div>
</div>
  );
}

export default Sidebar_Seller;
