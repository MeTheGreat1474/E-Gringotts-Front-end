import React, {useEffect, useState} from 'react'
import TransactionLog from "./TransactionLog";
import {useGetAllUsers} from "../../services/getAllUser";
import {useParams} from "react-router-dom";

function TransactionFilterLogContainer({search, filterType}) {
    const { username } = useParams();

    const [transaction, setTransaction] = useState([]);

    //TODO: IMPLEMENT PROPER FILTER CALL FOR TRANSACTION
    const recentTransactions = useGetAllUsers(username);
    const categoryTransactions = useGetAllUsers(username);
    const amountTransactions = useGetAllUsers(username);
    const nameTransactions = useGetAllUsers(username);

    //TODO: SHOW TRANSACTION DETAILS UPON CLICK

    // const handleClick = (path, user) => {
    //     navigate(path, { state: { toUser: user } });
    // };

    const fetchTransactions = async () => {
        let fetchedTransactions;
        switch (filterType) {
            case 'recent':
                fetchedTransactions = recentTransactions;
                break;
            case 'amount':
                fetchedTransactions = amountTransactions;
                break;
            case 'category':
                fetchedTransactions = categoryTransactions;
                break;
            case 'user':
                fetchedTransactions = nameTransactions;
                break;
            default:
                fetchedTransactions = recentTransactions;
        }
        setTransaction(fetchedTransactions);
    }

    useEffect(() => {
        fetchTransactions();
    }, [filterType, username, recentTransactions, amountTransactions, categoryTransactions, nameTransactions]);

    // Filter -> Filter's Log -> Log
    //TODO: REPAIR THE TRANSACTION LOG TO WRAP BY CATEGORY FILTER
    return (
        <div className="filter-log">
            <h3 className='filter-name'>Today</h3>
            <div className="log-container">
                <TransactionLog data={transaction}/>
            </div>
        </div>
    )
}

export default TransactionFilterLogContainer

