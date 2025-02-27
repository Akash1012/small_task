import { useState } from "react";
let data = [
  {
    date: "Friday 22 Nov",
    wholeDay: [
      {
        time: "Morning",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Noon",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Evening",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Night",
        weather: "Clear",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
    ],
  },
  {
    date: "Sat 23 Nov",
    wholeDay: [
      {
        time: "Morning",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Noon",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Evening",
        weather: "Sunny",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
      {
        time: "Night",
        weather: "Clear",
        temp: "22 C",
        windSpeed: "13 - 15km",
      },
    ],
  },
];

const WeatherDetails = () => {
  const [weatherData, setWeatherData] = useState(data);
  return (
    <>
      <h1>WeatherDetails</h1>

      <div
        className="main-weather-container"
        style={{
          background: "black",
          color: "white",
        }}
      >
        {weatherData.map((weather) => {
          return (
            <div key={weather.date}>
              <h2
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  padding: "10px",
                  width: "140px",
                  position: "relative",
                  top: "36px",
                  left: "50%",
                }}
              >
                {weather.date}
              </h2>
              <div
                style={{
                  display: "flex",
                  //   gap: "10px",
                  padding: "13px",
                }}
              >
                {weather.wholeDay.map((day) => {
                  const { time, weather, windSpeed, temp } = day;
                  return (
                    <div
                      style={{
                        width: "350px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            textAlign: "center",
                            border: "1px solid",
                            padding: "10px",
                          }}
                        >
                          {time}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                          border: "1px solid",
                        }}
                      >
                        <div>Sunny image</div>
                        <div>
                          <p>{weather}</p>
                          <p>{temp}</p>
                          <p>{windSpeed}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeatherDetails;
