import React, {useEffect} from 'react';
import {Button} from "../Button";
import {useGetTransactionReceipt} from "../../services/getTransactionReceipt";
import {useNavigate, useParams} from "react-router-dom";
import './ReceiptContent.css'

//multipurpose component for displaying for transaction history, reload, transfer and exchange
function ReceiptContent({header, transactionId }) {
    //call the getTransactionReceipt function
    const { transactionReceipt, getTransactionReceipt } = useGetTransactionReceipt(transactionId);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTransactionReceipt();
    }, [getTransactionReceipt]);

    let receiptObject = {};

    //parse the receipt string for displaying
    if (transactionReceipt) {
        const receiptLines = transactionReceipt.split('\n');
        receiptObject = receiptLines.reduce((obj, line) => {
            const [key, value] = line.split(':');
            if (key && value) {
                obj[key.trim()] = value.trim();
            }
            return obj;
        }, {});
    }

    return (
        <div className='reload-receipt-content'>
            {/*display receipt content*/}
            <h1 className='reload-receipt-title'>{header}</h1>
            <div className="reload-receipt-reference">
                <div className="reload-receipt-id">
                    <h2 className='label'>Transaction ID</h2>
                    <h2 className='reload-receipt-id-content'>{receiptObject['Transaction ID']}</h2>
                </div>
                <div className="reload-receipt-time">
                    <h2 className='label'>Date</h2>
                    <h2 className='reload-receipt-time-content'>{receiptObject['Date']}</h2>
                </div>
                <div className="reload-receipt-id">
                    <h2 className='label'>Sender</h2>
                    <h2 className='reload-receipt-time-content'>{receiptObject['Sender']}</h2>
                </div>
                <div className="reload-receipt-id">
                    <h2 className='label'>Recipient</h2>
                    <h2 className='reload-receipt-time-content'>{receiptObject['Recipient']}</h2>
                </div>
                <div className="reload-receipt-id">
                    <h2 className='label'>Amount</h2>
                    <h2 className='reload-receipt-time-content'>{receiptObject['Amount']}</h2>
                </div>

                {/*only show when not null*/}
                {receiptObject['Converted Amount'] && receiptObject['Converted Amount'] !== '0.0' &&
                    <div className="reload-receipt-id">
                        <h2 className='label'>Converted Amount</h2>
                        <h2 className='reload-receipt-time-content'>{receiptObject['Converted Amount']}</h2>
                    </div>
                }
                {receiptObject['Processing Fee'] && receiptObject['Processing Fee'] !== '0.0' &&
                    <div className="reload-receipt-id">
                        <h2 className='label'>Processing Fee</h2>
                        <h2 className='reload-receipt-time-content'>{receiptObject['Processing Fee']}</h2>
                    </div>
                }
            </div>
            {/*return to home*/}
            <div className="reload-receipt-confirm-button">
                <Button onClick={() => navigate(`/${username}`)}>DONE</Button>
            </div>
        </div>
    )
}

export default ReceiptContent
