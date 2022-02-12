import { createSlice } from "@reduxjs/toolkit";

export const quoteSlice = createSlice({
    name: 'quote',
    initialState: null,
    reducers: {
        setQuote: (state, action) => {
            return state = action.payload;
        }
    }
})

export const { setQuote } = quoteSlice.actions;

export default quoteSlice.reducer;