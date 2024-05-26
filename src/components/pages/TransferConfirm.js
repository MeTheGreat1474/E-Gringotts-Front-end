import React, {useEffect} from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useLocation, useParams} from "react-router-dom";
import TransferConfirmContent from "../Transfer/TransferConfirmContent";
import {useGetUser} from "../../services/getUser";

function TransferConfirm() {
    const { username } = useParams();

    const location = useLocation();
    const { toUser } = location.state;

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <TransferConfirmContent toUser={toUser}/>
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default TransferConfirm
