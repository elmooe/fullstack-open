const Total = (props) => {
    return (
      <strong>
        Total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </strong>
    )
}

export default Total