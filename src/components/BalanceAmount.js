import React, {useEffect} from 'react'
import './BalanceAmount.css'
import {useGetUser} from "../services/getUser";
import {useParams} from "react-router-dom";

function BalanceAmount() {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);


    return (
        <div className="balance-info-box">
            <div className="text-container">
                <h3 className='text'>Your Balance</h3>
            </div>
            <div className="amount-box-acc-balance">
                <div className="amount-box-money">
                    <h3>{(user?.balance.toFixed(2))}</h3>
                </div>
                <div className="amount-box-currency">
                    <h3>Knut</h3>
                </div>
            </div>
        </div>
    )
}

export default BalanceAmount
