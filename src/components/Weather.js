import React, { useEffect, useState } from 'react'
import axios from 'axios';
import background from '../assets/images/background.png';
import cloudy from '../assets/images/cloudy.png';

export default function Weather() {
  const [weather, setWeather] = useState({ cloudPct: '', Humidity: '', temperature: '', feelsLike: '', minTemp: '', maxTemp: '' });
  const [error, setError] = useState(false);
  const [tempLocation, settempLocation] = useState('Lahore'); // this is the location that updates while user inputs
  const [location, setLocation] = useState('Lahore');
  const [date, setDate] = useState('Day');
  const getWeather = async () => {
    axios({
      url: `https://api.api-ninjas.com/v1/weather?city=${location}`,
      method: 'GET',
      headers: {
        'X-Api-Key': 'fIPnPSMBFoybunPrZ6arNPOAWqvw0J1kqmZBDuPR',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeather(prevWeather => ({ cloudPct: response.data.cloud_pct, Humidity: response.data.humidity, temperature: response.data.temp, feelsLike: response.data.feels_like, minTemp: response.data.min_temp, maxTemp: response.data.max_temp }));
        console.log(response.data);
        setError(false);
      })
      .catch(error => {
        console.error(error);
      })

    //set Day and Date
    let date = new Date();
    date = date.toDateString();
    const dateDay = date.substring(0, date.length - 4);
    setDate(dateDay);
  }

  const changeLocation = (event) => {
    setLocation(tempLocation);
  }

  const modifyLocation = (event) => {
    settempLocation(event.target.value);
  }
  useEffect(() => {
    getWeather()
  }, [location])

  return (
    <div id="popup" style={{ backgroundImage: `url(${background})` }}>
      <div>
        <input id="area" type="text" value={tempLocation} onChange={modifyLocation} />
        <button id="refresh" onClick={changeLocation}><i className="bi bi-arrow-clockwise" ></i></button>
      </div>

      <div id="weather-info">
        <div id="temperature-Head">
          <img src={cloudy} alt="weather" />
          <div id="temperature">{weather.temperature}°</div>
          <div>{location}</div>
          </div>
        <div id="temperature-description">
        <div id="hi-low" >Hi:{weather.maxTemp}  Low:{weather.minTemp}</div>
        <div id="date">{date}</div>
        </div>
      </div>

      {/* <div>cloud %: {weather.cloudPct}</div>
      <div>Humidity: {weather.Humidity}</div>
      <div>temperature: {weather.temperature}</div>
      <div>feelsLike: {weather.feelsLike}</div> */}
    </div>
  )
}