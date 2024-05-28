import React, {useEffect} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import ReloadReceiptContent from "../Receipt/ReloadReceiptContent";
import Navbar from "../Navbar";
import TransferConfirmContent from "../Transfer/TransferConfirmContent";
import TransactionReceiptContent from "../Receipt/TransactionReceiptContent";

function ReloadReceipt() {
    const location = useLocation();
    const amount = location.state.amount;
    const username = location.state.username;
    console.log(amount)

    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <TransactionReceiptContent username={username} amount={amount}/>
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default ReloadReceipt