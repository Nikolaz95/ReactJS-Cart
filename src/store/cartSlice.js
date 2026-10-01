import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: [],
        total: 0,
    },
    reducers: {
        add(state, action) {
            const { id, name, price, image, category } = action.payload;

            // Find if the product already exists in the cart
            const existingProductIndex = state.cartList.findIndex(
                (product) => product.id === id
            );

            if (existingProductIndex !== -1) {
                // If product exists, increase its quantity
                state.cartList[existingProductIndex].quantity += 1;
            } else {
                // If product doesn't exist, add it to the cart
                state.cartList.push({ id, name, price, image, category, quantity: 1 });
            }

            // Update the total price
            state.total += price;
        },
        remove: (state, action) => {
            const productId = action.payload;
            // Find the product before filtering it out so the total can be recalculated
            const productToRemove = state.cartList.find(product => product.id === productId);
            if (productToRemove) {
                state.total -= productToRemove.price * productToRemove.quantity;
            }
            state.cartList = state.cartList.filter(product => product.id !== productId);
        },
        decrease: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.cartList.find(item => item.id === productId);

            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
                state.total -= existingProduct.price;
            } else if (existingProduct && existingProduct.quantity === 1) {
                // If the quantity is 1, remove the product from the cart
                state.cartList = state.cartList.filter(item => item.id !== productId);
                state.total -= existingProduct.price;
            }
        },
        clearCart: (state) => {
            state.cartList = [];
            state.total = 0;
        },
    }
});


export const { add, remove, clearCart, decrease } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;