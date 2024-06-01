import React, {useState} from 'react'
import {Input} from "../Input";
import {Button} from "../Button";
import {postAddCurrency} from "../../services/currencyPair";
import './CurrencyAdd.css'

function CurrencyAdd() {

    const [newFromCurrency, setNewFromCurrency] = useState("")
    const [newToCurrency, setNewToCurrency] = useState("")
    const [exchangeRate, setExchangeRate] = useState("")
    const [processingFee, setProcessingFee] = useState("")


    const handleNewFromCurrencyChange = (e) => {
        setNewFromCurrency(e.target.value)
    }
    const handleNewToCurrencyChange = (e) => {
        setNewToCurrency(e.target.value)
    }
    const handleExchangeRateChange = (e) => {
        setExchangeRate(e.target.value)
    }
    const handleProcessingFeeChange = (e) => {
        setProcessingFee(e.target.value)
    }

    const handleCurrencySubmit = async () => {
        const response = await postAddCurrency([[newFromCurrency, newToCurrency, exchangeRate, processingFee]]);
        if (response) {
            console.log('in confirm content', response);
        } else {
            console.log('Adding currency pair failed');
        }
    }

    return (
        <>
            <div className="currency-add-box">
                <div className="title">
                    <h1>CURRENCY</h1>
                </div>
                <div className="currency-add-content-box">
                    <div className="currency-detail-box">
                        <div className="currency-detail-input-box">
                            <label>From</label>
                            <Input type='input' value={newFromCurrency} onChange={handleNewFromCurrencyChange}
                                   placeholder='Knut...' inputStyle='input--default' inputSize='input--medium'/>
                        </div>
                        <div className="currency-detail-input-box">
                            <label>To</label>
                            <Input type='input' value={newToCurrency} onChange={handleNewToCurrencyChange}
                                   placeholder='Sickle...' inputStyle='input--default'/>
                        </div>
                        <div className="currency-detail-input-box">
                            <label>Exchange Rate</label>
                            <Input type='input' value={exchangeRate} onChange={handleExchangeRateChange}
                                   placeholder='0.00' inputStyle='input--default'/>
                        </div>
                        <div className="currency-detail-input-box">
                            <label>Processing Fee</label>
                            <Input type='input' value={processingFee} onChange={handleProcessingFeeChange}
                                   placeholder='0.00' inputStyle='input--default'/>
                        </div>


                    </div>
                    <div className="add-currency-pair-button">
                        <Button type='submit' onClick={handleCurrencySubmit}>Add Pair</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrencyAdd
