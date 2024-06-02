import React, {useState} from 'react'
import './Account/AccountContent.css'

//display Text in a consistent format and color
//reduce redundancy

const TYPE = ['input', 'address'];

function DisplayInput({label, value, type}) {
    //assign classname as default('input') if not specified
    const checkType = TYPE.includes(type) ? type : TYPE[0];

    return (
        <div className={`${checkType}`} >
            <h3>{label}</h3>
            <h4>{value}</h4>
        </div>
    )
}

export default DisplayInput
