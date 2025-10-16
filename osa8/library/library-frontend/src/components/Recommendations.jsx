import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import PropTypes from 'prop-types'

const Recommendations = ({ show }) => {
  const { loading, error, data } = useQuery(ME, {
    skip: !show
  })

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    skip: !show || !data?.me?.favoriteGenre,
    variables: { genre: data?.me?.favoriteGenre }
  })

  const books = booksData?.allBooks || []

  if (!show) {
    return null
  }

  if (loading || booksLoading) return <p>Loading...</p>
  if (error || booksError) return <p>Error: {error?.message || booksError?.message}</p>
  if (!data || !data.me) return <p>No data available</p>

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre: <strong>{data.me.favoriteGenre}</strong></p>
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
    </div>
  )
}

Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Recommendations