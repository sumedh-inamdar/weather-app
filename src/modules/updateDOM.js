import  { millisecondsToHours, millisecondsToMinutes, fromUnixTime } from 'date-fns'

function clearWeatherDOM() {
    document.querySelectorAll('.dataField').forEach(field => field.textContent = '');
    document.querySelector('#weatherIcon').src = '';
}

function updateWeatherDOM(weatherData, isCelsius) {
    if (weatherData.cod != 200) return alert('Invalid location. Please try again.');

    const tempSymbol = isCelsius ? ' °C' : ' °F';
    document.querySelector('#location').textContent =  `${weatherData.name}, ${weatherData.sys.country}`;
    document.querySelector('#description').textContent =  weatherData.weather[0].description;
    document.querySelector('#weatherIcon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    document.querySelector('#temp').textContent = weatherData.main.temp + tempSymbol;
    document.querySelector('#feelsLike').textContent = weatherData.main.feels_like + tempSymbol;
    document.querySelector('#tempHigh').textContent = weatherData.main.temp_max + tempSymbol;
    document.querySelector('#tempLow').textContent = weatherData.main.temp_min + tempSymbol;
    document.querySelector('#humidity').textContent = weatherData.main.humidity + ' %';
    document.querySelector('#sunrise').textContent = convertUnixTime(weatherData.sys.sunrise, weatherData.timezone);
    document.querySelector('#sunset').textContent = convertUnixTime(weatherData.sys.sunset, weatherData.timezone);
}

function convertUnixTime(unixTime, timezoneInSeconds) {
    
    // offset unix time (UTC) by timezone and convert to UTC to get local time
    const localDate = fromUnixTime(unixTime + timezoneInSeconds); 
    const hourLocal = localDate.getUTCHours();
    let minuteLocal = localDate.getUTCMinutes();
    minuteLocal = minuteLocal.toString().length === 1 ? ('0').concat('', minuteLocal.toString()) : minuteLocal.toString();
    
    const rawDate = fromUnixTime(unixTime);
    const dateNow = Date.now();
    const hoursDiff = millisecondsToHours(rawDate - dateNow);
    const minsDiff = millisecondsToMinutes(rawDate - dateNow) % 60;

    const strDiff = `${minsDiff > 0 ? 'In ' : ''}${Math.abs(hoursDiff)} hours and ${Math.abs(minsDiff)} minutes${minsDiff > 0 ? '' : ' ago'}`;

    return `${hourLocal}:${minuteLocal} (${strDiff})`;
}

export { clearWeatherDOM, updateWeatherDOM }