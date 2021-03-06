$(document).ready(() => {
  var displayWeather = function(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    var token = "&appid=72a46f472cd78125c67ce1ba75151860";
    var units = "&units=metric";
    $.get(url + token + units, data => {
      $("#city-temperature").text(Math.round(data.main.temp));
      $("#city").text(data.name);
    });
  };

  var updateTemperature = function() {
    $("#manual-temperature").text(thermostat.temp);
    $("#background").attr("class", thermostat.printUsage());
  };

  var thermostat = new Thermostat();
  updateTemperature();

  $("#temperature-up").on("click", () => {
    thermostat.up();
    updateTemperature();
  });

  $("#temperature-down").on("click", () => {
    thermostat.down();
    updateTemperature();
  });

  $("#temperature-reset").on("click", () => {
    thermostat.reset();
    updateTemperature();
  });

  $("#powersaving-on").on("click", () => {
    thermostat.on();
    $("#power-saving-status").text("on");
  });

  $("#powersaving-off").on("click", () => {
    thermostat.off();
    $("#power-saving-status").text("off");
  });

  displayWeather("London");

  $("#select-city").submit(event => {
    event.preventDefault();
    var city = $("#current-city").val();
    displayWeather(city);
  });
});
