import { createSlice } from "@reduxjs/toolkit";

const ReduxSlice = createSlice({
    name: "productSlice",
    initialState: {
        "UserDetails": localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : [],
        "userCart": localStorage.getItem("userCart") ? JSON.parse(localStorage.getItem("userCart")) : [],
        "totalQuantity": localStorage.getItem("totalQuantity") ? JSON.parse(localStorage.getItem("totalQuantity")) : 0,
        "isLoggedIn" : localStorage.getItem("isLoggedIn") ? localStorage.getItem("isLoggedIn") : false,

    },
    reducers: {

        addToCart(state, action) {

            const productIndex = state.userCart.findIndex((product) => product.id === action.payload.id);

            if (productIndex >= 0) {
                state.userCart[productIndex].itemQuantity += 1;
            }
            else {
                let tempProduct = { ...action.payload, itemQuantity: 1 }
                state.userCart.push(tempProduct);
                state.totalQuantity += 1
            }
            localStorage.setItem("userCart", JSON.stringify(state.userCart));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
        },

        increaseQuantity(state, action) {
            const currentIndex = state.userCart.findIndex((item) => item.id === action.payload);
            state.userCart[currentIndex].itemQuantity += 1;

            localStorage.setItem("userCart", JSON.stringify(state.userCart));
        },

        decreaseQuantity(state, action) {
            const currentIndex = state.userCart.findIndex((item) => item.id === action.payload);
            if (state.userCart[currentIndex].itemQuantity > 1) {
                state.userCart[currentIndex].itemQuantity -= 1;
            }
            localStorage.setItem("userCart", JSON.stringify(state.userCart));
        },

        removeProduct(state, action) {
            const filteredData = state.userCart.filter((product) => product.id !== action.payload);
            state.totalQuantity--;
            state.userCart = filteredData;
            localStorage.setItem("userCart", JSON.stringify(state.userCart));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
        },

    }

});

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct } = ReduxSlice.actions;
export default ReduxSlice.reducer