import { fireEvent, render, within, screen } from "@testing-library/react";
import { annualValues } from "../../redux/slices/formSlice";
import FinanceDetailsStep from "../FinanceDetailsStep";
import MockComponent from "../MockComponent";

test('proper functionality of sales input', async () => {
    render(<MockComponent component={<FinanceDetailsStep />} />);
    const salesInput = within(screen.getByTestId('sales-input')).getByRole('button');
    fireEvent.mouseDown(salesInput);
    fireEvent.click(screen.getByText(annualValues[2].toLocaleString('en-US', { style: 'currency', currency: 'USD' })));

    expect(screen.getByTestId('sales-input').querySelector('input').value).toEqual(annualValues[2].toString());
})

test('proper functionality of payroll input', async () => {
    render(<MockComponent component={<FinanceDetailsStep />} />);
    const payrollInput = within(screen.getByTestId('payroll-input')).getByRole('button');
    fireEvent.mouseDown(payrollInput);
    fireEvent.click(screen.getByText(annualValues[3].toLocaleString('en-US', { style: 'currency', currency: 'USD' })));

    expect(screen.getByTestId('payroll-input').querySelector('input').value).toEqual(annualValues[3].toString());
})

describe('form validation', () => {
    beforeEach(() => {
        render(<MockComponent component={<FinanceDetailsStep />} />);
    })

    test('zip code validation', () => {
        const zipInput = screen.getByTestId('zip-input').querySelector('input');

        fireEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Number of employees was not specified. No zip code specified')).toBeInTheDocument();

        fireEvent.change(zipInput, { target: { value: '48212' } });
        fireEvent.focusOut(zipInput);
        fireEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Number of employees was not specified')).toBeInTheDocument();
    })

    test('Number of employees validation', () => {
        const numEmployeesInput = screen.getByTestId('employees-input').querySelector('input');

        fireEvent.change(numEmployeesInput, { target: { value: -23 } });
        fireEvent.focusOut(numEmployeesInput);
        fireEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Number of employees cannot be less than 1')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Number of employees cannot be less than 1').nextSibling.firstChild); // close the alert

        fireEvent.change(numEmployeesInput, { target: { value: 23 } });
        fireEvent.focusOut(numEmployeesInput);
        fireEvent.click(screen.getByText('Submit'));

        expect(screen.queryByText('Number of employees cannot be less than 1')).toBeNull();
    })
})