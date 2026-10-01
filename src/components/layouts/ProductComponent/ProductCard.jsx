import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

//import components
import { CartIcon, MinusIcon, PlusIcon } from '../Icons/Icons';
import { RollingNumber, formatPrice } from '../Animated/Animated';

const swap = {
    initial: { opacity: 0, y: 14, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -14, scale: 0.9 },
};

const ProductCard = ({ product, index, quantity, onAdd, onDecrease }) => {
    const imageRef = useRef(null);
    const selected = quantity > 0;

    return (
        <motion.article
            className={`productCard ${selected ? 'isSelected' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="productMedia">
                <div className="productImageWrap">
                    <img
                        ref={imageRef}
                        src={product.image}
                        alt={product.name}
                        title={product.name}
                        className="productImage"
                        loading="lazy"
                    />
                    <AnimatePresence>
                        {selected && (
                            <motion.span
                                className="productInCart"
                                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -10 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                                <CartIcon /> In cart
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className="productAction">
                    <AnimatePresence initial={false}>
                        {selected ? (
                            <motion.div
                                key="counter"
                                className="qtyControl"
                                {...swap}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                                <motion.button
                                    className="qtyBtn"
                                    onClick={() => onDecrease(product.id)}
                                    whileTap={{ scale: 0.8 }}
                                    aria-label={`Decrease quantity of ${product.name}`}
                                >
                                    <MinusIcon />
                                </motion.button>
                                <RollingNumber value={quantity} className="qtyValue" />
                                <motion.button
                                    className="qtyBtn"
                                    onClick={(e) => onAdd(product, e.currentTarget, imageRef.current)}
                                    whileTap={{ scale: 0.8 }}
                                    aria-label={`Increase quantity of ${product.name}`}
                                >
                                    <PlusIcon />
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="add"
                                className="addToCartBtn"
                                onClick={(e) => onAdd(product, e.currentTarget, imageRef.current)}
                                {...swap}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                                <CartIcon className="addToCartIcon" />
                                Add to Cart
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="productInfo">
                <p className="productCategory">{product.category}</p>
                <h3 className="productName">{product.name}</h3>
                <p className="productPrice">{formatPrice(product.price)}</p>
            </div>
        </motion.article>
    )
}

export default ProductCard
