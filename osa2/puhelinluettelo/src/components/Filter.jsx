import React from 'react'

export default function Filter({ filter, handleFilter }) {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}