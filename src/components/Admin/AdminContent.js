import React, {useEffect} from 'react'
import './AdminContent.css'
import {useGetUser} from "../../services/getUser";

function AdminContent({username}) {

    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className='admin-box'>
            <div className="title">
                <h1>ADMIN</h1>
            </div>
            <div className="admin-content-box">
                <h2>Statistics</h2>
                <div className="admin-content-container">
                    <h3>Total Number of Users</h3>
                    <div className="admin-content">
                        <h4>{user?.user.numOfUsers}</h4>
                        <p>registered since 1447</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>Total number of Cards</h3>
                    <div className="admin-content">
                        <h4>{user?.user.numOfUsers}</h4>
                        <p>cards since 1447</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>Total number of Transactions</h3>
                    <div className="admin-content">
                        <h4>{user?.user.numOfUsers}</h4>
                        <p>cards since 1447</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>Total number of Transaction amount range 0 to 100</h3>
                    <div className="admin-content">
                        <h4>{user?.user.numOfTransactionsAmountRange0to100}</h4>
                        <p>transactions</p>
                    </div>
                </div>
                <div className="admin-content-container">
                    <h3>Total number of transaction amount range 100 to 1000</h3>
                    <div className="admin-content">
                        <h4>{user?.user.numOfTransactionsAmountRange101to1000}</h4>
                        <p>transactions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminContent
