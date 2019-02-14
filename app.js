import * as ELEMENTS from 'elements';
import {Http} from 'http';
import { WeatherData } from 'weather-data';
import { WEATHER_PROXY_HANDLER } from './weather-data';

const APP_ID = '';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);
function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (CITY_NAME.length == 0) {
        return alert('Please enter a city name');
    }
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

    const URL = 'api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '%units=metric&appid=' + APP_ID;

    Http.fetchData(URL)
        .then(responseData => {
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUppercase());
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
            updateWeather(WEATHER_PROXY);
        })
        .catch(error => alert(error));
}

function updateWeather(WeatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textcontent = WeatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textcontent = WeatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textcontent = WeatherData.temperature;

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}