import './styles.css';

import { Component } from "react";

export const Button = (props) => {
    const {text, onClick, disabled} = props;
    return (
        <button 
            disabled={disabled} 
            className={'button'} 
            onClick={onClick}>
                {text}
        </button>
    );
}