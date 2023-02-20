// Define API endpoints
const apiKey = '67ad4e429101e1a2773cb4f5ee67ad52';

// Select elements from the DOM
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-button')
const historyList = $('#history');
const forecastHead = $('#forecast-header');
const forecastList = $('#forecast').empty();
const todayHead = $('#current-header');
const todayWeather = $('#today').empty();
const cityList = [];

// Get City Weather by OpenWeatherAPI
let weatherSearch = (cityName) => {
    console.log(cityName);
    let weathertUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: weathertUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      
  // Define current weather element
      const todayHeader = $("<h2 class='mt-1 h3 form-label font-effect-outline'>").text("Today Weather")
      const dateFormat = moment().format("LL");
      const currentCity = $("<h2 class='ml-2'>").text(response.name);
      const currentDate = $("<h3 class='ml-2'>").text("Date: " + dateFormat)
      const currentTemp = $("<p class='ml-2'>").text("Current Tempature: "+Math.round(response.main.temp-273.15) + " °C");
      const currentHumidity = $("<p class='ml-2'>").text("Current Humidity: "+response.main.humidity + " %");
      const currentWindSpeed = $("<p class='ml-2'>").text("Current Wind Speed: "+response.wind.speed + " meter/sec");
  // Update Icon according to the weather
      const currentWeather = response.weather[0].main;
      let currentIcon;
      if (currentWeather === "Rain") {
        currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (currentWeather=== "Clouds") {
        currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/04d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (currentWeather === "Clear") {
        currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
     else if (currentWeather === "Drizzle") {
        currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
     else if (currentWeather === "Snow") {
        currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
    const currentWeatherSection = $('<section>');
    currentWeatherSection.append(currentCity, currentIcon,currentDate,currentTemp,currentHumidity,currentWindSpeed);
    todayHead.append(todayHeader);
    todayWeather.addClass("border");
    todayWeather.html(currentWeatherSection);
  });
  // Get 5 days forecast by OpenWeatherAPI
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  $.ajax({
    url: forecastUrl,
    method: "GET",
  }).then(function(responseForecast){
    console.log(responseForecast);
  // Create cards for forecast
  let forecastCard;
  let forecastHeader = $("<h2 class='mt-1 h3 form-label font-effect-outline'>").text("5 days forecast")
  for (let i = 2; i < responseForecast.list.length; i += 8) {
    forecastCard = $("<section class='card bg-secondary mb-3 mx-auto col-2'>")
    let forecastDate = $("<p class='card-text'>").text(responseForecast.list[i].dt_txt.substr(0,10));
    const forecastTemp = $("<p class='card-text'>").text("Temp: " + Math.round(responseForecast.list[i].main.temp-273.15)+ " °C");
    const forecastHumidity = $("<p class='card-text'>").text("Humidity: " + responseForecast.list[i].main.humidity + " %");
    const forecastWind = $("<p class='card-text'>").text("Wind: " +responseForecast.list[i].wind.speed + " meter/sec");
    // Update Icon according to the forecast
    const forecastWeather = responseForecast.list[i].weather[0].main;
    let forecastIcon;
    if (forecastWeather === "Rain") {
      forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
      forecastIcon.attr("style", "height: 60px; width: 60px");
  } else if (forecastWeather === "Clouds") {
      forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/04d.png");
      forecastIcon.attr("style", "height: 60px; width: 60px");
  } else if (forecastWeather === "Clear") {
      forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
      forecastIcon.attr("style", "height: 60px; width: 60px");
  }
   else if (forecastWeather === "Drizzle") {
      forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
      forecastIcon.attr("style", "height: 60px; width: 60px");
  }
   else if (forecastWeather === "Snow") {
      forecastIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
      forecastIcon.attr("style", "height: 60px; width: 60px");
  };
  // Append element to forecast container
  forecastCard.append(forecastDate,forecastIcon,forecastTemp,forecastHumidity,forecastWind);
  forecastHead.append(forecastHeader);
  forecastList.append(forecastCard);
  }
  });
};

// Store search history to search list

// Function to search for a city
let citySearch = () => {
  let cityName = searchInput.value.trim();
  cityList.push(cityName);
  localStorage.setItem('cityName',JSON.stringify(cityList));
  weatherSearch(cityName);
  appendSearch();
  };

// Function to append search history button
let appendSearch = () => {
  let searchHistory = JSON.parse(localStorage.getItem("cityName"));
  let searchBtn;
  if (searchHistory.length > 0) {
    let lastIndex = searchHistory.length - 1;
    let lastElement = searchHistory[lastIndex]
    searchBtn = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' id='city-history' style='width: auto;'>").text(lastElement);
  } else {
    searchBtn = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' id='city-history' style='width: auto;'>").text(searchHistory)
  }
  historyList.prepend(searchBtn);
}

// Event listener for the search button click
searchBtn.addEventListener("click", function(event){
  event.preventDefault()
  forecastList.empty()
  citySearch()
});

// Event listener for recall search history
historyList.on('click', ".btn", function(event){
  event.preventDefault();
  forecastList.empty()
  weatherSearch($(this).text());
})

