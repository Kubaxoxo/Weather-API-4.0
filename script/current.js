const city = "Skawina";
let weather = {
    apiKey: "49cc8c821cd2aff9af04c9f98c36eb74",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon } = data.weather[0];
      const { temp, pressure } = data.main;
      document.querySelector(".wet-img").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".actual-temp").innerText = temp + "°C";
      document.querySelector(".humid-actual").innerText =
        pressure + "hPa";
      document.querySelector(".city").innerText = name;
    }};
    function zegarek()
    {
        var data = new Date();
        var godzina = data.getHours();
        var minuta = data.getMinutes();
        var sekunda = data.getSeconds();

        if (minuta < 10) minuta = "0" + minuta;
        if (sekunda < 10) sekunda = "0" + sekunda;
        var pokazGodzine = godzina + '.' + minuta + '.' + sekunda;
        document.getElementById("time").innerHTML = pokazGodzine;
        setTimeout(zegarek, 1000); 
    }        
  weather.fetchWeather("Skawina");