import React from 'react'
import TransactionLog from "./TransactionLog";
import TransferLog from "../Transfer/TransferLog";

function FilterLogContainer({search, filterType}) {

    const data = [
        //placeholder data
        { username: 'User1', category: 'Category1', amount: 8 },
        { username: 'User2', category: 'Category2', amount: 10 },
        { username: 'User3', category: 'Category1', amount: 15 },
        { username: 'User4', category: 'Category3', amount: 20 },
        { username: 'User5', category: 'Category2', amount: 25 },
        { username: 'User6', category: 'Category1', amount: 30 },
        { username: 'User7', category: 'Category3', amount: 35 },
        { username: 'User8', category: 'Category2', amount: 40 },
        { username: 'User9', category: 'Category1', amount: 45 },
        { username: 'User10', category: 'Category3', amount: 50 },
    ];

    return (
        <div className="filter-log">
            <h3 className='filter-name'>Today</h3>
            <div className="log-container">
                <TransactionLog data={data}/>
            </div>
        </div>
    )
}

export default FilterLogContainer

