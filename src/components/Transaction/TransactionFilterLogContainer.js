import React, {useEffect, useState} from 'react'
import TransactionLog from "./TransactionLog";
import {useGetAllUsers} from "../../services/getAllUser";
import {useParams} from "react-router-dom";
import {useGetTransacHistory} from "../../services/getUserTransacHistory";
import {useGetUser} from "../../services/getUser";
import {
    useGetAllTransactions,
    useGetAllTransactionsAmount,
    useGetAllTransactionsCategory, useGetAllTransactionsName
} from "../../services/getAllTransaction";

function TransactionFilterLogContainer({search, filterType, maxAmount, minAmount, category}) {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [transaction, setTransaction] = useState([]);

    //TODO OPTIONAL: RETURN LIST OF USERS TRANSACTION AS SENDER AND RECEIVER ALSO
    const recentTransactions = useGetAllTransactions(user?.userId);
    const categoryTransactions = useGetAllTransactionsCategory(user?.userId, category);
    const amountTransactions = useGetAllTransactionsAmount(user?.userId, minAmount, maxAmount);
    const nameTransactions = useGetAllTransactionsName(user?.userId, search);

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
    return (
        <div className="filter-log">
            <div className="log-container">
                <TransactionLog data={transaction}/>
            </div>
        </div>
    )
}

export default TransactionFilterLogContainer

