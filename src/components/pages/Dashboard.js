import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useParams} from "react-router-dom";

function Dashboard() {
    const { username } = useParams();

    //TODO: TAKE USER INFO BASED ON USER DATA

    return (
        <>
            <div className="dashboard">
                    <div className="left">
                        <Navbar username={username}/>
                    </div>
                    <div className="middle">

                    </div>
                    <div className="right">

                    </div>
            </div>
        </>
    )
}

export default Dashboard
