import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
//import css
import "./CartConfirmModal.css";

//import img
import confirm from "../../../../assets/logoIcon/icon-confirm.png";
import cancel from "../../../../assets/logoIcon/icon-cancelPic.png";



//import components
import Image from '../../LogoIcon/Image';
import Button from '../../Buttons/Button';
import Invoice from '../../InvoicePDF/Invoice';


const CartConfirmModal = ({ onClose, products, total, handleClearCart }) => {
    const invoiceRef = useRef(null);

    const handleDownload = () => {
        const input = invoiceRef.current;

        // Temporarily show the Invoice for capturing
        input.style.display = 'block';

        // Generate the PDF
        html2canvas(input, { scale: 3 })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`invoice_customNikolaZovko.pdf`);
                handleClearCart()
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            })
            .finally(() => {
                // Hide the Invoice again
                input.style.display = 'none';
            });
    };


    return (
        <div className='modalConfirmSummary'>
            <div className='modalConfirmHeader'>
                <Button onClick={onClose} variant="modalCloseX">
                    <Image src={cancel} alt={"here should be a picture"} variant="iconImg" />
                </Button>
                <h1 className='modalConfirmTitleText'>We hope you enjoy your food!</h1>
            </div>

            <div className='modalConfirmOrderContent'>
                {/*confirm order list start  */}
                {products.map((product) => {
                    const totalProductCost = product.quantity * product.price; // Calculate total for each product
                    return (
                        <div key={product.id} className="productOrderedSummary">
                            <div className="productOrderedInnerSummary">
                                <Image src={product.image}
                                    alt="Product Image"
                                    variant="iconImgProduct" />
                                <div className="productOrderedSummaryList">
                                    <div className="productOrderedSummaryListTop">
                                        <p>{product.name}</p>
                                    </div>
                                    <div className="productOrderedSummaryListBottom">
                                        <p>{product.quantity} x</p>
                                        <p>$ {product.price}</p>
                                        <p>$ {totalProductCost.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="articleSeperator"></div>
                        </div>
                    );
                })}
            </div>

            <div className='modalConfirmBotton'>
                <div className="modalConfirmOrder">
                    <p>Order Total :</p>
                    <p>$ {total} </p>
                </div>

                <div className="modalConfirmBtn" >
                    <Button variant="confirmOrder" onClick={handleDownload}>
                        Confirm Order!<Image src={confirm} alt={"here should be a picture"} variant="iconImg" />
                    </Button>
                    {/* <Button variant="cancelOrder" onClick={handleCancelOrder}>
                        Cancel Order!<Image src={cancel} alt={"here should be a picture"} variant="iconImg" />
                    </Button> */}
                </div>
            </div>

            <div ref={invoiceRef} style={{ display: 'none' }}>
                <Invoice products={products} />
            </div>

        </div>
    );
};


export default CartConfirmModal