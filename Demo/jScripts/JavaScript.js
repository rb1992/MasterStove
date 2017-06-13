$(document).ready(function () {

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'Sounds/AlertSound.mp3');

    //הצגת תאריך ושעה במסך הראשי
    var dt = new Date();
    var Hours = dt.getHours();
    var Minutes = dt.getMinutes()
    if (Hours < 10) {
        Hours = "0" + Hours;
    }
    if (Minutes < 10) {
        Minutes = "0" + Minutes;
    }
    var time = Hours + ":" + Minutes;

    $(".CurrentTime").html(time);

    var dt1 = new Date();
    var DayString = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Sat"][(dt1.getDay())];
    var Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][(dt1.getUTCMonth())];
    var DayNumber = dt1.getUTCDate();
    var TheDate = DayString + ", " + Month + " " + DayNumber;
    $("#CurrentDate").html(TheDate);

    var ChangeDot = function () {
        $("#firstTime .dot").removeClass("active");
        $("#firstTime .dot").eq(this.page).addClass("active");
        $("#firstTime .dot").eq(this.page).focus();
    }



    //פתיחת האפליקציה
    $(".Icon#MasterStove").click(function () {
        $("#appScreen").show();

        $("#dragendFirstTime").dragend({
            pageClass: "Firstdragend-page",
            direction: "horizontal",
            onSwipeEnd: ChangeDot
        });
    });


    $("#dragendFirstTime").dragend({
        pageClass: "Firstdragend-page",
        direction: "horizontal",
        onSwipeEnd: ChangeDot
    });


    $("#GetStarted").click(function () {
        $("#page1").remove();
        $("#firstTime #dots").show();
    });

    $(".skip").click(function () {
        $("#firstTime").hide();
        $("#demo").dragend();
    });

    //Swipe to pages
    $("#demo").dragend({
        afterInitialize: function () {
            this.container.style.visibility = "visible";
        },
        onSwipeEnd: function () {
            var first = this.pages[0],
                last = this.pages[this.pages.length - 1];

            $(".prev, .next").removeClass("deactivated");
            $(".nav li").removeClass("active");

            if (first === this.activeElement) {
                $(".prev").addClass("deactivated")
            };

            if (last === this.activeElement) {
                $(".next").addClass("deactivated")
            }

            $(".nav li").eq(this.page).addClass("active");
            $(".nav li").eq(this.page).focus();

        }
    });
    var ChoosenFuncName;
    $(".Func").click(function () {
        var FuncName = $(this).attr('id');
        ChoosenFuncName = FuncName;
        $("#FuncDetails").toggle();
        $("#FuncDetails div").hide();
        $("#D" + FuncName).show();
    });

    $("#changeFunc").click(function () {
        $("#FuncDetails").hide();
        $("#FuncDetails div").hide();
        $(".Func").removeClass("active");
        $("#" + ChoosenFuncName).addClass("active");
    });

    $("#GetImageBtn").click(function () {
        $("#GetImage").toggle();
        $("#placeHolder").css("background-image", "url('Images/imagePlaceholder.png')");
        $("#placeHolder").css("background-size", "150px");
        $("#Share").hide();
    });


    var FoodName;
    var TimeLeft = 0;
    var OvenTemp = 0;
    var FoodSteps = [];
    $("#OvenSetupBtn").click(function () {
        TimeLeft = 0;
        $("#OvenSetup").toggle();
        $("label[for=TimeInput]").hide();
        EnterFoodSteps();

    });

    $("#AddLevel span").click(function () {
        $("#StepControl").toggle();
    });


    $("#OK").click(function () {
        FoodName = $("#FoodNameInput").val();
        $("#FoodName").html(FoodName);
        $("#HomeFoodName").html(FoodName);
        $("#OvenSetup").toggle();
        if (FoodSteps.length != 0) {
            $("#OvenTemp").html(OvenTemp + "\u00b0");
            $("#HomeOvenTemp").html(OvenTemp + "\u00b0");
            if (TimeLeft != 0) {
                $("#HomeOvenTimeLeft").html("Time left: " + TimeLeft + " Minutes");
                $("#OvenTimeLeft").html("Time left: " + TimeLeft + " Minutes");
            }
            else {
                $("#HomeOvenTimeLeft").html("");
                $("#OvenTimeLeft").html("");
            }
        }

        if (FoodName == "Cake") {
            setTimeout(explode, 10000);
        }
    });

    function explode() {
        audioElement.play();
        $("#Alert").show();
    }

    $("#CloseOven").click(function () {
        audioElement.pause();
        $("#firstTime").hide();
        $("#Alert").hide();
        $("#appScreen").show();

        $("#demo").dragend({ scrollToPage: 3 });
        $(".Func").removeClass("active");
        $("#Func11").addClass("active");

        FoodName="";
        TimeLeft = 0;
        OvenTemp = 0;
        FoodSteps = [];

        $("#FoodName").html("");
        $("#HomeFoodName").html("");
        var FoodNameInput = document.getElementById("FoodNameInput");
        FoodNameInput.value = "";

        $("#HomeOvenTimeLeft").html("");
        $("#OvenTimeLeft").html("");
        $("#HomeOvenTemp").html("");
        EnterFoodSteps();
    });


    $("#TimeLimit i").click(function () {
        if ($(this).attr("class") == "fa fa-toggle-off") {
            $(this).removeClass("fa-toggle-off");
            $(this).addClass("fa-toggle-on");
            $("label[for=TimeInput]").show();
            $("#StepControl").css("height", "150px");
        }
        else {
            $(this).removeClass("fa-toggle-on");
            $(this).addClass("fa-toggle-off");
            $("label[for=TimeInput]").hide();
            $("#StepControl").css("height", "120px");
        }
    })



    $("#stoveTimeLimit i").click(function () {
        if ($(this).attr("class") == "fa fa-toggle-off") {
            $(this).removeClass("fa-toggle-off");
            $(this).addClass("fa-toggle-on");
            $("label[for=stoveTimeInput]").show();
            $("#stoveTopSetup").css("height", "350px");
        }
        else {
            $(this).removeClass("fa-toggle-on");
            $(this).addClass("fa-toggle-off");
            $("label[for=stoveTimeInput]").hide();
            $("#stoveTopSetup").css("height", "307px");
        }
    })



    $("#AddStep").click(function () {
        var TimeInput = $("#TimeInput").val();
        if ($("#TimeLimit .fa-toggle-off").length) {
            TimeInput = 1;
        }
        if (TimeInput == 1) {
            FoodSteps.push(["0", $("#HeatLevelInput").val()]);
        }
        else {
            FoodSteps.push([TimeInput, $("#HeatLevelInput").val()]);
        }
        EnterFoodSteps();

        $("#StepControl").toggle();
    });

    $(document).on('click', ".fa-trash", function () {
        var trashId = $(this).attr("id");
        trashId = trashId.substring(5, trashId.length);
        FoodSteps.splice($.inArray(FoodSteps[trashId], FoodSteps), 1);
        EnterFoodSteps();
    });

    function EnterFoodSteps() {
        TimeLeft = 0;
        $("#FoodSteps ol").html("");
        for (var i = 0; i < FoodSteps.length; i++) {
            if (FoodSteps[i][0] != 0) {
                $("#FoodSteps ol").append("<i id='trash" + i + "' class='fa fa-trash' aria-hidden='true'></i><li>" + FoodSteps[i][0] + " Minutes " + FoodSteps[i][1] + "\u00b0</li>");
            }
            else {
                $("#FoodSteps ol").append("<i id='trash" + i + "' class='fa fa-trash' aria-hidden='true'></i><li>" + FoodSteps[i][1] + "\u00b0</li>");
            }
            TimeLeft += Number(FoodSteps[i][0]);
        }

        if (FoodSteps.length != 0) {
            OvenTemp = FoodSteps[0][1];
            $("#OvenTemp").html(OvenTemp + "\u00b0");
            if (TimeLeft != 0) {
                $("#OvenTimeLeft").html("Time left: " + TimeLeft + " Minutes");
            }
            else {
                $("#OvenTimeLeft").html("");
            }
        }
        else {
            $("#OvenTemp").html("");
            $("#OvenTimeLeft").html("");
        }
    }




    //כפתור חזור - חזרה למסך הבית
    $("#back").click(function () {
        $("#appScreen").hide();
    });


    //פתיחת תפריט המבורגר

    $("#humburger").click(function () {
        $("#humburgerMenu").toggle();
    });

    var TopLeft = [];
    var TopRight = [];
    var BottomLeft = [];
    var BottomRight = [];
    var currentplace = "";

    showStoveTop();

    var StoveFoodNameInput = document.getElementById("StoveFoodNameInput");
    var stoveHeatLevelInput = document.getElementById("stoveHeatLevelInput");
    var stoveTimeInput = document.getElementById("stoveTimeInput");

    $(".AddStoveTop .fa-pencil").click(function () {
        $("#stoveTopSetup").toggle();
        $("#stoveTopSetup li").css("background-color", "white");
        var StoveTopPlace = $(this).parent().parent().attr("id");
        $("#stoveTopSetup #" + StoveTopPlace + "S").css("background-color", "black");

        StoveFoodNameInput.value = "";
        stoveHeatLevelInput.value = 100;
        stoveTimeInput.value = 1;
        currentplace = StoveTopPlace;

        $("#stoveTimeLimit .AddStoveTop .fa").addClass("fa-toggle-off");
        $("#stoveTimeLimit .AddStoveTop .fa").removeClass("fa-toggle-on");
        $("label[for=stoveTimeInput]").hide();
        $("#stoveTopSetup").css("height", "307px");


        if (eval(StoveTopPlace)[0] != null) {
            StoveFoodNameInput.value = eval(StoveTopPlace)[0];
            stoveHeatLevelInput.value = eval(StoveTopPlace)[1];

            if (eval(StoveTopPlace)[2] != false) {
                $("#stoveTimeLimit .AddStoveTop .fa").removeClass("fa-toggle-off");
                $("#stoveTimeLimit .AddStoveTop .fa").addClass("fa-toggle-on");

                $("label[for=stoveTimeInput]").show();
                $("#stoveTopSetup").css("height", "350px");
                stoveTimeInput.value = eval(StoveTopPlace)[3];
            }
        }
    });

    $("#StoveTopOK").click(function () {
        $("#stoveTopSetup").toggle();
        eval(currentplace)[0] = StoveFoodNameInput.value;
        eval(currentplace)[1] = stoveHeatLevelInput.value;

        if ($("#stoveTimeLimit .fa-toggle-on").length) {
            eval(currentplace)[2] = true;
            eval(currentplace)[3] = stoveTimeInput.value;
        }
        else {
            eval(currentplace)[2] = false;
            eval(currentplace)[3] = null;
        }
        showStoveTop();

    });

    function showStoveTop() {

        $("#stoveTop li").each(function () {
            var theStovePlaceForShow = $(this).attr("id");
            if (eval(theStovePlaceForShow)[0] != null) {
                $("#" + theStovePlaceForShow + " span").html(eval(theStovePlaceForShow)[0]);
                $("#" + theStovePlaceForShow + " .noEmptyIcons").html("<i class='fa fa-power-off' aria-hidden='true'></i>");
                if (eval(theStovePlaceForShow)[1] <= 135) {
                    $(this).css("background-image", "url(Images/stoveTopGasLow.png)");
                }
                else if (eval(theStovePlaceForShow)[1] > 135 && eval(theStovePlaceForShow)[1] <= 165) {
                    $(this).css("background-image", "url(Images/stoveTopGasMeduim.png)");
                }
                else if (eval(theStovePlaceForShow)[1] <= 200) {
                    $(this).css("background-image", "url(Images/stoveTopGasHigh.png)");
                }
            }
            else {
                $("#" + theStovePlaceForShow + " span").html("Empty");
                $("#" + theStovePlaceForShow + " .noEmptyIcons").html("");
                $(this).css("background-image", "url(Images/stoveTopGas.svg)");
            }
        });
    }

    $(".noEmptyIcons").click(function () {
        var stoveTopOff = $(this).parent().attr("id");
        eval(stoveTopOff).length = 0;
        showStoveTop();
    });


    //מעבר תפריטים לעמודים רלוונטים

    $(".nav").click(function () {
        var page = $(event.target).data("page");

        $("#demo").dragend({
            scrollToPage: page
        });
        $(event.target).addClass("active");
    });

    $("#humburgerMenu").click(function () {
        var page = $(event.target).data("page");

        if (typeof page == "undefined") {
            page = $(event.target).parent().data("page");
        }
        if (page <= 4) {
            $("#demo").dragend({
                scrollToPage: page
            });
        }
        else {
            $("#" + page).toggle();
        }
        $("#humburgerMenu").toggle();

    });

    $(".fa-window-close").click(function () {
        $(this).parent().toggle();
    });

    //GetImage

    $("#GetImage .btn").click(function () {
        $("#placeHolder").css("background-image", "url('Images/OvenPic.png')");
        $("#placeHolder").css("background-size", "600px");
        $("#Share").show();
    });
    $("#ImageTop").click(function () {

        $("#placeHolder").css("background-position", "300px");
    });

    $("#ImageFront").click(function () {
        $("#placeHolder").css("background-position", "450px");

    });
    $("#ImageLeft").click(function () {
        $("#placeHolder").css("background-position", "600px");
    });
    $("#ImageRight").click(function () {
        $("#placeHolder").css("background-position", "150px");

    });

    //הפעלה באמצעות קול
    annyangRec();
    function annyangRec() {
        if (annyang) {

            var TurnOn = function () {
                alert("on");
            }

            var TurnOff = function () {
                alert("off");
            }

            var commands = {
                'stove on': TurnOn,
                'stove off': TurnOff
            };

            annyang.addCommands(commands);

            annyang.debug(true);
            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }
    }

})