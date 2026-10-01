import React, { useMemo } from 'react'

//import css
import "./Invoice.css";

//import img
import Logo from "../../../assets/logoIcon/logo3.png"

//import components
import Image from '../LogoIcon/Image';
import { formatPrice } from '../Animated/Animated';

const Invoice = ({ products }) => {
    const totalAmount = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    const invoiceNumber = useMemo(() => `SB-${Date.now().toString().slice(-6)}`, []);
    const invoiceDate = new Date().toLocaleDateString('en-GB');

    return (
        <section className="customBilSection" >
            <main className="customBilMain" id="order_invoice">
                <div className="customBilHeader">
                    <div className="customBilLogo">
                        <Image src={Logo} variant="logoImg" alt="Logo" />
                    </div>
                    <div className="customBilMeta">
                        <h1 className="customBilTitle">Invoice</h1>
                        <p>No. <b>{invoiceNumber}</b></p>
                        <p>Date: <b>{invoiceDate}</b></p>
                    </div>
                </div>

                <div className="tableContent">
                    <table>
                        <thead className="tableHeader">
                            <tr>
                                <th>Qt.</th>
                                <th>Description</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
                            {/* Use product.id as the unique key */}
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.quantity}</td>
                                    <td className="descriptionCell">{product.name}</td>
                                    <td>{formatPrice(product.price)}</td>
                                    <td>{formatPrice(product.quantity * product.price)}</td>
                                </tr>
                            ))}
                            <tr className="totalRow">
                                <td colSpan="3" className="totalLabel">Total</td>
                                <td className="totalAmount">{formatPrice(totalAmount)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="customBilThanks">Thank you for your order — Sweet Bites</p>
            </main>
        </section>
    )
}

export default Invoice
