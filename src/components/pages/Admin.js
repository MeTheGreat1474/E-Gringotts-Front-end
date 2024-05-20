import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useParams} from "react-router-dom";
import AdminContent from "../Admin/AdminContent";


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