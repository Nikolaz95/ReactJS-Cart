import React from 'react'

//import css
import "./Invoice.css";

//import img
import Logo from "../../../assets/logoIcon/logo3.png"

//import components
import Image from '../LogoIcon/Image';

const Invoice = ({ products }) => {
    const totalAmount = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

    return (
        <section className="customBilSection" >
            <main className="customBilMain" id="order_invoice">
                <div className="customBilLogo">
                    <Image src={Logo} variant="logoImg" />
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
                            {products.map((product) => (
                                <tr key={product.id}> {/* Use product.id as the unique key */}
                                    <td>{product.quantity}</td>
                                    <td>{product.name}</td>
                                    <td>$ {product.price.toFixed(2)}</td>
                                    <td>$ {(product.quantity * product.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4" className="totalLabel">Total:</td>
                                <td className="totalAmount">$ {totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </section>
    )
}

export default Invoice