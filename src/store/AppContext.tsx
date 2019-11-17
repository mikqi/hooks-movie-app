import React, { useReducer, createContext, FunctionComponent } from 'react'
import { MovieReducer, MoviesState, SEARCH_MOVIE_ACTION } from './reducer'

const INITIAL_STATE: MoviesState = {
  loading: false,
  movies: [],
  error: false
}
const AppContext = createContext<
  typeof INITIAL_STATE & {
    dispatch: (action: SEARCH_MOVIE_ACTION) => void
  }
>({
  ...INITIAL_STATE,
  dispatch: () => {}
})
const { Consumer, Provider } = AppContext

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE)
  return (
    <Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </Provider>
  )
}

export { AppProvider, Consumer as AppConsumer, AppContext }
