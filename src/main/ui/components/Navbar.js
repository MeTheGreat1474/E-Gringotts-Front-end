import React, {useEffect, useState} from 'react';
import './Navbar.css'
import {Link, useLocation} from "react-router-dom";

function Navbar(props) {
    const location = useLocation();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <div className='navbar'>
                <div className="logo-box">
                    <div className="logo">
                        <img className='gringgots-logo-png' src='/images/logo.png'/>
                    </div>
                    <div className="text">
                        <h2>E-Gringgots</h2>
                    </div>
                </div>
                <div className="content-box">
                        <div className={location.pathname === '/dashboard' ? "content-alt" : "content"}>
                            <Link to='/dashboard'>
                                <h2>Home</h2>
                            </Link>
                        </div>
                        <div className={location.pathname === '/transfer' ? "content-alt" : "content"}>
                            <Link to='/transfer'>
                                <h2>Transfer</h2>
                            </Link>
                        </div>
                        <div className={location.pathname === '/account' ? "content-alt" : "content"}>
                            <Link to='/account'>
                                <h2>Account</h2>
                            </Link>
                        </div>
                        <div className={location.pathname === '/' ? "content-alt" : "content"}>
                            <Link to='/dashboard'>
                                <h2>Etc</h2>
                            </Link>
                        </div>
                </div>
            </div>
        </>
);
}

export default Navbar;