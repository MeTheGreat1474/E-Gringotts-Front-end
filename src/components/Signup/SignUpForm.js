import React, {useState} from 'react'
import {Input} from "../Input";
import {Button} from "../Button";
import {useNavigate} from "react-router-dom";
import './SignUpForm.css'

const TYPE = ['input', 'textarea'];

function SignUpForm({label, type, value, onChange, className, rows, cols, maxlength}) {

    return (

        <>
            <label>{label}</label>
            {/*<Input inputStyle='input--signUp' className={className} type={type} value={value} onChange={onChange} placeholder={label}/>*/}
            {type === 'textarea' ? (
                <textarea
                    className={className}
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={onChange}
                    placeholder={label}
                    spellCheck="false"
                />
            ) : (
                <Input
                    inputStyle='input--signUp'
                    className={className}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    maxlength={maxlength}
                />
            )}
        </>
    )
}

export default SignUpForm
