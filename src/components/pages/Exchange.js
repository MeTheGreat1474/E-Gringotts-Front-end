import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useParams} from "react-router-dom";
import ExchangeContent from "../Exchange/ExchangeContent";

function Exchange() {
    const { username } = useParams();

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <ExchangeContent />
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default Exchange
