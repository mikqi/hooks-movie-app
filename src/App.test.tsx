import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup, act, wait } from '@testing-library/react'
import React from 'react'
import axios from 'axios'
import App from './App'
import { AppProvider } from './store/AppContext'
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from './__mocks__/response'

jest.mock('axios', () => ({
  get: jest.fn()
}))

global.open = jest.fn()

afterEach(cleanup)

it('renders without crashing', async () => {
  axios.get = jest
    .fn()
    .mockResolvedValueOnce({ data: SUCCESS_RESPONSE })
    .mockResolvedValueOnce({ data: ERROR_RESPONSE })
    .mockRejectedValueOnce({ data: ERROR_RESPONSE })
    .mockResolvedValueOnce({ data: SUCCESS_RESPONSE })

  const { getByText, findByTestId, getByTestId, queryAllByTestId, findAllByTestId } = render(
    <AppProvider>
      <App />
    </AppProvider>
  )

  // SHOULD SHOW LOADING COMPONENT WHEN FETCHING
  const loadingComponent = queryAllByTestId('movie-loading')
  expect(loadingComponent[0]).toBeInTheDocument()

  // WHEN FIRST INIT SHOULD FETCH MOVIE DATA
  const listMovie = await findAllByTestId('movie-list')
  expect(listMovie.length).toEqual(SUCCESS_RESPONSE.Search.length)

  const searchInput = getByTestId('movie-search-input')
  const searchButton = getByTestId('movie-search-button')

  fireEvent.change(searchInput, { target: { value: 'mamam' } })
  fireEvent.click(searchButton)
  await wait()

  const movieError = await findByTestId('movie-error')
  expect(movieError).toBeInTheDocument()
  expect(getByTestId('movie-search-input').value).toEqual('')

  fireEvent.click(searchButton)
  await wait()

  expect(getByText(/Something went wrong/)).toBeInTheDocument()

  fireEvent.change(searchInput, { target: { value: 'spiderman' } })
  act(() => {
    fireEvent.click(searchButton)
  })
  expect(axios.get).toHaveBeenLastCalledWith('https://www.omdbapi.com/?s=spiderman&apikey=4a3b711b')

  const newListMovie = await findAllByTestId('movie-list')
  expect(newListMovie.length).toEqual(SUCCESS_RESPONSE.Search.length)
  fireEvent.click(newListMovie[0])
  expect(global.open).toBeCalled()
})
