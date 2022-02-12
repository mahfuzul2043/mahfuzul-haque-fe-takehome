import { createSlice } from "@reduxjs/toolkit";

export const industries = [{ id: 10537, label: 'Plumber' }, { id: 10391, label: 'Software Developer' }, { id: 10415, label: 'Lawyer' }, { id: 10109, label: 'Handyman' }]
export const annualValues = [50000, 75000, 100000, 150000, 200000]

export const initialFormState = {
    businessName: null,
    industryId: industries[0].id,
    contactEmail: null,
    grossAnnualSales: annualValues[0],
    annualPayroll: annualValues[0],
    numEmployees: null,
    locations: [
        { zip: null }
    ]
}

export const formSlice = createSlice({
    name: 'form',
    initialState: initialFormState,
    reducers: {
        setBusinessName: (state, action) => {
            state.businessName = action.payload;
        },
        setIndustryId: (state, action) => {
            state.industryId = action.payload;
        },
        setContactEmail: (state, action) => {
            state.contactEmail = action.payload;
        },
        setGrossAnnualSales: (state, action) => {
            state.grossAnnualSales = action.payload;
        },
        setAnnualPayroll: (state, action) => {
            state.annualPayroll = action.payload;
        },
        setNumEmployees: (state, action) => {
            state.numEmployees = action.payload;
        },
        setLocation: (state, action) => {
            state.locations[0].zip = action.payload;
        },
        setForm: (state, action) => {
            return state = action.payload;
        }
    }
})

export const { setForm, setBusinessName, setIndustryId, setContactEmail, setGrossAnnualSales, setAnnualPayroll, setNumEmployees, setLocation } = formSlice.actions;

export default formSlice.reducer;