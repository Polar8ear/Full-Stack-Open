import React from 'react'
import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const searchedText = event.target.value
    dispatch(newFilter(searchedText))
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

export default Filter