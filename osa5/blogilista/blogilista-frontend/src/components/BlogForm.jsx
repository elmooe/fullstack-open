import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          value={newBlog.title}
          onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          value={newBlog.author}
          onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          id="url"
          value={newBlog.url}
          onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
          name="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm