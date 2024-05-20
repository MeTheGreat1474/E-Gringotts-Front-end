import React from "react";
import './Button.css'
import {Link} from 'react-router-dom';


const STYLES = ['btn--login', 'btn--outline', 'btn--rectangle'];
const SIZES = ['btn--large', 'btn--small'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button className={`btn ${checkButtonSize} ${checkButtonStyle}`} onClick={onClick} children={children} type={type}/>
    )
}