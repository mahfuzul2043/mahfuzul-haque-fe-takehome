import { Button, ButtonGroup, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { industries, setForm, initialFormState } from "./redux/slices/formSlice";
import { setQuote } from "./redux/slices/quoteSlice";

export default function Quote() {
    const [loading, setLoading] = useState(false);
    const form = useSelector(state => state.form);
    const quote = useSelector(state => state.quote);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = async () => {
        try {
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL, { body: JSON.stringify(form), method: 'POST', headers: { authorization: `token ${process.env.REACT_APP_AUTH_TOKEN}`, 'Content-Type': 'application/json' } });
            const data = await response.json();
            dispatch(setQuote(data));
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }

    useEffect(() => {
        submitForm();
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h5'>Quote</Typography>
                <Divider style={{ margin: '10px 0' }} />
            </Grid>
            {(!quote || loading) ? (
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <CircularProgress size={30} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Business Name:</Typography>
                            <Typography>{quote.application.businessName}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Number of Employees:</Typography>
                            <Typography>{quote.application.numEmployees}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Industry:</Typography>
                            <Typography>{industries.find(industry => industry.id === quote.application.industryId).label}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Annual Payroll:</Typography>
                            <Typography>{quote.application.annualPayroll.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Gross Annual Sales:</Typography>
                            <Typography>{quote.application.grossAnnualSales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Contact Email:</Typography>
                            <Typography>{quote.application.contactEmail}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Application URL:</Typography>
                            <Link href={quote.application.applicationUrl} target='_blank' rel='noreferrer'>Click Here</Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Zip Code:</Typography>
                            <Typography>{quote.application.locations[0].zip}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Typography style={{ fontWeight: 'bold' }}>Available Policy Types:</Typography>
                            <Typography>{quote.availablePolicyTypes?.join(', ') ?? 'Error'}</Typography>
                        </div>
                        {quote.errors && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography style={{ fontWeight: 'bold' }}>Errors:</Typography>
                                {quote.errors.map(error => <Typography key={error.message} color='secondary'>{error.message}</Typography>)}
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <ButtonGroup variant='outlined'>
                            <Button onClick={() => navigate('/finance-details')}>Previous</Button>
                            <Button onClick={() => {
                                dispatch(setQuote(null));
                                dispatch(setForm(initialFormState));
                                navigate('/business-info');
                            }}>Reset</Button>
                        </ButtonGroup>
                    </Grid>
                </>
            )}
        </Grid>
    )
}