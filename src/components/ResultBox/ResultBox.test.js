import { render,screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57'},
            { amount: '20', from: 'PLN', to: 'USD', expected: 'PLN 20.00 = $5.71'},
            { amount: '200', from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14'},
            { amount: '345', from: 'PLN', to: 'USD', expected: 'PLN 345.00 = $98.57'},
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.expected);
            cleanup();
        };
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN', expected: '$100.00 = PLN 350.00'},
            { amount: '20', from: 'USD', to: 'PLN', expected: '$20.00 = PLN 70.00'},
            { amount: '200', from: 'USD', to: 'PLN', expected: '$200.00 = PLN 700.00'},
            { amount: '345', from: 'USD', to: 'PLN', expected: '$345.00 = PLN 1,207.50'},
        ];
        
        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.expected);
            cleanup();
        };
    });
    it('should render proper info when from and to currencies are the same', () => {
        const testCases = [
            { amount: '123', from: 'PLN', to: 'PLN', expected: 'PLN 123.00 = PLN 123.00' },
            { amount: '45', from: 'PLN', to: 'PLN', expected: 'PLN 45.00 = PLN 45.00' },
            { amount: '80', from: 'USD', to: 'USD', expected: '$80.00 = $80.00' },
            { amount: '300', from: 'USD', to: 'USD', expected: '$300.00 = $300.00' },
        ];

        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.expected);
            cleanup();
        }
    });
    it('should return Wrong value when amount is <0', () => {
        render(<ResultBox from="PLN" to="USD" amount={-10} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value');
    });
});