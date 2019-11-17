import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

it('renders without crashing', () => {
  const { queryByText } = render(<App />)
  expect(queryByText(/save to reload/)).toBeInTheDocument()
})
