import React, {useState} from 'react'
import Navbar from "../Navbar";
import {Button} from "../Button";
import {Input} from "../Input";
import AccountBalance from "../AccountBalance";
import TransactionHistory from "../TransactionHistory";

function Dashboard() {

    return (
        <>
            <div className="dashboard">
                    <div className="left">
                        <Navbar />
                    </div>
                    <div className="middle">
                        <AccountBalance/>
                        <TransactionHistory/>
                    </div>
                    <div className="right">

                    </div>
            </div>
        </>
    )
}

export default Dashboard
