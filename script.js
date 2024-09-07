document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('citySrch-btn').addEventListener('click', checkCity);
    
    function checkCity(e) {
        e.preventDefault();
        let city = document.getElementById('citySrch-bar').value.trim();
        console.log(city);
      
        if (!city) {
          alert("Please enter a city name to search for weather.");
          return;
        }
      
        const validCityRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/; 
        if (!validCityRegex.test(city)) {
          alert("Please enter a valid city name containing only letters and spaces.");
          return; 
        }
      
        fetchWeatherUpdate(city);
      }
    
    function fetchWeatherUpdate(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&q=${city}&units=metric&appid=b581abf8cb358cde51fe9fd675c39d7b`)
        .then(Response => Response.json())
    
        .then(data => {
            console.log(data);
            const cityName = document.getElementById('city-name').textContent = data.city.name;
            const temp = document.getElementById('temperature').textContent = data.list[0].main.temp + '°C';
            const iconUrl = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
            const imgElement = document.getElementById("weather-icon");
            imgElement.src = iconUrl;
            imgElement.style.display = "block";
            const weatherDescription = document.getElementById('weather-description').textContent = data.list[0].weather[0].description;
            const humidity = document.getElementById('humidity').textContent = data.list[0].main.humidity +'%';
            const windSpeed = document.getElementById('wind-speed').textContent = data.list[0].wind.speed + ' km/h';
        })
    
        .catch(error => console.error('error:', error));
    }
});