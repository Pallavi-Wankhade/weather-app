/* eslint-disable react/no-unknown-property */
import WeatherInfo from "../weatherInfo/WeatherInfo";
import styles from "./Weather.module.css";
import { useState, useEffect } from "react";

const Weather = () => {
  const [details, setDetails] = useState({});
  const [city, setCity] = useState("");
  const [inputCity, setinputCity] = useState("Mumbai");
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getLiveLocation();
    getWeatherDetails();
  }, [inputCity]);

  const getLiveLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1fbb906b3e4044c3fd9bce70f517adf5`
      )
        .then((response) => response.json())
        .then((data) => {
          setDetails(data);
        });
    });
  };

  const getWeatherDetails = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=1fbb906b3e4044c3fd9bce70f517adf5`
    )
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        // console.log(data);
        if (data.cod && data.cod === "404") {
          setIsError("Invalid city name!!");
        }
      })
      .catch((error) => {
        console.log(error, "City not found!!!");
      });
  };

  const inputChangeHandler = (value) => {
    setCity(value);
  };

  const searchHandler = () => {
    setIsError(null);
    setinputCity(city);
    if (inputCity.trim()) {
      getWeatherDetails();
    }
  };
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  //Date
  let d = new Date();
  let day = d.toLocaleString("default", { weekday: "short" });
  let date = d.getDate();
  let month = d.toLocaleString("default", { month: "short" });
  let year = d.getFullYear();

  return (
    <>
      <div className={styles.main}>
        <p className={styles.para}>
          {day}, {date}th {month} {year}
        </p>
        <div className="m-2">
          <input
            type="text"
            className={styles.inp}
            placeholder="    Enter city name"
            onChange={(e) => inputChangeHandler(e.target.value)}
            onKeyUp={keyHandler}
          />
          <button
            type="button"
            className={styles.btn}
            onClick={() => searchHandler()}
            disabled={!inputCity}
          >
            Search
          </button>
        </div>
        <div>
          <img src="./src/Images/logo.png" height="100" width="100" />
        </div>
        <div>
          <p className="text-info  fs-5 fw-bolder">{isError}</p>
        </div>
        <div>
          <WeatherInfo
            city={details.name}
            temperature={
              details.main && (details.main.temp - 273.15).toFixed(2)
            }
            tempMax={
              details.main && (details.main.temp_max - 273.15).toFixed(2)
            }
            tempMin={
              details.main && (details.main.temp_min - 273.15).toFixed(2)
            }
            humidity={details.main && details.main.humidity}
            speed={details.wind && details.wind.speed}
            desc={details.weather && details.weather[0].description}
          />
        </div>
      </div>
    </>
  );
};

export default Weather;
