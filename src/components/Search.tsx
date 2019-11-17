import React, { FormEvent, useState } from 'react'

const Search = ({
  onSubmit,
  placeholder
}: {
  onSubmit: (query: string) => void
  placeholder: string
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setQuery('')
    onSubmit(query)
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="movie-search-input"
          type="text"
          onChange={(e: any) => setQuery(e.target.value)}
          value={query}
          placeholder={placeholder}
        />
        <button data-testid="movie-search-button">Search</button>
      </form>
    </div>
  )
}

export default Search
