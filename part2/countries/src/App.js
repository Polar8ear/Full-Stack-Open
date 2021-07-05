import React, { useState, useEffect } from 'react';
import axios from "axios";

const Input = ({text,inputVariable,handleChange}) =>{
  return(
    <div>
      {text}<input value={inputVariable} onChange={handleChange}></input>
    </div>
  )
}

const Countries = ({countriesToShow,handleClick,weather}) =>{
  if(countriesToShow.length===1){
    const countryToShow=countriesToShow[0]
    return(
      <div>
        <Details countryToShow={countryToShow}/>
        <Weather cityToShow={countryToShow.capital} weather={weather}/>
      </div>
      )
  }

  else if (countriesToShow.length<=10){
    return(
      countriesToShow.map((country,index)=><Country key={country.alpha2Code}  index={index} country={country} handleClick={handleClick}/>)
    )
  } 

  return(
    <div>Too many mathces, please specify another filter</div>
  )
}

const Country = ({country,index,handleClick}) =>{ 
  return(
    <div>
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

const Weather = ({cityToShow,weather}) =>{
  if(weather!==null){
    console.log(weather);
    return(
      <div>
        <h2>Weather in {cityToShow}</h2>
        <p><b>Temperature:{weather.current.temperature}°C</b>{}</p>
        <img src={weather.current.weather_icons[0]} alt={`Weather icon for ${cityToShow}`} />
        <p><b>Wind:</b>{weather.current.wind_speed}mph</p>
      </div>
    )
  }
  return(null) 
}

function App() {
  const [filter,setFilter] = useState("mala")
  const [countries,setCountries] = useState([])
  const [countriesToShow,setCountriesToShow] = useState([]) 
  const [weather,setWeather] = useState(null) 


  useEffect(()=>{
    axios.get("https://restcountries.eu/rest/v2/all")
         .then(response=>{
          setCountries(response.data)
         })
  },[])

  const capital = (countriesToShow.length===1)?countriesToShow[0].capital:null

  useEffect(()=>{
    const api_key = process.env.REACT_APP_API_KEY
    if(capital){
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital.replace(" ","%20")}`)
            .then(response=>{
              setWeather(response.data)
            })
    }
  },[capital])

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
    setCountriesToShow(copyCountriesToShow)
  }


  return (
    <div>
      <Input text="Find countries" inputVariable={filter} handleChange={handleFilterChange}/>

      <Countries countriesToShow={countriesToShow} handleClick={toggleShow} weather={weather}/>
    </div>
  );
}

export default App;
