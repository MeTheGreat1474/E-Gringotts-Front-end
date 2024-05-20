import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../AccountBalance";
import TransactionHistory from "../TransactionHistory";
import {useParams} from "react-router-dom";
import AdminContent from "../AdminContent";


function Admin() {
    const { username } = useParams();

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <AdminContent />
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default Admin