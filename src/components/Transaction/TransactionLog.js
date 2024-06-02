import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, getUserByUserId} from "../../services/getUserById";

//component for displaying list of transactions in user-friendly format
function TransactionLog({ data }) {
    const { username } = useParams();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    const handleClick = (transactionId) => {
        navigate(`/${username}/transaction/receipt`, { state: { transactionId: transactionId } });
    }

    //for every transaction in list of transactions, get the receiver's info
    //and map it into the list
    useEffect(() => {
        const fetchUserData = async () => {
            const transactionsWithUserData = await Promise.all(data.map(async (transaction) => {
                const user = await getUserByUserId(transaction.receiverID);
                if (user) {
                    return {
                        //return the transaction data + receiver's username + receiver's phone
                        ...transaction,
                        receiverUsername: user.username,
                        receiverPhone: user.phone
                    };

                } else {
                    return transaction;
                }
            }));
            //update the transaction's list
            setTransactions(transactionsWithUserData);
        };

        fetchUserData();
    }, [data]);

    return (
        <>
            {transactions.map((item, index) => (
                <div className="log-box">
                    {/*navigate to display transaction history receipt on click*/}
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