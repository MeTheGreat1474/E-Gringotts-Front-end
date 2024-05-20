import React, {useEffect} from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import TransferContent from "../Transfer/TransferContent";

function Transfer() {
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
                <TransferContent />
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default Transfer