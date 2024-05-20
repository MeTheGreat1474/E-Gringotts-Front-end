import React, {useState} from 'react'
import './Account/AccountContent.css'


const TYPE = ['input', 'address'];

function DisplayInput({label, value, type}) {
    const checkType = TYPE.includes(type) ? type : TYPE[0];

    return (
        <div className={`${checkType}`} >
            <h3>{label}</h3>
            <h4>{value}</h4>
        </div>
    )
}

export default DisplayInput
