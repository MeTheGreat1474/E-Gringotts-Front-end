import React, {useState} from 'react'
import CurrencyInput from "react-currency-input-field";

//display an input for type money
function MoneyInput({amount, placeholder, onChange}) {

    return (
        <CurrencyInput
            autoFocus
            className="currency-input"
            placeholder={placeholder}
            value={amount} // Bind the value prop to the amount state
            fixedDecimalLength={2}
            disableGroupSeparators={true}
            onValueChange={onChange}
        />
    )
}

export default MoneyInput
