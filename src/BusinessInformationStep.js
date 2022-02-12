import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { industries, setBusinessName, setContactEmail, setIndustryId } from './redux/slices/formSlice';
import { useNavigate } from 'react-router-dom';

export default function BusinessInformationStep() {
    const form = useSelector(state => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const closeErrors = () => setErrors([]);

    const nextStep = () => {
        const fieldErrors = [];

        if (!form.businessName) fieldErrors.push('No business name specified')
        if (!form.contactEmail) fieldErrors.push('No contact email specified')

        if (fieldErrors.length > 0) {
            setErrors(fieldErrors);
        } else {
            navigate('/finance-details');
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Business Information</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onBlur={e => dispatch(setBusinessName(e.target.value))} defaultValue={form.businessName} label='Business Name' style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id='industry-label'>Industry</InputLabel>
                        <Select value={form.industryId} labelId='industry-label' label='Industry' onChange={e => dispatch(setIndustryId(e.target.value))}>
                            {industries.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={form.contactEmail} onBlur={e => dispatch(setContactEmail(e.target.value))} type='email' label='Email' style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} justifyContent='center' display='flex'>
                    <Button variant='outlined' onClick={nextStep}>Next</Button>
                </Grid>
            </Grid>
            <Snackbar open={errors.length > 0} autoHideDuration={5000} onClose={closeErrors} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={closeErrors} severity='error'>{errors.join('. ')}</Alert>
            </Snackbar>
        </>
    )
}