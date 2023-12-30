import { configureStore } from "@reduxjs/toolkit";
import ReduxSliceReducer from "../ReduxSlice/ReduxSlice";

const ReduxStore = configureStore({
    reducer : {
        Cart : ReduxSliceReducer
    }
});

export default ReduxStore