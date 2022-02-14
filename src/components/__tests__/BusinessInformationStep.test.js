import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { industries } from "../../redux/slices/formSlice"
import BusinessInformationStep from "../BusinessInformationStep"
import MockComponent from "../MockComponent"

test('proper functionality of industry input', async () => {
    render(<MockComponent component={<BusinessInformationStep />} />);
    const industryInput = within(screen.getByTestId('industry-input')).getByRole('button');
    fireEvent.mouseDown(industryInput);
    fireEvent.click(screen.getByText(industries[1].label)); // Software Developer

    expect(screen.getByTestId('industry-input').querySelector('input').value).toEqual(industries[1].id.toString());
})

describe('form validation', () => {
    beforeEach(() => {
        render(<MockComponent component={<BusinessInformationStep />} />);
    })

    test('business input field validation', () => {
        const businessInput = screen.getByTestId('business-input').querySelector('input');

        fireEvent.click(screen.getByText('Next'));

        expect(screen.getByText('No business name specified. No contact email specified')).toBeInTheDocument();

        fireEvent.change(businessInput, { target: { value: 'Test Business' } });
        fireEvent.focusOut(businessInput); // have to focus out because state change happens onBlur
        fireEvent.click(screen.getByText('Next'));

        expect(screen.getByText('No contact email specified')).toBeInTheDocument();
    })

    test('email input field validation', () => {
        const emailInput = screen.getByTestId('email-input').querySelector('input');

        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
        fireEvent.focusOut(emailInput); // have to focus out because state change happens onBlur
        fireEvent.click(screen.getByText('Next'));

        expect(screen.queryByText('No contact email specified')).toBeNull();
    })
})