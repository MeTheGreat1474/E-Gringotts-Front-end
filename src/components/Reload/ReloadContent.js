import React, {useEffect, useState} from 'react'
import './ReloadContent.css'
import BalanceAmount from "../BalanceAmount";
import CurrencyInput from "react-currency-input-field";
import {Button} from "../Button";
import { useNavigate } from 'react-router-dom';
import {useGetUser} from "../../services/getUser";
import {reload} from "../../services/reload";

function ReloadContent({username}) {

    const [amount, setAmount] = useState(0.00);
    const navigate = useNavigate();

    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleAmountSubmit = () => {
        reload(username, amount);
        console.log(`Username: ${username}, Amount: ${amount}`)
        navigate(`/${username}/reload/receipt`, { state: { amount: amount, username: username } });
    }

    return (
        <div className="reload-content">
            <div className="reload-title">
                <h1>RELOAD</h1>
            </div>
            <div className="reload-balance">
                <BalanceAmount />
            </div>
            <div className="reload-amount">
                <div className="reload-amount-text">
                    <h2>Amount</h2>
                </div>
                <div className="reload-amount-input">
                    <div className="reload-amount-enter">
                        <CurrencyInput
                            className="currency-input"
                            placeholder="Amount"
                            value={amount} // Bind the value prop to the amount state
                            fixedDecimalLength={2}
                            onValueChange={setAmount}
                        />
                        <div className='currency'>
                            <h3>Shekel</h3>
                        </div>
                    </div>
                    <div className="reload-amount-button-container">
                        <div className="reload-amount-button">
                        <Button onClick={() => setAmount(parseFloat(20).toFixed(2))}>20</Button>
                        <Button onClick={() => setAmount(parseFloat(50).toFixed(2))}>50</Button>
                        <Button onClick={() => setAmount(parseFloat(100).toFixed(2))}>100</Button>
                        </div>
                        <div className="reload-amount-button">
                            <Button onClick={() => setAmount(parseFloat(200).toFixed(2))}>200</Button>
                            <Button onClick={() => setAmount(parseFloat(300).toFixed(2))}>300</Button>
                            <Button onClick={() => setAmount(parseFloat(400).toFixed(2))}>400</Button>
                        </div>
                    </div>
                </div>
                <div className="reload-amount-confirm">
                    <Button type='submit' onClick={handleAmountSubmit}>Confirm Reload</Button>
                </div>
            </div>
        </div>
    )
}

export default ReloadContent