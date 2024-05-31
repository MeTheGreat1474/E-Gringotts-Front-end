import React, {useEffect} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import Navbar from "../Navbar";
import TransferConfirmContent from "../Transfer/TransferConfirmContent";
import ReceiptContent from "../Receipt/ReceiptContent";

function TransactionHistoryReceipt() {
    const location = useLocation();
    const transactionId = location.state.transactionId;
    const { username } = useParams();

    const { user, getUser } = useGetUser(username);

    const header = 'TRANSACTION RECEIPT'
    console.log('TransacHistRec' , transactionId)


    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
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
    )
}

export default TransactionHistoryReceipt