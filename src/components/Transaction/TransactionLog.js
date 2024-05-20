import React from 'react'

function TransactionLog({data}) {
    return (
        <div className="log-container">
            {data.map((item, index) => (
                <div className="log" key={index}>
                    <div className="details">
                        <h4 className='username'>{item.username}</h4>
                        <p className='category'>{item.category}</p>
                    </div>
                    <p className='amount'>{item.amount}</p>
                </div>
            ))}
        </div>
    )
}

export default TransactionLog
