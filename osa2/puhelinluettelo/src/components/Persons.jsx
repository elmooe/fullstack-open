import React from "react"

export default function Persons({ filteredPhonebook, deletePerson }) {
    return (
        <div>
        {filteredPhonebook.map((person, i) =>
            <p key={i}>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </p>
        )}
        </div>
    )
}