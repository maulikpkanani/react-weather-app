class Ajaxweather {
	constructor() {
		this.apiKey = '0177ea2078c35450759145f507b2e4f4';
	}

	async getWeather(city) {
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
			this.apiKey
		}&units=metric`;

		const weatherData = await fetch(url);
		const weather = await weatherData.json();
		return weather;
	}
}

class Display {
	constructor() {
		this.results = document.querySelector('.results');
		this.cityName = document.getElementById('cityName');
		this.cityCountry = document.getElementById('cityCountry');
		this.cityIcon = document.getElementById('cityIcon');
		this.cityTemp = document.getElementById('cityTemp');
		this.cityHumidity = document.getElementById('cityHumidity');
	}
	showWeather(data) {
		console.log(data);
		const {
			name,
			sys: { country },
			main: { temp, humidity }
		} = data;
		const { icon } = data.weather[0];

		this.results.classList.add('showItem');
		this.cityName.textContent = name;
		this.cityCountry.textContent = country;
		this.cityTemp.textContent = temp;
		this.cityHumidity.textContent = humidity;
		this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
	}
}

(function() {
	const form = document.getElementById('wheatherForm');

	const cityInput = document.getElementById('cityInput');

	const feedback = document.querySelector('.feedback');

	//class
	const ajax = new Ajaxweather();
	const display = new Display();

	form.addEventListener('submit', e => {
		e.preventDefault();
		const city = cityInput.value;
		if (city.length === 0) {
			showFeedback('city input cannot be empty');
		} else {
			ajax.getWeather(city).then(data => {
				if (data.message === 'city not found') {
					showFeedback('City with such name does not exists');
				} else {
					display.showWeather(data);
				}
			});
		}
	});

	function showFeedback(text) {
		feedback.classList.add('showItem');
		feedback.innerHTML = `<p>${text}</p>`;
		setTimeout(() => {
			feedback.classList.remove('showItem');
		}, 3000);
	}
})();
