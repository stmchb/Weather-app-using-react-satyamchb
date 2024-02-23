import React, { useState, useEffect } from "react";
import './weather.css';
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from './Search';

function App() {
  const [city, setCity] = useState("Renukoot");
  const [weatherData, setWeatherData] = useState({
    message: "Please enter the city to know the weather data.",
  });

  const api_key = "3e1ef026702d982355c742221fab14ba";

  useEffect(() => {
    const fetchData = async () => {
      if (!city) {
        setWeatherData({
          message: "Please enter a valid city to know the weather data.",
        });
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData(data);
    };

    fetchData();
  }, [city]);

  const handleClick = async (searchCity) => {
    setCity(searchCity);
  };


  return (
    <>
      <SearchBox handleClick={handleClick} />
      {weatherData.message ? (
        <div className="message">{weatherData.message}</div>
      ) : (
        <div style={{width:"300px"}}>
          <div className="card p-4">
            <div className="d-flex">
              <h6 className="flex-grow-1">{weatherData.name}</h6>
              <h6>{new Date().toTimeString().split(" ")[0]}(</h6>
            </div>
            <div className="d-flex flex-column temp mt-5 mb-3">
              <h1 className="mb-0 font-weight-bold" id="heading">{Math.floor(weatherData?.main?.temp)}&deg; C</h1>
              <span className="small grey">{weatherData?.weather?.[0]?.description}</span>
            </div>
            <div className="d-flex">
              <div className="temp-details flex-grow-1">
                <p className="my-1">
                  <img src="https://i.imgur.com/B9kqOzp.png" height="17px" />
                  <span> {weatherData?.wind?.speed} km/h </span>
                </p>

                <p className="my-1">
                  <i className="fa fa-tint mr-2" aria-hidden="true"></i>
                  <span>{weatherData?.main?.humidity}%</span>
                </p>

                <p className="my-1">
                  <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" />
                  <span>{weatherData?.main?.temp}</span>
                </p>
              </div>

              <div>
                {weatherData?.weather?.[0]?.icon && (
                  <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} width="100px" alt={weatherData.weather[0].description} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
