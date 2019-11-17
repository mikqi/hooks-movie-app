import React from 'react'
import { Movie } from '../store/reducer'

const DEFAULT_PLACEHOLDER_IMAGE = 'http://www.movienewz.com/img/films/poster-holder.jpg'

const CardMovie = ({ movie }: { movie: Movie }) => {
  const handleClick = () => {
    window.open(`https://imdb.com/title/${movie.imdbID}`, '_blank')
  }

  return (
    <div onClick={handleClick} className="movie-list__item" key={movie.imdbID}>
      <img
        src={movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster}
        alt={movie.Title}
      />
      <p className="movie-list__item-title">{movie.Title}</p>
      <p className="movie-list__item-year">{movie.Year}</p>
    </div>
  )
}

export default CardMovie
