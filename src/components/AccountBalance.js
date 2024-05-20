import React from 'react'
import {Button} from "./Button";
import {Link, useNavigate} from "react-router-dom";
import BalanceAmount from "./BalanceAmount";

function AccountBalance({user}) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="acc-balance-box">
                <BalanceAmount/>
                <div className="balance-buttons">
                    <div className="button-container">
                        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' onClick={() => handleNavigation(`/${user.username}/transfer`)}>Transfer</Button>
                    </div>
                    <div className="button-container">
                        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' onClick={() => handleNavigation(`/${user.username}/reload`)}>Reload</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountBalance
