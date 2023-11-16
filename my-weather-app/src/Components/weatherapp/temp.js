// https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=4332719636c15ed6af309c6b7b39bd6a 
import React, { useEffect, useState } from 'react';
import Weathercard from './weathercard';
import './style.css';
const Temp = () => {

  const [searchValue, setSearchValue] = useState("Kolkata");
  const [tempInfo, setTempInfo] = useState({});
 
  const getWeatherInfo = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4332719636c15ed6af309c6b7b39bd6a`;
      
      const res = await fetch(url);
      const data = await res.json();

      const  { temp, humidity, pressure } = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp, 
        humidity, 
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset, 
      };     

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
    {/* Search option  */}
      <div className="wrap">
        <div className="search">
            <input type="text" 
            placeholder="Search here..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />

            <button 
                className="searchButton" 
                type="button" 
                onClick={getWeatherInfo}>
                Search
            </button>
        </div>
      </div>

      {/* Temp card  */}
      <Weathercard {...tempInfo}/>
        
    </>
  )
}

export default Temp;
