export interface Movie {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export interface MovieResponse {
  Response: string
  totalResults: string
  Search: Movie[]
}

export interface MoviesState {
  loading: boolean
  movies: Movie[]
  error: boolean
}

export type SEARCH_MOVIE_ACTION =
  | { type: 'SEARCH_MOVIE' }
  | { type: 'SET_MOVIE'; payload: Movie[] }
  | { type: 'SEARCH_MOVIE_ERROR' }

export const MovieReducer = (state: MoviesState, action: SEARCH_MOVIE_ACTION) => {
  switch (action.type) {
    case 'SEARCH_MOVIE':
      return { ...state, loading: true }
    case 'SET_MOVIE':
      return { ...state, movies: action.payload, error: false, loading: false }
    case 'SEARCH_MOVIE_ERROR':
      return { ...state, error: true }
    default:
      throw new Error('Unexpected Action')
  }
}
