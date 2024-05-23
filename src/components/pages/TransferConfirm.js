import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useParams} from "react-router-dom";
import TransferConfirmContent from "../Transfer/TransferConfirmContent";

function TransferConfirm() {
    const { username } = useParams();

    //TODO: TAKE USER INFO BASED ON USER DATA

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <TransferConfirmContent/>
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default TransferConfirm
