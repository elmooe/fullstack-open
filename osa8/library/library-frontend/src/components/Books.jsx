import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import PropTypes from 'prop-types'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    skip: !props.show
  })

  const { loading: filterLoading, error: filterError, data: filteredData } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !props.show || !selectedGenre
  })

  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data || !data.allBooks) return <p>No data available</p>

  const books = selectedGenre && filteredData ? filteredData.allBooks : data.allBooks

  const allGenres = [...new Set(data.allBooks.flatMap(book => book.genres || []))]

  if (filterLoading) return <p>Loading filtered books...</p>
  if (filterError) return <p>Filter error: {filterError.message}</p>

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? <p>in genre <strong>{selectedGenre}</strong></p> : <p>all genres</p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author?.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {allGenres.map(genre => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>
        all genres
      </button>
      </div>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books
