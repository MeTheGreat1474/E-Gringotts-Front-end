import React, {useState} from 'react'
import CurrencyInput from "react-currency-input-field";

function MoneyInput({amount, setAmount, placeholder, onChange}) {

    return (
        <CurrencyInput
            className="currency-input"
            placeholder={placeholder}
            value={amount} // Bind the value prop to the amount state
            fixedDecimalLength={2}
            onValueChange={onChange}
        />
    )
}

export default MoneyInput
