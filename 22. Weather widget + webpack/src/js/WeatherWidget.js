class WeatherWidget {
    constructor() {
        this.apiKey = process.env.WEATHER_API_KEY || '';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.defaultCity = 'Kyiv';

        this.initElements();
        this.bindEvents();
        this.updateTime();
        this.loadWeather(this.defaultCity);

        setInterval(() => this.updateTime(), 1000);
    }

    initElements() {
        this.widget = document.getElementById('weatherWidget');
        this.currentDate = document.getElementById('currentDate');
        this.currentTime = document.getElementById('currentTime');
        this.cityName = document.getElementById('cityName');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.mainTemp = document.getElementById('mainTemp');
        this.feelsLike = document.getElementById('feelsLike');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.sunrise = document.getElementById('sunrise');
        this.humidity = document.getElementById('humidity');
        this.pressure = document.getElementById('pressure');
        this.wind = document.getElementById('wind');
        this.lastUpdated = document.getElementById('lastUpdated');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.errorMessage = document.getElementById('errorMessage');
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => {
            this.loadWeather(this.cityInput.value || this.defaultCity);
        });

        this.searchBtn.addEventListener('click', () => {
            const city = this.cityInput.value.trim();
            if (city) {
                this.loadWeather(city);
            }
        });

        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = this.cityInput.value.trim();
                if (city) {
                    this.loadWeather(city);
                }
            }
        });
    }

    updateTime() {
        const now = new Date();

        const dateOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        const timeOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };

        this.currentDate.textContent = now.toLocaleDateString('en-US', dateOptions);
        this.currentTime.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }

    showLoading() {
        this.loadingOverlay.classList.add('show');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }

    getWeatherIcon(condition, isDay = true) {
        const icons = {
            'clear': isDay ? '☀️' : '🌙',
            'clouds': '☁️',
            'rain': '🌧️',
            'drizzle': '🌦️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'mist': '🌫️',
            'fog': '🌫️',
            'haze': '🌫️'
        };

        return icons[condition.toLowerCase()] || '🌤️';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }

    updateWeatherDisplay(data) {
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const condition = data.weather[0].main;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = Math.round(data.wind.speed * 3.6);
        const windDir = this.getWindDirection(data.wind.deg);
        const sunrise = this.formatTime(data.sys.sunrise);
        const cityName = `${data.name}, ${data.sys.country}`;

        const now = new Date();
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const isDay = now > sunriseTime && now < sunsetTime;

        this.cityName.textContent = cityName;
        this.mainTemp.textContent = `${temp}°C`;
        this.feelsLike.textContent = `Feels Like: ${feelsLike}°C`;
        this.weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
        this.weatherIcon.textContent = this.getWeatherIcon(condition, isDay);
        this.humidity.textContent = `${humidity}%`;
        this.pressure.textContent = `${pressure} hPa`;
        this.wind.textContent = `${windSpeed} km/h ${windDir}`;
        this.sunrise.textContent = sunrise;

        const updateTime = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }) + ' ' + now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        this.lastUpdated.textContent = updateTime;
        this.hideError();
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');

        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    async loadWeather(city) {
        try {
            this.showLoading();

            const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;

            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key');
                } else {
                    throw new Error('Weather data unavailable');
                }
            }

            const data = await response.json();
            this.updateWeatherDisplay(data);

        } catch (error) {
            console.error('Weather loading error:', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
}

export default WeatherWidget;