import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const EditAuthor = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: Number(born) } })

    setSelectedAuthor(null)
    setBorn('')
  }

  if (loading) return <p>Loading authors...</p>
  if (error) return <p>Error loading authors: {error.message}</p>

  const authorOptions = data.allAuthors.map(author => ({
    value: author.name,
    label: `${author.name}`
  }))

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
            placeholder="Select author"
          />
        <div>
          <label>Birth year:</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            placeholder="Enter birth year"
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor