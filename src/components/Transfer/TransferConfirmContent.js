import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import DisplayUserProfile from "../DisplayUserProfile";
import './TransferConfirmContent.css'
import {Input} from "../Input";
import CurrencyInput from "react-currency-input-field";
import MoneyInput from "../MoneyInput";
import {Button} from "../Button";
import {postTransfer} from "../../services/transfer";

function TransferConfirmContent({toUser}) {
    const navigate = useNavigate();
    const { username } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const { user: receiverUser, getUser: getReceiverUser } = useGetUser(toUser);
    const { user: senderUser, getUser: getSenderUser } = useGetUser(username);
    useEffect(() => {
        getReceiverUser();
        getSenderUser();
    }, [getReceiverUser, getSenderUser]);

    const userBalance = senderUser?.balance
    const [error, setError] = useState("");

    const [amount, setAmount] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("OTHERS");
    const transactionType = "TRANSFER"

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

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        console.log(e.target.value)
    }

    const handleAmountSubmit = async () => {
        if (amount >= userBalance) {
            setError("*Transfer amount cannot be larger than your balance");
            return;
        }
        setError("");
        setIsLoading(true);

        const response = await postTransfer(senderUser?.userId, receiverUser?.userId, amount, category, transactionType, details);
        setIsLoading(false); // End loading
        if (response) {
            console.log( 'in confirm content' , response); // Logs the transactionId to the console
            navigate(`/${username}/transfer/receipt`, { state: { transactionId: response } });
        } else {
            console.log('Transfer failed');
        }
    }

    return (
        <div className="transfer-confirm-box">
            <div className="title">
                <h1>TRANSFER TO</h1>
            </div>
            <div className="transfer-confirm-detail-box">
                <DisplayUserProfile user={receiverUser}/>
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
                        {error && <div className="error-message">
                            <h4>{error}</h4>
                        </div>} {/* Display error message when there is an error */}
                    </div>
                    <div className="transfer-details-container">
                        <div className="transfer-details-text">
                            <h2>Category</h2>
                        </div>
                        <div className="dropdown-list">
                            <select onChange={handleCategoryChange}>
                                <option value="OTHERS">OTHERS</option>
                                <option value="FOOD">FOOD</option>
                                <option value="GROCERY">GROCERY</option>
                                <option value="MEDICAL">MEDICAL</option>
                                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                                <option value="UTILITIES">UTILITIES</option>
                                <option value="RELOAD">RELOAD</option>
                                <option value="EXCHANGE">EXCHANGE</option>
                            </select>
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
                    {isLoading &&
                        <div className="loading-overlay">
                            <div className="loading-spinner">Transfering...</div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default TransferConfirmContent
