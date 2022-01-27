import './style.css';
import { fetchWeather, fetchWeatherIcon } from './modules/apiCalls'
import { clearWeatherDOM, updateWeatherDOM } from './modules/updateDOM'

const searchForm = document.querySelector('#searchForm');
const radioTemp = document.querySelectorAll('input[name="tempScale"]');
const location = document.querySelector('#location');
const apiStatus = document.querySelector('#apiStatus');
const weatherIcon = document.querySelector('#weatherIcon');

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const location = event.target[0].value;
    const isCelsius = event.target[2].checked;
    getWeatherData(formatLoc(location), isCelsius);
})
radioTemp.forEach(radio => 
    radio.addEventListener('change', event => {
        getWeatherData(location.textContent, event.target.value === 'celsius');
    })
)

async function getWeatherData(location, isCelsius) {
    try {
        clearWeatherDOM();
        apiStatus.textContent = 'Loading...';
        await wait(1000);
        const weatherData = await fetchWeather(location, isCelsius);
        const imageURL = await fetchWeatherIcon(weatherData.weather[0].icon);
        updateWeatherDOM(weatherData, isCelsius);
        weatherIcon.src = imageURL;
        apiStatus.textContent = 'Successful';  
    } catch (error) {
        alert('error occured. check console for detailed info or retry.');
        console.log(error);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatLoc(location) {
    return location.trim().replace(', ', ',').replace(' ,', ',').replace(' ', '+');
}

getWeatherData('San Francisco', false); //default setting upon load