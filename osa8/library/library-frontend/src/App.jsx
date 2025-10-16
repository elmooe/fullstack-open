import { useState } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import EditAuthor from "./components/EditAuthor"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { BOOK_ADDED, ALL_BOOKS } from "./queries"
import { updateCache } from "./utils/updateCache"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage("authors")
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book added to the library: ${addedBook.title} by ${addedBook.author.name}`)

      updateCache(client.cache, ALL_BOOKS, addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommend"} />
      {token && <EditAuthor />}
    </div>
  );
};

export default App