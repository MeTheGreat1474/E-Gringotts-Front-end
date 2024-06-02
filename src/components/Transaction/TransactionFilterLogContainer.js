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

//component that retrieve and display the relevant data based on the filter
function TransactionFilterLogContainer({search, filterType, maxAmount, minAmount, category}) {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    //hold the list of transactions
    const [transaction, setTransaction] = useState([]);

    //call the relevant transactions based on the filter
    const recentTransactions = useGetAllTransactions(user?.userId);
    const categoryTransactions = useGetAllTransactionsCategory(user?.userId, category);
    const amountTransactions = useGetAllTransactionsAmount(user?.userId, minAmount, maxAmount);
    const nameTransactions = useGetAllTransactionsName(user?.userId, search);

    //display the transactions list the user set as
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
            case 'name':
                fetchedTransactions = nameTransactions;
                break;
            default:
                fetchedTransactions = recentTransactions;
        }
        setTransaction(fetchedTransactions);
    }

    //constantly check for updates in variables
    useEffect(() => {
        fetchTransactions();
    }, [filterType, username, recentTransactions, amountTransactions, categoryTransactions, nameTransactions]);

    return (
        <div className="filter-log">
            <div className="log-container">
                <TransactionLog data={transaction}/>
            </div>
        </div>
    )
}

export default TransactionFilterLogContainer

