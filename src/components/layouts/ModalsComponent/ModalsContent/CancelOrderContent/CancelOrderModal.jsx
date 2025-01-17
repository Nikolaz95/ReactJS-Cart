import React from 'react'

//import css
import "./CancelOrderModal.css";

const CancelOrderModal = ({ closeModal }) => {
    return (
        <section className='modalCancelModal'>
            <h1>Are you sure you wanna cancel order ?</h1>
            <button onClick={closeModal}>Yes</button>
            <button onClick={closeModal}>No</button>
        </section>
    )
}

export default CancelOrderModal