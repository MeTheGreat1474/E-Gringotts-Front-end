import React from 'react'
import {Button} from "./Button";

function AccountBalance({user}) {
    return (
        <>
            <div className="acc-balance-box">
                <div className="text-container">
                    <h3 className='text'>Your Balance</h3>
                </div>
                <div className="acc-balance">
                    <div className="money">
                        <h3>{(user?.balance?.toFixed(2)).toString()}</h3>
                    </div>
                    <div className="currency">
                        <h3>shekel</h3>
                    </div>
                </div>
                <div className="balance-buttons">
                    <div className="button-container">
                        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Transfer</Button>
                    </div>
                    <div className="button-container">
                        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Reload</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountBalance
