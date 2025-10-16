import React from "react"
import Part from "./Part"

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) =>
                <div key={part.id}>
                    <Part name={part.name} exercises={part.exercises} />
                </div>
            )}
        </>
    )
}

export default Content