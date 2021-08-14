$(document).ready(function () {

    var apiKey = "b0694486eaf3f80b971e7c31f05c245c"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?"
    var futureDaysURL = "https://api.openweathermap.org/data/2.5/forecast/?"
    var saveBtnId = "";
    var buttonText = ""; // Text that will be saved into the btn
    var counterBtn = 1;
    var date = moment().format("MM/DD/YYYY");
    var daysCards = 5
    var maxSearchAmount = 5
    var hoursFor24 = 8 // This is made because the API gives us the weather every 3 hours, so by multiplying it by 8 it hsould give us the weather every 24 hrs

    //Submit button functions
    $("#inputBtn").on("click", function (event) {
        event.preventDefault();
        let searchCity = $("#inputCity").val();

        //Calls API
        $.ajax({
            url: apiURL + 'q' + '=' + searchCity + '&units=imperial&appid=' + apiKey,
            dataType: "json",
            type: "GET",
            success: function (data) {
                var result = outputData(data);
                getUvIndex(data);
                $("#todayCont").html(result);
                $("#todayCont").val('');
            }
        });

        // Connects to API which gives the humidity
        function getUvIndex(data) {
            var lon = data.coord.lon
            var lat = data.coord.lat
            var UVURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
            $.ajax({
                url: UVURL,
                dataType: "json",
                type: "GET",
                success: function (uvData) {
                    var uvResult = uvColor(uvData);
                    $("#uvindex").html(uvResult);
                    $("#unindex").val('');
                }
            })
        };

        //Renders today's weather
        function outputData(data) {
            return "<div class='left-align col l6'><h3>" + data.name + ' ' + date + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' class='col l2'></h3></div>" +
                "<div class='col l8 left-align'><h5>Temp:<b> " + data.main.temp + "</b>°F</h5></div>" +
                "<div class='col l8 left-align'><h5>Wind:<b> " + data.wind.speed + " </b>Miles/Hr</h5></div>" +
                "<div class='col l8 left-align'><h5>Humidity:<b> " + data.main.humidity + "</b>%</h5></div>" +
                "<div class='col l8 left-align'><h5>UV Index: <b id='uvindex'> " + + " </b>%</h5></div>" +
                "</div>"
        };

        // Defines the color of the UV and the UV Index
        function uvColor(uvData) {
            $('#uvindex').html("<span>" + uvData.current.uvi + "</span>")
            if (uvData.current.uvi < 3) {
                $("#uvindex").addClass('favorableUV')
                $("#uvindex").removeClass('moderateUV')
                $("#uvindex").removeClass('severeUV')
            } else if (uvData.current.uvi < 6) {
                $("#uvindex").removeClass('favorableUV')
                $("#uvindex").addClass('moderateUV')
                $("#uvindex").removeClass('severeUV')
            } else {
                $("#uvindex").removeClass('favorableUV')
                $("#uvindex").removeClass('moderateUV')
                $("#uvindex").addClass('severeUV')
            };
        };

        // Get future days REMOVE IF CRASH
        $.ajax({
            url: futureDaysURL + 'q=' + searchCity + '&units=imperial' + '&appid=' + apiKey,
            dataType: "json",
            type: "GET",
            success: function (dayData) {
                var dayResult = dailyCards(dayData);
                $("#weatherCards").html(dayResult);
                $("#weatherCards").val('');
            }
        });


        function dailyCards(dayData) {
            var cardsArray = [];
            for (i = 1; i <= daysCards*hoursFor24; i +=hoursFor24) {
                var callList = dayData.list[i];
                var dayFormat = new Date(callList.dt * 1000).toLocaleDateString("en-US");
                var card = "<div class='col l2 left-align'>" +
                    "<h4>" + dayFormat + "</h4>" +
                    "<h5>" + "<img src='http://openweathermap.org/img/w/" + callList.weather[0].icon + ".png'" + "</h5>" +
                    "<h5>Temp: <b>" + callList.main.temp + "</b>°F</h5>" +
                    "<h5>Wind: <b>" + callList.wind.speed + " </b>MPH</h5>" +
                    "<h5>Humidity: <b>" + callList.main.humidity + "</b>%</h5>" +
                    "</div>";
                cardsArray.push(card);
                console.log(dayData)
            }
            return cardsArray
        };


        //Set city local storage
        if (counterBtn <= maxSearchAmount) {
            saveBtnId = $(`#button${[counterBtn]}`).attr("id")
            buttonText = $(this).siblings("#inputCity").val();
            localStorage.setItem(saveBtnId, buttonText)
            counterBtn++;
        };

        //Adds info into today's weather conditions
        // $("#City-Name-Date").text(searchCity + " " + date);
        $("#temp").text(searchCity);
        $("#wind").text(searchCity);
        $("#humidity").text(searchCity);
        $("#uvindex").text(searchCity);

        // Adds local storage for the cities when submiting 
        //& removes buttons when empty
        for (i = 1; i <= maxSearchAmount; i++) {
            $(`#button${[i]}`).text(localStorage.getItem(`button${[i]}`));
            if ($(`#button${[i]}`).text().trim().length == 0) {
                $(`#button${[i]}`).hide();
            } else {
                $(`#button${[i]}`).show();
            }
        };
    });

    // Gets local storage for the cities when reloding the page & removes when empty
    for (i = 1; i <= maxSearchAmount; i++) {
        $(`#button${[i]}`).text(localStorage.getItem(`button${[i]}`));
        if ($(`#button${[i]}`).text().trim().length == 0) {
            $(`#button${[i]}`).hide();
        } else {
            $(`#button${[i]}`).show();
        }
    };

    //Remove cities from local storage
    $("#emptyStorage").on("click", function () {
        for (i = 1; i <= maxSearchAmount; i++) {
            $(`#button${[i]}`).text(localStorage.removeItem(`button${[i]}`));
            window.location.reload()
        };
    });

    //See data again when clicking a button
    $(`#button1`).on("click", function () {
        $(`#inputCity`).val(localStorage.getItem(`button1`))
        $("[name='submit']")[0].click();
    });
    $(`#button2`).on("click", function () {
        $(`#inputCity`).val(localStorage.getItem(`button2`))
        $("[name='submit']")[0].click();
    });
    $(`#button3`).on("click", function () {
        $(`#inputCity`).val(localStorage.getItem(`button3`))
        $("[name='submit']")[0].click();
    });
    $(`#button4`).on("click", function () {
        $(`#inputCity`).val(localStorage.getItem(`button4`))
        $("[name='submit']")[0].click();
    });
    $(`#button5`).on("click", function () {
        $(`#inputCity`).val(localStorage.getItem(`button5`))
        $("[name='submit']")[0].click();
    });


});