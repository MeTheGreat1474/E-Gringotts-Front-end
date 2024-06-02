import React, {useState} from 'react'
import './Input.css'

//component for styling our input box

const STYLE =['input--login','input--filter','input--signUp','input--default'];
const SIZE = ['input--large','input--medium','input--small']

export const Input = ({type, placeholder, value, onChange, inputStyle, inputSize, maxlength}) =>{

    const checkInputStyle= STYLE.includes(inputStyle) ? inputStyle : STYLE[0];
    const checkInputSize = SIZE.includes(inputSize) ? inputSize : SIZE[0];

    return (
        <input className={`input ${checkInputSize} ${checkInputStyle}`}
               type={type} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxlength}/>
    )


}
