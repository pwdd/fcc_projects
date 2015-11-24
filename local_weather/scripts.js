$(function() {
  //get location
  getLocation = function() {
    $.get("http://ipinfo.io", function(response) {
      $("#location")
        .append(response.city + ", ")
        .append(response.region);
      getWeather(response.loc)
    }, "jsonp");
  };
  getLocation();
  
  //get weather
  getWeather = function(loc) {
    lat = loc.split(",")[0];
    lon = loc.split(",")[1];
    
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=f668913bc3c52e0342e8aead28585c39'
    
    $.get(weatherAPI, function(response) {
      var temperature = response.main.temp;
      temperature = parseFloat((temperature).toFixed(1));
      
      $('#icon')
        .append("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
      
      $('#temp').append(temperature);
      $('#conditions').append(response.weather[0].description);
      
      //set different images background according to temperature
      if (temperature <= 48.2) {
        $("#full-div").css("background-image", "url(https://images.unsplash.com/20/frozen-grass.JPG?q=80&fm=jpg&s=038a1598b23821cbd26367aeb620c638)");
      }
      if (temperature > 48.3 && temperature < 71.6) {
        $("#full-div").css("background-image", "url(https://images.unsplash.com/photo-1414612496608-90c0c4afacc3?q=80&fm=jpg&s=151d59a37b1c76118005e5af102a3945)");
      }
      if (temperature > 71.7 && temperature < 86) {
        $("#full-div").css("background-image", "url(https://images.unsplash.com/44/00aJ68yTtSFz9gcuHBcR_render0004.jpg?q=80&fm=jpg&s=cdd4d9c88d14ce3dd029f6d0282cbc1c)");
      }
      if (temperature > 86.1) {
        $("#full-div").css("background-image", "url(https://images.unsplash.com/reserve/vof4H8A1S02iWcK6mSAd_sarahmachtsachen.com_TheBeach.jpg?q=80&fm=jpg&s=4b983c61cce9cef7befc4aa127a398f0)");
      }
    }, 'jsonp')   
    
  };
  
  //unit conversion
  convertFtoC = function() {
    var changeTxt = $('#temp');
    var fTemp = parseFloat(changeTxt.text());
    var cTemp = ((fTemp - 32) * 5) / 9;
    cTemp = (cTemp).toFixed(1);
    changeTxt.html(cTemp);
    $('#toC').prop("disabled", true);
    $('#toF').prop("disabled", false);
  };
  
  convertCtoF = function() {
    var changeTxt = $('#temp');
    var cTemp = parseFloat(changeTxt.text());
    var fTemp = ((cTemp * 9) /5) + 32;
    fTemp = (fTemp).toFixed(1);
    changeTxt.html(fTemp);
    $('#toC').prop("disabled", false);
    $('#toF').prop("disabled", true);
  };
});


