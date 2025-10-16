export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    if (!Array.isArray(a)) return []
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  try {
    cache.updateQuery({ query, variables: {} }, (data) => {
      if (!data || !data.allBooks) {
        return data
      }
      return {
        allBooks: uniqByTitle(data.allBooks.concat(addedBook)),
      }
    })
  } catch (error) {
    console.log('Cache update failed:', error)
  }
}