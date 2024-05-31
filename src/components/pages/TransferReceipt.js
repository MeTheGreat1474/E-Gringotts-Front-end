import React from 'react'
import Navbar from "../Navbar";
import {useLocation, useParams} from "react-router-dom";
import ReceiptContent from "../Receipt/ReceiptContent";

function TransferReceipt() {
    const { username } = useParams();

    const location = useLocation();
    const { transactionId } = location.state;
    const header = 'TRANSFER RECEIPT'

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <ReceiptContent header={header} transactionId={transactionId}/>
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default TransferReceipt
