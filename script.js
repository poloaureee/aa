function date_time() {
  var date = new Date();
  var am_pm = "AM";
  var hour = date.getHours();
  if (hour >= 12) {
    am_pm = "PM";
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  var minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  var sec = date.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  }

  document.getElementById("time").innerHTML =
    hour + ":" + minute + ":" + sec + " " + am_pm;
}
setInterval(date_time, 500);

////////////////////////////////////////////////(((Weather)))/////////////////////////////////////////////////////////
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

let weather = {
  apiKey: "7ee77d06025ae76bf51c786b72d72e52",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1366x1080?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
weather.fetchWeather("Philippines");
