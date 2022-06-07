const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
const months = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=49.930375&lon=19.944466&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed, clouds, visibility, uvi} = data.current;
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `
    <div class="top-right">
        <div class= "chart" data-augmented-ui="tl-clip tr-round br-clip bl-round border" style="--aug-border-bg: #97E2DD; --aug-border-all: 3px;">
            <div class="chart-one" data-augmented-ui="tl-clip br-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Humidity⠆${humidity}%</div>
            <div class="chart-two" data-augmented-ui="tr-round bl-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Pressure⠆${pressure}</div>
            <div class="chart-three" data-augmented-ui="tr-clip bl-round border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Wind Speed⠆${wind_speed}</div>
            <div class="chart-four" data-augmented-ui="tl-clip br-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Clouds⠆${clouds}</div>
            <div class="chart-five" data-augmented-ui="tl-clip br-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Visibility⠆${visibility}m</div>
            <div class="chart-six" data-augmented-ui="tr-round bl-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">UV⠆${uvi}</div>
            <div class="chart-seven" data-augmented-ui="tr-clip bl-round border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Sunrise⠆${window.moment(sunrise * 1000).format('HH:mm ')}</div>
            <div class="chart-eight" data-augmented-ui="tl-clip br-clip border" style="--aug-border-bg: #ffffff; --aug-border-all: 3px; width: 300px; height: 90px; background-color: #2D99D7;">Sunset⠆${window.moment(sunset*1000).format('HH:mm ')}</div>
        </div>
    </div>
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 1){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }
        if(idx == 2){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆ ${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆ ${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }
        if(idx == 3){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆ ${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆ ${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }
        if(idx == 4){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆ ${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆ ${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }
        if(idx == 5){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆ ${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆ ${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }
        if(idx == 6){
            otherDayForcast += `
			<div class="next-day" data-augmented-ui="tl-clip br-clip border">
            <div class="day-jeden">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="break-next"></div>
			<img class="wet-img-next" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <div class="break-next2"></div>
			<div class="tempt">TEMP</div>
			<div class="temp-day">Dzień⠆ ${day.temp.day}&#176;C</div>
			<div class="temp-night">Noc⠆ ${day.temp.night}&#176;C</div>
            <div class="break-next3"></div>
			<div class="humid">${day.pressure} hPa</div>
            </div>
            
            `
        }

    })


    weatherForecastEl.innerHTML = otherDayForcast;
}


