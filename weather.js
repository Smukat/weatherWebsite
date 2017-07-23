/**
 * Created by jesica on 7/21/2017.
 */

$(document).ready(function () {

    // GLOBAL VARS

    var temp;
    var min;
    var max;

    // GET ICONS

    function weatherIcons(latitude, longitude) {

        var queryIcons = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2004e9a01a0eda6cd0c7ed7fbc3e9e3d/" + latitude + "," + longitude;

        $.getJSON(queryIcons, function (dataIcons) {

            console.log(dataIcons);

            switch (dataIcons.currently.icon) {

                case "clear-day":
                    var skycons = new Skycons({"color": "#fec325"});
                    skycons.add("iconWeather", "clear-day");
                    $("body").css({"background-color" : "#60caff"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#ff6095"});
                    $("#city>h2, .btn:hover").css({"color": "#fec325"});
                    break;

                case "clear-night":
                    var skycons = new Skycons({"color": "#0d0411"});
                    skycons.add("iconWeather", "clear-night");
                    $("body").css({"background-color" : "#153a57"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#441557"});
                    $("#city>h2, .btn:hover").css({"color": "#574e15"});
                    break;

                case "partly-cloudy-day":
                    var skycons = new Skycons({"color": "#a8a86b"});
                    skycons.add("iconWeather", "partly-cloudy-day");
                    $("body").css({"background-color" : "#4a76a8"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#924aa8"});
                    $("#city>h2, .btn:hover").css({"color": "#a86e4a"});
                    break;

                case "partly-cloudy-night":
                    var skycons = new Skycons({"color": "#0d0411"});
                    skycons.add("iconWeather", "partly-cloudy-night");
                    $("body").css({"background-color" : "#153a57"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#441557"});
                    $("#city>h2, .btn:hover").css({"color": "#574e15"});
                    break;

                case "cloudy":
                    var skycons = new Skycons({"color": "#3a393a"});
                    skycons.add("iconWeather", "cloudy");
                    $("body").css({"background-color" : "#616061"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#888888"});
                    $("#city>h2, .btn:hover").css({"color": "#b0afb0"});
                    break;

                case "rain":
                    var skycons = new Skycons({"color": "#383857"});
                    skycons.add("iconWeather", "rain");
                    $("body").css({"background-color" : "#573838"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#574738"});
                    $("#city>h2, .btn:hover").css({"color": "#385738"});
                    break;

                case "sleet":
                    var skycons = new Skycons({"color": "#47351a"});
                    skycons.add("iconWeather", "sleet");
                    $("body").css({"background-color" : "#1a472b"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#221a47"});
                    $("#city>h2, .btn:hover").css({"color": "#471e1a"});
                    break;

                case "snow":
                    var skycons = new Skycons({"color": "#3a1c4b"});
                    skycons.add("iconWeather", "snow");
                    $("body").css({"background-color" : "#4699bd"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#9346bd"});
                    $("#city>h2, .btn:hover").css({"color": "#bd6d46"});
                    break;

                case "wind":
                    var skycons = new Skycons({"color": "#919165"});
                    skycons.add("iconWeather", "wind");
                    $("body").css({"background-color" : "#c2824a"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#4a5ac2"});
                    $("#city>h2, .btn:hover").css({"color": "#ba4ac2"});
                    break;

                case "fog":
                    var skycons = new Skycons({"color": "#c1c2b1"});
                    skycons.add("iconWeather", "fog");
                    $("body").css({"background-color" : "#d4c9be"});
                    $(".btn, #weatherBox, #min>h3, #max>h3").css({"color": "#a6a5bd"});
                    $("#city>h2, .btn:hover").css({"color": "#b38fb1"});
                    break;

            }
            skycons.play();
        });
    }

    // FROM SECONDS TO TIME (SUNRISE & SUNSET ELEMENTS)

    function secondsTime(secs) {

        return moment(secs * 1000).format('LT');
    }


    // TIME

    function updateTime () {
        var time = moment().format('LTS');
        $("#date>p").html(time);
    }

    updateTime();
    setInterval(updateTime, 1000);


    $("#date>h3").html(moment().format('dddd')); //Day of the week
    $("#date>h2").html(moment().format('LL')); // Date



    // GEOLOCATION

    function weatherInfo(latitude, longitude) {


        var query = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

        $.getJSON(query, function (data) {

            console.log(data);

            temp = data.main.temp;
            min = data.main.temp_min;
            max = data.main.temp_max;

            showTemp();
            $("#city>h2").html(data.name);
            $("#wind>p").html(data.wind.speed + "Mph");
            $("#humidity>p").html(data.main.humidity + "%");
            $("#sunrise>p").html(secondsTime(data.sys.sunrise));
            $("#sunset>p").html(secondsTime(data.sys.sunset));

        });
    }


    // FROM C TO F

    function showTemp() {

        if ($(".btn").html() == "To °C") {
            $("#city>h3").html(Math.round(temp * 1.8 + 32) + "°");
            $("#min>h4").html(Math.round(min * 1.8 + 32) + "°");
            $("#max>h4").html(Math.round(max * 1.8 + 32) + "°");

        } else {
            $("#city>h3").html(Math.round(temp) + "°");
            $("#min>h4").html(Math.round(min) + "°");
            $("#max>h4").html(Math.round(max) + "°");
        }
    }

    $(".btn").on("click", firstClick);

    function firstClick() {
        $(".btn").html("To °C");
        showTemp();
        $(".btn").off("click").on("click", secondClick);

    }

    function secondClick() {
        $(".btn").html("To °F");
        showTemp();
        $(".btn").off('click').on('click', firstClick);
    }


    // GET LAT AND LONG

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            weatherInfo(position.coords.latitude, position.coords.longitude);
            weatherIcons(position.coords.latitude, position.coords.longitude);
        });

    } else {
        alert("Sorry, no geolocation available.");
    }

});


