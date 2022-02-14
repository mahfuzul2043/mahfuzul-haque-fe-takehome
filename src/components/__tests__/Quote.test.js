import { render, screen, waitFor } from "@testing-library/react"
import MockComponent from "../MockComponent"
import Quote from '../Quote';

describe('Quote component', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                "application": {
                    "applicationId": "7b700e0d-2d03-4cd6-af3d-e8f45d593dd2",
                    "isArchived": false,
                    "status": "FailedExtendedValidation",
                    "businessName": "Test Business",
                    "numEmployees": 23,
                    "industryId": 10391,
                    "akHash": "",
                    "annualPayroll": 50000.0,
                    "grossAnnualSales": 200000.0,
                    "contactEmail": "test@gmail.com",
                    "premierPlatformDiscount": false,
                    "applicationUrl": "https://quote-sandbox.coterieinsurance.com/application/7b700e0d-2d03-4cd6-af3d-e8f45d593dd2",
                    "locations": [
                        {
                            "zip": "48212",
                            "isPrimaryLocation": true,
                            "hasSprinklers": false
                        }
                    ]
                },
                "partner": {
                    "id": "73920c6f-d530-419c-87b3-4f4762e05e9d",
                    "name": "Frontend Take Home Project",
                    "premierPlatform": false
                },
                "availablePolicyTypes": [
                    "GL",
                    "BOP"
                ],
                "isSuccess": true
            })
        })
    })

    test('initial loading progress for api call', async () => {
        render(<MockComponent component={<Quote />} />)
        expect(screen.getByTestId('circular-progress')).toBeInTheDocument();

        // after api call completes
        await waitFor(() => {
            expect(screen.queryByTestId('circular-progress')).toBeNull();
        })
    })

    test('form fields properly populated', async () => {
        render(<MockComponent component={<Quote />} />);

        await waitFor(() => {
            expect(screen.getByText('Business Name:').nextSibling).toHaveTextContent('Test Business')
            expect(screen.getByText('Number of Employees:').nextSibling).toHaveTextContent('23')
            expect(screen.getByText('Industry:').nextSibling).toHaveTextContent('Software Developer')
            expect(screen.getByText('Annual Payroll:').nextSibling).toHaveTextContent('$50,000.00')
            expect(screen.getByText('Gross Annual Sales:').nextSibling).toHaveTextContent('$200,000.00')
            expect(screen.getByText('Contact Email:').nextSibling).toHaveTextContent('test@gmail.com')
            expect(screen.getByText('Application URL:').nextSibling).toHaveTextContent('Click Here')
            expect(screen.getByText('Application URL:').nextSibling).toHaveAttribute('href', 'https://quote-sandbox.coterieinsurance.com/application/7b700e0d-2d03-4cd6-af3d-e8f45d593dd2')
            expect(screen.getByText('Zip Code:').nextSibling).toHaveTextContent('48212')
            expect(screen.getByText('Available Policy Types:').nextSibling).toHaveTextContent('GL, BOP')
        })
    })
})