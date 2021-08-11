const apiKey = "d9235188ee1dfa97a1e1172ed2cc965b"
$(document).ready(function () {
    var saveBtnId = "";
    var buttonText = ""; // Text that will be saved into the btn
    var counterBtn = 1;
    var date = moment().format("MM/DD/YYYY")

    //Submit button functions
    $("#inputBtn").on("click", function (event) {
        event.preventDefault();
        let searchCity = $("#inputCity").val();

        //Change uv colors
        function uvColors() {
            if (searchCity < 3) {
                $("#uvindex").addClass('favorableUV')
                $("#uvindex").removeClass('moderateUV')
                $("#uvindex").removeClass('severeUV')
            } else if (searchCity < 6) {
                $("#uvindex").removeClass('favorableUV')
                $("#uvindex").addClass('moderateUV')
                $("#uvindex").removeClass('severeUV')
            } else {
                $("#uvindex").removeClass('favorableUV')
                $("#uvindex").removeClass('moderateUV')
                $("#uvindex").addClass('severeUV')
            }
        };

        //Set city local storage
        if (counterBtn <= 5) {
            saveBtnId = $(`#button${[counterBtn]}`).attr("id")
            buttonText = $(this).siblings("#inputCity").val();
            localStorage.setItem(saveBtnId, buttonText)
            counterBtn++;
        };

        //Adds info into today's weather conditions
        $("#City-Name-Date").text(searchCity + " " + date);
        $("#temp").text(searchCity);
        $("#wind").text(searchCity);
        $("#humidity").text(searchCity);
        $("#uvindex").text(searchCity);

        // Adds local storage for the cities when submiting 
        //& removes buttons when empty
        for (i = 1; i < 6; i++) {
                $(`#button${[i]}`).text(localStorage.getItem(`button${[i]}`));
            if ($(`#button${[i]}`).text().trim().length == 0) {
                $(`#button${[i]}`).hide();
            } else {
                $(`#button${[i]}`).show();
            }
        };

        uvColors();
    });

    // Gets local storage for the cities when reloding the page & removes when empty
    for (i = 1; i < 6; i++) {
        $(`#button${[i]}`).text(localStorage.getItem(`button${[i]}`));
        if ($(`#button${[i]}`).text().trim().length == 0) {
            $(`#button${[i]}`).hide();
        } else {
            $(`#button${[i]}`).show();
        }
    };

    //Remove cities from local storage
    $("#emptyStorage").on("click", function () {
        for (i = 1; i < 6; i++) {
            $(`#button${[i]}`).text(localStorage.removeItem(`button${[i]}`));
            window.location.reload()
        };
    });

    //See data again when clicking a button
    $(`#button1`).on("click", function (e) {
        $(`#inputCity`).val(localStorage.getItem(`button1`))
        $("[name='submit']")[0].click();
    });
    $(`#button2`).on("click", function (e) {
        $(`#inputCity`).val(localStorage.getItem(`button2`))
        $("[name='submit']")[0].click();
    });
    $(`#button3`).on("click", function (e) {
        $(`#inputCity`).val(localStorage.getItem(`button3`))
        $("[name='submit']")[0].click();
    });
    $(`#button4`).on("click", function (e) {
        $(`#inputCity`).val(localStorage.getItem(`button4`))
        $("[name='submit']")[0].click();
    });
    $(`#button5`).on("click", function (e) {
        $(`#inputCity`).val(localStorage.getItem(`button5`))
        $("[name='submit']")[0].click();
    });


});