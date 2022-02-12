import { Alert, Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { annualValues, setAnnualPayroll, setGrossAnnualSales, setLocation, setNumEmployees } from "./redux/slices/formSlice";

export default function FinanceDetailsStep() {
    const form = useSelector(state => state.form);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const closeErrors = () => setErrors([]);

    const submitClicked = () => {
        const newErrors = [];

        if (form.numEmployees === null) newErrors.push('Number of employees was not specified')
        else if (form.numEmployees < 1) newErrors.push('Number of employees cannot be less than 1')
        if (!form.locations[0].zip) newErrors.push('No zip code specified')

        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            navigate('/quote');
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Finance Details</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id='sales-label'>Annual Sales</InputLabel>
                        <Select value={form.grossAnnualSales} labelId='sales-label' label='Annual Sales' onChange={e => dispatch(setGrossAnnualSales(e.target.value))}>
                            {annualValues.map(value => (
                                <MenuItem key={`sales-${value}`} value={value}>
                                    {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id='payroll-label'>Annual Payroll</InputLabel>
                        <Select value={form.annualPayroll} labelId='payroll-label' label='Annual Payroll' onChange={e => dispatch(setAnnualPayroll(e.target.value))}>
                            {annualValues.map(value => (
                                <MenuItem key={`payroll-${value}`} value={value}>
                                    {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField type='number' defaultValue={form.numEmployees} onBlur={e => dispatch(setNumEmployees(parseInt(e.target.value)))} label='Number of Employees' style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField defaultValue={form.locations[0].zip} onBlur={e => dispatch(setLocation(e.target.value))} label='Zip Code' style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <ButtonGroup variant='outlined'>
                        <Button onClick={() => navigate('/business-info')}>Previous</Button>
                        <Button onClick={submitClicked}>Submit</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Snackbar open={errors.length > 0} autoHideDuration={5000} onClose={closeErrors} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={closeErrors} severity='error'>{errors.join('. ')}</Alert>
            </Snackbar>
        </>
    )
}