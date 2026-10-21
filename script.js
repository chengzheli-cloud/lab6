document.addEventListener('DOMContentLoaded', () => {
    const locationTitle = document.getElementById('location-title');
    const weatherDesc = document.getElementById('weather-description');
    const tempVal = document.getElementById('temp-val');
    const windVal = document.getElementById('wind-val');
    const conditionVal = document.getElementById('condition-val');
    const refreshBtn = document.getElementById('refresh-btn');
    const timestamp = document.getElementById('timestamp');
    const bodyElement = document.body;

    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,wind_speed_10m,weather_code';

    async function fetchWeatherData() {
        locationTitle.textContent = "Fetching Live Data...";
        weatherDesc.textContent = "Querying public API endpoint...";

        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const current = data.current;

            const temp = current.temperature_2m;
            const wind = current.wind_speed_10m;
            const weatherCode = current.weather_code;

            tempVal.textContent = `${temp}°C`;
            windVal.textContent = `${wind} km/h`;
            conditionVal.textContent = weatherCode;
            locationTitle.textContent = "Toronto (Live API)";
            weatherDesc.textContent = "Data retrieved successfully via fetch()";

            applyDataDrivenVisuals(temp);

            const now = new Date();
            timestamp.textContent = `Last updated: ${now.toLocaleTimeString()}`;

        } catch (error) {
            locationTitle.textContent = "Error Loading Data";
            weatherDesc.textContent = error.message;
        }
    }

    function applyDataDrivenVisuals(temperature) {
        bodyElement.className = ''; 

        if (temperature > 20) {
            bodyElement.classList.add('theme-warm');
        } else if (temperature < 10) {
            bodyElement.classList.add('theme-cold');
        } else {
            bodyElement.classList.add('theme-mild');
        }
    }

    refreshBtn.addEventListener('click', fetchWeatherData);

    fetchWeatherData();
});