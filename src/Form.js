import { LinearProgress, Paper, Step, StepButton, Stepper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import BusinessInformationStep from "./BusinessInformationStep";
import FinanceDetailsStep from "./FinanceDetailsStep";

const steps = ['Business Information', 'Finance Details', 'Quote'];

export default function Form() {
    const [stepIndex, setStepIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const form = useSelector(state => state.form);

    const submitForm = async () => {
        try {
            setLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL, { body: JSON.stringify(form), method: 'POST', headers: { authorization: `token ${process.env.REACT_APP_AUTH_TOKEN}`, 'Content-Type': 'application/json' } });
            const data = await response.json();
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            {loading && <LinearProgress />}
            <Paper style={{ width: '100%', padding: 20 }}>
                <Stepper activeStep={stepIndex}>
                    {steps.map((label, i) => (
                        <Step key={steps[i]}>
                            <StepButton>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {stepIndex === 0 && <BusinessInformationStep nextStep={() => setStepIndex(stepIndex + 1)} />}
                    {stepIndex === 1 && <FinanceDetailsStep previousStep={() => setStepIndex(stepIndex - 1)} submitForm={submitForm} />}
                </div>
            </Paper>
        </div>
    )
}