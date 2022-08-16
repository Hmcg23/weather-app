import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import Map from './components/Map';
import MainData from './components/MainData';
import cities from 'cities.json';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import UpcomingForecasts from './components/UpcomingForecasts';

function App() {

  const apiKey = "ac2bee7b7a1e7d98c8132927d1c4cccb";

  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('imperial')
  const [selectedCityData, setSelectedCityData] = useState('');
  const [clock, setClock] = useState('');
  const [currentDate, setCurrentDate] = useState('');



  useEffect(() => {
    setInterval(() => {
    const date = new Date();
      setClock(date.toLocaleTimeString());
      setCurrentDate(date.toLocaleDateString());
    }, 1000)


    const fetchData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`)
      if (!response.ok) {
        throw new Error('Data coud not be fetched!');
      } else {
        return response.json();
      }
    }

    fetchData()
    .then(data => {
      setSelectedCityData(data);
      console.log(data);
    })
    .catch(error => {
      console.log("There was an error with your request");
    })
  }, [city, units]);


  return (
    <div className="App">
      <header>
        <WbTwilightRoundedIcon className="weatherIcon"/>
        <div className="headerText">
          <h1>SolarWeather</h1>
          <p>Find what you need about any city</p>     
        </div>
          <h1 className="clock">{clock}</h1>
          <h2 className="currentDate">{currentDate}</h2>
      </header>
      <button onClick={() => {
        units === 'imperial' ? setUnits('metric') : setUnits('imperial')
      }}><h1>C | F</h1>
      </button>
      <SearchBar placeholder="London, GB" cityData={cities} />
      <div className="components">
        <Favorites />
        <UpcomingForecasts selectedCityData={selectedCityData}/>
        <MainData selectedCityData={selectedCityData} units={units}/>
        <Map selectedCityData={selectedCityData} />
      </div>

    </div>
  );
}

export default App;
