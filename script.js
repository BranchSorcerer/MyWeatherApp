const apiKey = '2f79966687b58231b2ad6aa4da0abd4c'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

// Existing code
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        showError('Please enter a city name.');
    }
});

// Add an event listener for the Enter key
locationInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        } else {
            showError('Please enter a city name.');
        }
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API request failed');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            showError('Error fetching weather data. Please try again later.');
            console.error('Error fetching weather data:', error);
        });
}

function showError(message) {
    // Display an error message to the user (create a new HTML element for this)
    // You can customize the error display as needed.
    console.error(message);
}

function showError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = ''; // Clear previous error messages
    errorContainer.appendChild(errorElement);
    console.error(message);
}

