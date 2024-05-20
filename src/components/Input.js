import React, {useState} from 'react'
import './Input.css'

const STYLE =['input--login','input--filter','input--signUp','input--default'];
const SIZE = ['input--large','input--medium']

export const Input = ({type, placeholder, value, onChange, inputStyle, inputSize}) =>{

    const checkInputStyle= STYLE.includes(inputStyle) ? inputStyle : STYLE[0];
    const checkInputSize = SIZE.includes(inputSize) ? inputSize : SIZE[0];

    return (
        <input className={`input ${checkInputSize} ${checkInputStyle}`}
               type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    )


}
