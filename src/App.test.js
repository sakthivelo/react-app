import { render, screen } from '@testing-library/react';
import App from './App';

test('Table title', () => {
  render(<App />);
  const linkElement = screen.getByText(/React Table with Single\/ Multiple selection/i);
  expect(linkElement).toBeInTheDocument();
});
