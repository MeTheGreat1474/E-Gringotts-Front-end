import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import DisplayUserProfile from "../DisplayUserProfile";
import './TransferConfirmContent.css'
import {Input} from "../Input";
import CurrencyInput from "react-currency-input-field";
import MoneyInput from "../MoneyInput";
import {Button} from "../Button";

function TransferConfirmContent({toUser}) {
    const navigate = useNavigate();
    const { username } = useParams();

    const { user, getUser } = useGetUser(toUser);
    useEffect(() => {
        getUser();
    }, [getUser]);

    const [amount, setAmount] = useState("");
    const [details, setDetails] = useState("");

    const handleDetailsChange = (e) => {
        setDetails(e.target.value)
        console.log(e.target.value)
    }

    function handleValueChange(value) {
        // Ensure the event object exists and has a value property
        if (value !== undefined) {
            setAmount(value)
            console.log(value)
        } else {
            console.error('Value is undefined');
        }
    }

    const handleAmountSubmit = () => {

        //TODO: MAKE NEW TRANSFER API AND CREATE RECEIPT PAGE

        navigate(`/${username}/transfer/receipt`, { state: { amount: amount } });
    }

    return (
        <div className="transfer-confirm-box">
            <div className="title">
                <h1>TRANSFER TO</h1>
            </div>
            <div className="transfer-confirm-detail-box">
                <DisplayUserProfile user={user}/>
                <div className="transfer-confirm-container">
                    <div className="transfer-amount-container">
                        <div className="transfer-amount-text">
                            <h2>Amount</h2>
                        </div>
                        <div className="transfer-amount-box">
                            <MoneyInput
                                onChange={handleValueChange}
                                amount={amount}
                                placeholder='0.00'
                            />
                            <div className='currency'>
                                <h3>Shekel</h3>
                            </div>
                        </div>
                    </div>
                    <div className="transfer-details-container">
                        <div className="transfer-details-text">
                            <h2>Details</h2>
                        </div>
                        <div className="transfer-details-box">
                            <Input
                                value={details}
                                inputStyle='input--default'
                                inputSize='input--large'
                                placeholder='What for?'
                                type='input'
                                onChange={handleDetailsChange}
                            />
                        </div>
                    </div>
                    <Button type='submit' onClick={handleAmountSubmit}>Confirm Transfer</Button>

                    {/*<CurrencyInput*/}
                    {/*    className="currency-input"*/}
                    {/*    placeholder="Amount"*/}
                    {/*    value={amount} // Bind the value prop to the amount state*/}
                    {/*    fixedDecimalLength={2}*/}
                    {/*    onValueChange={setAmount}*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    )
}

export default TransferConfirmContent
