async function fetchWeather(location, isCelsius) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6bcb3a7c1e097913c00465e5d4bc4827&units=${isCelsius ? 'metric' : 'imperial'}`;
    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();
    
    return weatherData;
}

export { fetchWeather }