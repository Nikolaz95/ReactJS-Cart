import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
//import css
import "./CartConfirmModal.css";


//import components
import Button from '../../Buttons/Button';
import Invoice from '../../InvoicePDF/Invoice';
import { CheckIcon, CloseIcon } from '../../Icons/Icons';
import { formatPrice } from '../../Animated/Animated';

const list = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } },
};

const CartConfirmModal = ({ onClose, products, total, onComplete }) => {
    const invoiceRef = useRef(null);
    const [status, setStatus] = useState('idle');

    const handleDownload = async () => {
        const input = invoiceRef.current;
        setStatus('loading');

        // Temporarily show the Invoice for capturing
        input.style.display = 'block';

        try {
            // PDF libraries are loaded only when needed to keep the initial bundle small
            const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
                import('html2canvas'),
                import('jspdf'),
            ]);

            // Generate the PDF
            const canvas = await html2canvas(input, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice_customNikolaZovko.pdf`);
            onComplete();
        } catch (error) {
            console.error('Error generating PDF:', error);
            setStatus('error');
        } finally {
            // Hide the Invoice again
            input.style.display = 'none';
        }
    };


    return (
        <div className='modalConfirmSummary'>
            <motion.button
                className="modalCloseBtn"
                onClick={onClose}
                aria-label="Close"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.85 }}
            >
                <CloseIcon />
            </motion.button>

            <div className='modalConfirmHeader'>
                <motion.div
                    className="modalCheck"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <motion.path
                            d="m5 12.5 4.5 4.5L19 7.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.35, duration: 0.45, ease: 'easeOut' }}
                        />
                    </svg>
                </motion.div>
                <h2 id="confirm-title" className='modalConfirmTitleText'>Confirm your order</h2>
                <p className='modalConfirmSubtitle'>We hope you enjoy your food!</p>
            </div>

            <motion.ul className='modalConfirmOrderContent' variants={list} initial="hidden" animate="visible">
                {products.map((product) => (
                    <motion.li key={product.id} className="productOrderedSummary" variants={item}>
                        <img src={product.image} alt="" className="productOrderedThumb" />
                        <div className="productOrderedInfo">
                            <p className="productOrderedName">{product.name}</p>
                            <p className="productOrderedMeta">
                                <span className="productOrderedQty">{product.quantity}x</span>
                                <span>@ {formatPrice(product.price)}</span>
                            </p>
                        </div>
                        <p className="productOrderedTotal">{formatPrice(product.quantity * product.price)}</p>
                    </motion.li>
                ))}
                <motion.li className="modalConfirmOrder" variants={item}>
                    <p>Order Total</p>
                    <p className="modalConfirmTotal">{formatPrice(total)}</p>
                </motion.li>
            </motion.ul>

            {status === 'error' && (
                <p className="modalConfirmError" role="alert">Something went wrong while creating the invoice. Please try again.</p>
            )}

            <div className="modalConfirmBtn" >
                <Button variant="primary block" onClick={handleDownload} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                        <>
                            <span className="buttonSpinner" /> Preparing invoice…
                        </>
                    ) : (
                        <>
                            Confirm & download invoice <CheckIcon />
                        </>
                    )}
                </Button>
                <Button variant="ghost block" onClick={onClose}>
                    Keep shopping
                </Button>
            </div>

            {/* Invoice is rendered off to the side and only shown while capturing the PDF */}
            {createPortal(
                <div ref={invoiceRef} className="invoiceStage" style={{ display: 'none' }}>
                    <Invoice products={products} />
                </div>,
                document.body
            )}
        </div>
    );
};


export default CartConfirmModal
