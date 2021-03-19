import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {

  const params = {
    access_key: 'b97d96915db242ac5c89b5c40bf8f86c',
    query: country.name
  }
  const [weather, setWeather] = useState([''])
  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
          if(response.data.current != null) {
            setWeather(response.data.current)
          } else {
            setWeather('');
      }
    })  
  }, [])
  


  return (
    <>
      <h2>Weather in {country.name} </h2>
      <b>Temperature: </b> <p>{weather.temperature} Celcius </p>
      <img src = {weather.weather_icons} alt = 'weather related image' />
      <p>Wind {Weather.wind_speed} mph direction {weather.wind_degree} </p>
    </>
  )
}

const CountryLanguages = ({language}) => {

  return (
    <>  
      <li> {language} </li>
    </>
  )
}
const View =  ({country}) => {

  console.log(country);
  const listItems = country.languages.map ((country, i) =>
      <CountryLanguages key = {i} language = {country.name} /> 
  )
  return (
    <div>
      <h2> {country.name} </h2>
      <p> Capital {country.capital}  </p>
      <p> Population {country.population} </p>
      <h2> Languages </h2>
      <ul>  
        {listItems}
      </ul>
      <img src = {country.flag} alt = "Flag"  width = "150" height = "150"/ >
      <div>
        <Weather country = {country}/>
      </div>
    </div>
  )
}
const Country = ({country}) => {

  const [listItems , setListItems] = useState('')

  const showView = (event) => {
    event.preventDefault()
    setListItems(<View country = {country} />)
  }
  return (
    <> 
      <li>{country.name} <button onClick = {showView} > Show </button></li> 
      <ul>
        {listItems}
      </ul>
    </>
  )
}

const Search = ({countries}) => {

  if(countries.length > 10) {
    return (
      <>
        <p> Too many matches, specify another filter.</p>
      </> 
    )
  } else if(countries.length > 1 && countries.length < 10) {

    console.log(countries);
    const listItems = countries.map((country, i) => 
        <Country key = {i} country = {country} />
    )
    return (
      <>
        <ul>
          {listItems}
        </ul>
      </> 
    )
  } else if(countries.length === 1) {
      console.log(countries);
      const country = countries[0];
      
      return (
        <>
          <View country = {country} />
        </>
      )
  } else {
    return (
      <>
      </>
    )
  }

  
}
const Filter = () => {

  const [searchTerm, setSearchTerm] = useState('')  
  const [countries, setCountries] = useState([])
    
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])


  const edtSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const dynamicSearch = () => {
    return countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))  
  }

  return (
    <>  
      Find Countries <input value = {searchTerm} onChange = {edtSearchTerm} />
      <Search countries = {dynamicSearch()} />
    </>
  )
}
const App = () => {


  return (
    <>
      <Filter />

    </>
  )
}

export default App;
