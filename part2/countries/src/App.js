import React, { useState, useEffect } from 'react';
import axios from "axios";

const Input = ({text,inputVariable,handleChange}) =>{
  return(
    <div>
      {text}<input value={inputVariable} onChange={handleChange}></input>
    </div>
  )
}

const Countries = ({countriesToShow,handleClick}) =>{

  

  if(countriesToShow.length===1){
    const countryToShow=countriesToShow[0]
    return(<Details countryToShow={countryToShow}/>)
  }

  else if (countriesToShow.length<=10){
    return(
      countriesToShow.map((country,index)=><Country key={country.alpha2code} index={index} country={country} handleClick={handleClick}/>)
    )
  } 

  return(
    <div>Too many mathces, please specify another filter</div>
  )
}

const Country = ({country,index,handleClick}) =>{ 
  return(
    <div >
      <p>{country.name}</p>
      <button onClick={handleClick} id={index}>{country.show?"Close":"Show"}</button>    
      {country.show?<Details countryToShow={country}/>:null}
    </div>
  )
}

const Details = ({countryToShow}) =>{
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

function App() {
  const [filter,setFilter] = useState("mala")
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
    const copyCountriesToShow = 
      countries.filter((country)=>country.name.toUpperCase().includes(filter.toUpperCase() ) )
               .map((countryToShow)=>{
                  countryToShow.show=false
                  return(countryToShow)
               })
    setCountriesToShow(copyCountriesToShow)
  }
  
  const toggleShow = (e) =>{
    e.preventDefault()
    
    const copyCountriesToShow = [...countriesToShow]
    copyCountriesToShow[e.target.id].show=!countriesToShow[e.target.id].show
    console.log(e.target.id,copyCountriesToShow[e.target.id].show);
    setCountriesToShow(copyCountriesToShow)
    console.log(e.target.id,countriesToShow[e.target.id].show);

  }


  return (
    <div>
      <Input text="Find countries" inputVariable={filter} handleChange={handleFilterChange}/>

      <Countries countriesToShow={countriesToShow} handleClick={toggleShow}/>
    </div>
  );
}

export default App;
