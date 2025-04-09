var screen = {
    renderData: function (msg) {
    }
};

$("#valvesFuelLayout_1").load("src/ga/valves/Fuel.svg");

$( ".dev-writeButton" ).unbind().click(function() {

    var writeSignalId = $(this).attr('data-writeSignalId');
    var valueToWrite = $(this).attr('data-valueToWrite');
    var writeMode = $(this).attr('data-writeMode');
    if (!helpers.writteValue(writeSignalId, valueToWrite, writeMode)) {
        //alert('FAIL');
    }
});