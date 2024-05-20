import React, {useEffect} from 'react'
import {Button} from "../Button";
import './ReceiptContent.css'
import {useNavigate} from "react-router-dom";
import {useGetUser} from "../../services/getUser";

function ReceiptContent() {
    const navigate = useNavigate();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className='reload-receipt-content'>
            <h1 className='reload-receipt-title'>RELOAD SUCCESSFUL</h1>
            <div className="reload-receipt-reference">
                <div className="reload-receipt-id">
                    <h2 className='label'>Reference ID</h2>
                    <h2 className='reload-receipt-id-content'>0123456789012345</h2>
                </div>
                <div className="reload-receipt-time">
                    <h2 className='label'>Date & Time</h2>
                    <h2 className='reload-receipt-time-content'>14/7/2020</h2>
                </div>
            </div>
            <div className="reload-receipt-confirm-button">
                <Button onClick={navigate(`/${username}`)}>DONE</Button>
            </div>
        </div>
    )
}

export default ReceiptContent
