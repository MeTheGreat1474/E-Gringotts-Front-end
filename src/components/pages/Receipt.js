import React, {useEffect} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import ReceiptContent from "../ReceiptContent";
import Navbar from "../Navbar";

function Receipt() {
    const location = useLocation();
    const amount = location.state.amount;
    console.log(amount)
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <ReceiptContent />
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default Receipt
