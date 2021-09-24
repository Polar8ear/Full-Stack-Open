import React from 'react'
import { connect } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const searchedText = event.target.value
    props.newFilter(searchedText)
  }

  const style = {
    marginBottom: 10
  }

  return(
    <div style={style}>
      <label htmlFor="filter">
        Filter:
        <input type="text" name="filter" id="filter" onChange={handleChange}/>
      </label>
    </div>
  )
}


const connectedFilter = connect(null,{ newFilter })(Filter)

export default connectedFilter