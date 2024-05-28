import React from 'react'
import {useNavigate} from "react-router-dom";

function TransactionLog({data}) {
    const navigate = useNavigate();
    const handleClick = (transactionId) => {
        navigate(`/:username/transaction/receipt`, { state: { transactionId: transactionId } });
    }

    return (
        <div className="log-container">
            {data.map((item, index) => (
                <div className="log" key={index} onClick={() => handleClick(item.id)}>
                    <div className="details">
                        <h4 className='username'>{item.username}</h4>
                        <p className='category'>{item.phone}</p>
                    </div>
                    <p className='amount'>{item.amount}</p>
                </div>
            ))}
        </div>
    )
}

export default TransactionLog
