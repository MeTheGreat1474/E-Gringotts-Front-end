import React, {useEffect} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import Navbar from "../Navbar";
import ReceiptContent from "../Receipt/ReceiptContent";

function ReloadReceipt() {
    const location = useLocation();
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    const transactionId = location.state.transactionId;
    const header = 'RELOAD RECEIPT'

    //TODO ALL RECEIPT HAS NO TRANSFER TYPE AND TRANSFER CATEGORY

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

export default ReloadReceipt
