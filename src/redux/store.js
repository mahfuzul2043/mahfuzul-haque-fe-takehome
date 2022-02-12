import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import quoteReducer from "./slices/quoteSlice";

export const store = configureStore({
    reducer: {
        form: formReducer,
        quote: quoteReducer
    }
})