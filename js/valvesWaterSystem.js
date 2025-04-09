var screen = {
    renderData: function (msg) {
    }
};
$("#ValvesWaterLayout").load("src/ga/valves/Water.svg");

$( ".dev-writeButton" ).unbind().click(function() {

    var writeSignalId = $(this).attr('data-writeSignalId');
    var valueToWrite = $(this).attr('data-valueToWrite');
    var writeMode = $(this).attr('data-writeMode');
    if (!helpers.writteValue(writeSignalId, valueToWrite, writeMode)) {
        //alert('FAIL');
    }
});