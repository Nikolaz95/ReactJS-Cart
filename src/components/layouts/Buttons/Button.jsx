import React from 'react'

//import css
import './Button.css';

const Button = ({ onClick, children, variant, icon, active }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${active ? 'active' : 'notActive'}`}>
            {children}
        </button>
    )
}

export default Button