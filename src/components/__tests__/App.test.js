import { render, screen, within } from '@testing-library/react'
import App from '../App'
import MockComponent from '../MockComponent'

test('renders the app header', () => {
    render(<MockComponent component={<App />} />);

    const header = screen.getByTestId('header');

    expect(header).toHaveTextContent('Coterie - Coverage')
})

test('initially renders business info component', () => {
    render(<MockComponent component={<App />} />);

    const main = screen.getByTestId('main');
    const businessInfoComponent = within(main).getByTestId('business-info-component');

    expect(businessInfoComponent).toBeInTheDocument();
})