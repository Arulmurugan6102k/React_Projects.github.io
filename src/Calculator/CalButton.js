import React from "react";
import './Calculator.css';

const Button = ({lable, onClick, ClassName, index }) => {

    return (
        <button id={index} className={`${ClassName} btn to-do-btn`} lable={lable} onClick={() => onClick(lable)}>{lable}</button>
    );

}
export default Button;