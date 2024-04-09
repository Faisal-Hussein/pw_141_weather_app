// console.log('WEATHER APP')

const searchForm = document.getElementById('city-search');
const weatherInput = document.getElementById('city-input');
const cityNameDisplay = document.getElementById('city');
const theHigh = document.getElementById('thehigh');
const theLow = document.getElementById('thelow');
const theForecast = document.getElementById('theforecast');
const theHumidity = document.getElementById('thehumidity');


const kelvinToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9/5 + 32;
};

const errorMessage = (your_error) =>{
    const currentError = document.createElement('div');
    currentError.classList.add('error-message');
    currentError.textContent= your_error;
    document.body.appendChild(currentError);
};

const theWeather = async (cityName) => {
    try{
        const apiKey = '3d9b7805fd6c011c244abc6c206c8bcc';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        const response = await fetch(apiUrl);
        
        const data = await response.json();
        
        printWeather(data);
    } catch (error) {
        errorMessage("ERROR: Current entry either doesn't exist or is spelled incorrectly, try again.")
    }
};

const printWeather = (data) => {
    const { name } = data;
    console.log(data);
    const { main } = data.weather[0];
    const { temp_max, temp_min, humidity } = data.main;

    const currentMaxFahr = kelvinToFahrenheit(temp_max);
    const currentMinFahr = kelvinToFahrenheit(temp_min);

    cityNameDisplay.textContent =`The weather in ${name}`
    theHigh.textContent = `The High for today: ${parseInt(currentMaxFahr)}° Fahrenheit`;
    theLow.textContent = `The Low for today: ${parseInt(currentMinFahr)}° Fahrenheit`;
    theForecast.textContent = `The forecast for today: ${main}`;
    theHumidity.textContent = `Percentage of Humidity: ${humidity} %`;
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = weatherInput.value.trim().toLowerCase();
    if (cityName) {
        theWeather(cityName);
    } else {
        errorMessage('Please enter a city.');
    }
});