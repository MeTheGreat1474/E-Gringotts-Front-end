import React, {useEffect, useState} from 'react'
import './ExchangeContent.css'
import MoneyInput from "../MoneyInput";
import {Button} from "../Button";
import {postTransfer} from "../../services/transfer";
import {useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import {exchange, postExchange} from "../../services/exchange";
import DisplayInput from "../DisplayInput";

function ExchangeContent() {
    const { username } = useParams();
    const { user, getUser} = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);
    const userBalance = user?.balance


    const [fromCurrency, setFromCurrency] = useState("Knut");
    const [toCurrency, setToCurrency] = useState("Sickle");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [processingFee, setProcessingFee] = useState("");


    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value)
    }

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value)
    }

    function handleValueChange(value) {
        if (value !== undefined) {
            setAmount(value)
        } else {
            console.error('Value is undefined');
        }
    }

    const handleAmountSubmit = async () => {
        // if (amount >= userBalance) {
        //     setError("*Transfer amount cannot be larger than your balance");
        //     return;
        // }
        // setError("");
        // setIsLoading(true);

        const response = await postExchange(user?.userId, fromCurrency, toCurrency, amount );
        // setIsLoading(false); // End loading
        console.log( 'fromCurrency: ' , fromCurrency, ' toCurrency: ', toCurrency, ' amount: ', amount);
        if (response) {
            console.log( 'in confirm content' , response); // Logs the transactionId to the console
            // navigate(`/${username}/transfer/receipt`, { state: { transactionId: response } });

        } else {
            console.log('Transfer failed');
        }
    }

    return (
        <>
            <div className="exchange-box">
                <div className="title">
                    <h1>GRINGGOTT'S EXCHANGE</h1>
                </div>
                <div className="exchange-detail-box">
                    <select className="exchange-select" value={fromCurrency} onChange={handleFromCurrencyChange}>
                        <option value="Knut">Knut</option>
                        <option value="Sickle">Sickle</option>
                        <option value="Galleon">Galleon</option>
                    </select>
                    <select className="exchange-select" value={toCurrency} onChange={handleToCurrencyChange}>
                        <option value="Knut">Knut</option>
                        <option value="Sickle">Sickle</option>
                        <option value="Galleon">Galleon</option>
                    </select>
                </div>
                <div className="exchange-amount-box">
                    <MoneyInput
                        onChange={handleValueChange}
                        amount={amount}
                        placeholder='0.00'
                    />
                </div>
                <div className="exchange-convert-amount-button">
                    <Button type='submit' onClick={handleAmountSubmit}>Convert</Button>
                </div>
                <div className="exchange-convert-result">
                    <DisplayInput value={convertedAmount} label='Converted Amount'/>
                    <DisplayInput value={processingFee} label='Processing Fee' />
                </div>
            </div>
        </>
    )
}

export default ExchangeContent
