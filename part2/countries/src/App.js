import React, { useState, useEffect } from 'react';
import axios from "axios";

const Input = ({text,filter: inputVariable,handleChange}) =>{
  return(
    <div>
      {text}<input value={inputVariable} onChange={handleChange}></input>
    </div>
  )
}

const Details = ({countriesToShow}) =>{
  
  if(countriesToShow.length===1){
    const countryToShow=countriesToShow[0]
    return(
      <div>
        <h2>{countryToShow.name}</h2>
        <p>Capital: {countryToShow.capital}</p>
        <p>Population: {countryToShow.population}</p>

        <h2>Languages</h2>
        <ul>{countryToShow.languages.map((language)=><li key={language.iso639_2}>{language.name}</li>)}</ul>

        <img src={countryToShow.flag} alt={`Flag of ${countryToShow.name}`} height="100"/>
      </div>
    )
  }
  else if (countriesToShow.length<=10){
    return(
      countriesToShow.map((country)=><div key={country.name}>{country.name}</div>)
    )
  } 
  return(
    <div>Too many mathces, please specify another filter</div>
  )
}

function App() {
  const [filter,setFilter] = useState("")
  const [countries,setCountries] = useState([])
  const [countriesToShow,setCountriesToShow] = useState([])


  useEffect(()=>{
    console.log("Accesing the website again")
    axios.get("https://restcountries.eu/rest/v2/all")
         .then(response=>{
          setCountries(response.data)
         })
  },[])

  const handleFilterChange = (event) =>{
    const val = event.target.value
    setFilter(val)
    setCountriesToShow(countries.filter((country)=>country.name.toUpperCase().includes(filter.toUpperCase())))
  }

  return (
    <div>
      <Input text="Find countries" inputVariable={filter} handleChange={handleFilterChange}/>

      <Details countriesToShow={countriesToShow}/>
    </div>
  );
}

export default App;
