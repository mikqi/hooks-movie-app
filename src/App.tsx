import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContext } from './store/AppContext'
import { MovieResponse } from './store/reducer'
import Header from './components/Header'
import CardMovie from './components/CardMovie'
import Search from './components/Search'
import Shimmer from './components/Shimmer'
import WrongImage from './wrong.svg'
import './App.css'

const GET_MOVIE_API_URL = (query: string = 'man') =>
  `https://www.omdbapi.com/?s=${query}&apikey=4a3b711b`

const App: React.FC = () => {
  const { dispatch, movies, loading, error } = useContext(AppContext)

  const fetchData = async (query?: string) => {
    dispatch({
      type: 'SEARCH_MOVIE'
    })
    try {
      const { data }: { data: MovieResponse } = await axios.get(GET_MOVIE_API_URL(query))
      if (data.Response === 'True') {
        return dispatch({
          type: 'SET_MOVIE',
          payload: data.Search
        })
      }

      dispatch({ type: 'SEARCH_MOVIE_ERROR' })
    } catch (error) {
      dispatch({
        type: 'SEARCH_MOVIE_ERROR'
      })
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (query: string) => {
    fetchData(query)
  }

  const LoadingComponent = () => (
    <>
      {Array(10)
        .fill('')
        .map((_, i) => (
          <div
            data-testid="movie-loading"
            key={i}
            style={{
              marginBottom: 18,
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Shimmer width={245} height={390} style={{ marginBottom: 6 }} />
            <Shimmer width={145} height={10} style={{ marginBottom: 6 }} />
            <Shimmer width={70} height={10} />
          </div>
        ))}
    </>
  )

  const ErrorIllust = () => (
    <div
      data-testid="movie-error"
      style={{
        marginTop: 28,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <img src={WrongImage} width="600" alt="Something went wrong" />
      <h1>Something went wrong</h1>
    </div>
  )

  return (
    <>
      <Header />
      <Search onSubmit={handleSubmit} placeholder="Search your movies..." />
      {error ? (
        <ErrorIllust />
      ) : (
        <div data-testid="movie-container" className="movie-list__container">
          {loading ? (
            <LoadingComponent />
          ) : (
            movies.map(movie => <CardMovie movie={movie} key={movie.imdbID} />)
          )}
        </div>
      )}
    </>
  )
}

export default App
