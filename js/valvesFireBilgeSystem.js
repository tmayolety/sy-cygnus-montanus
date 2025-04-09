var screen = {
    renderData: function (msg) {
    }
};
$("#ValvesFireBilgeLayout").load("src/ga/valves/FireBilge.svg");

$( ".dev-writeButton" ).unbind().click(function() {

    var writeSignalId = $(this).attr('data-writeSignalId');
    var valueToWrite = $(this).attr('data-valueToWrite');
    var writeMode = $(this).attr('data-writeMode');
    if (!helpers.writteValue(writeSignalId, valueToWrite, writeMode)) {
        //alert('FAIL');
    }
});