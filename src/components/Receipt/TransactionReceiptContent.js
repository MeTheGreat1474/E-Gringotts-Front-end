import React, {useEffect} from 'react'
import {Button} from "../Button";
import './ReceiptContent.css'
import {useNavigate} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import {useGetSingleTransacHistory} from "../../services/getSingleTransaction";

function TransactionReceiptContent({username, amount}) {
    const navigate = useNavigate();
    const { user, getUser } = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);

    const { transaction, getTransaction } = useGetSingleTransacHistory(username);
    useEffect(() => {
        getTransaction();
    }, [getTransaction]);

    const { toUser, getToUser } = useGetUser(userId);
    useEffect(() => {
        getToUser();
    }, [getToUser]);

    return (
        <div className='reload-receipt-content'>
            <h1 className='reload-receipt-title'>TRANSACTION RECEIPT</h1>
            <div className="reload-receipt-reference">
                <div className="reload-receipt-id">
                    <h2 className='label'>Transaction ID</h2>
                    <h2 className='reload-receipt-id-content'>{transaction?.id}</h2>
                </div>
                <div className="reload-receipt-time">
                    <h2 className='label'>Date</h2>
                    <h2 className='reload-receipt-time-content'>{transaction?.date}</h2>
                </div>
                <div className="reload-receipt-id">
                    <h2 className='label'>Sender</h2>
                    <h2 className='reload-receipt-time-content'>{transaction?.sende}</h2>
                </div>
                <div className="reload-receipt-id">
                    <h2 className='label'>Amount</h2>
                    <h2 className='reload-receipt-time-content'>{transaction?.amount}</h2>
                </div>
            </div>
            <div className="reload-receipt-confirm-button">
                <Button onClick={() => navigate(`/${username}`)}>DONE</Button></div>
        </div>
    )
}

export default TransactionReceiptContent