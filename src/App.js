import "./App.css";
import { useEffect, useState } from "react";
import pic2 from "./pic2.jpg";

function App() {
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState([
    { day: "Thur", temp: 22, icon: "❄️" },
    { day: "Fri", temp: 32, icon: "🌞" },
    { day: "Sat", temp: 42, icon: "🌈" },
    { day: "Sun", temp: 52, icon: "🌧" },
    { day: "Mon", temp: 62, icon: "☀️" },
    { day: "Tu", temp: 62, icon: "☀️" },
  ]);
  // Use Daily Weather API to put correct info here OR in setForecastData??
  useEffect(() => {
    const makeAPICalls = async () => {
      const geocodingResponse = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=Fayetteville,NY,US&limit=5&appid=d09e6534b29409edaff3849a14709277"
      );
      const geocodingData = await geocodingResponse.json();
      const lat = geocodingData[0].lat;
      const lon = geocodingData[0].lon;
      // both lat and lon are the first data items that show up
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d09e6534b29409edaff3849a14709277&units=imperial`
      );
      console.log(currentWeatherResponse);
      const currentWeatherData = await currentWeatherResponse.json();
      setWeatherData({
        temp: Math.round(currentWeatherData.main.temp),
        humidity: currentWeatherData.main.humidity,
        iconCode: currentWeatherData.weather[0].icon,
        currentCondition: currentWeatherData.weather[0].main,
      });

      const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d09e6534b29409edaff3849a14709277&units=imperial`
      );

      const forecastData = await forecastResponse.json();
      console.log(forecastData);
      setForecastData([
        {
          day: days[new Date(forecastData.list[0].dt_txt).getDay()],
          temp: Math.floor(forecastData.list[0].main.temp),
          icon: forecastData.list[0].weather[0].icon,
        },
        {
          day: days[new Date(forecastData.list[8].dt_txt).getDay()],
          temp: Math.floor(forecastData.list[8].main.temp),
          icon: forecastData.list[8].weather[0].icon,
        },
        {
          day: days[new Date(forecastData.list[16].dt_txt).getDay()],
          temp: Math.floor(forecastData.list[16].main.temp),
          icon: forecastData.list[16].weather[0].icon,
        },
        {
          day: days[new Date(forecastData.list[24].dt_txt).getDay()],
          temp: Math.floor(forecastData.list[24].main.temp),
          icon: forecastData.list[24].weather[0].icon,
        },
        {
          day: days[new Date(forecastData.list[32].dt_txt).getDay()],
          temp: Math.floor(forecastData.list[32].main.temp),
          icon: forecastData.list[32].weather[0].icon,
        },

        //  put in the days of the week and reference to indices
      ]);
      //use the setForecastData function using the use state format above to set...
      //...in the forecast data from the API response

      //make another API call using OpenWeatherMap Daily Forecast API
      //parse the JSON
      //console.log the data to see the strucuture of the data
      //use the setForecastData function using the use state format above to set...
      //...in the forecast data from the API response
    };
    makeAPICalls();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-2 text-center" id="weatherIcon">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`}
            />
          </div>
          <div className="col-2">
            <div id="currentTemp">{weatherData.temp}</div>
            <div>°F | °C</div>
          </div>
          <div className="col-4">
            Precipitation: 55%
            <br />
            Humidity: {weatherData.humidity}%
            <br />
            Wind: 10 mph
          </div>
          <div className="col-4 text-end">
            Fayetteville, NY 13066
            <br />
            {new Date().toLocaleTimeString()}
            <br />
            {weatherData.currentCondition}
          </div>
        </div>
        {/* End of row 1 */}
        <hr />
        <div className="row" id="forecastRow">
          {forecastData.map((dayInfo) => {
            return (
              <ForecastDay
                day={dayInfo.day}
                icon={dayInfo.icon}
                temp={dayInfo.temp}
              />
            );
          })}
        </div>
        {/* End of row 2 */}
      </div>
    
    </div>
  );
}

const ForecastDay = ({ day, icon, temp }) => {
  return (
    <div className="col text-center">
      <p>{day}</p>
      <p className="forecastIcon">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      </p>
      <p>{temp}°</p>
    </div>
  );
};

export default App;

// copy my files into Max's weather/react app so it loads a webpage
