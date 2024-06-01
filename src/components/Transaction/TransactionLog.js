import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, getUserByUserId} from "../../services/getUserById";

function TransactionLog({ data }) {
    const { username } = useParams();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    const handleClick = (transactionId) => {
        navigate(`/${username}/transaction/receipt`, { state: { transactionId: transactionId } });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const transactionsWithUserData = await Promise.all(data.map(async (transaction) => {
                const user = await getUserByUserId(transaction.receiverID);
                if (user) {
                    return {
                        ...transaction,
                        receiverUsername: user.username,
                        receiverPhone: user.phone
                    };

                } else {
                    return transaction;
                }
            }));
            setTransactions(transactionsWithUserData);
        };

        fetchUserData();
    }, [data]);

    return (
        <>
            {transactions.map((item, index) => (
                <div className="log-box">
                    <div className="log" key={index} onClick={() => handleClick(item.transactionID)}>
                        <div className="details">
                            <h4 className='username'>{item.receiverUsername}</h4>
                            <p className='phone'>{item.receiverPhone}</p>
                        </div>
                        <p className='amount'>{item.amount}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default TransactionLog