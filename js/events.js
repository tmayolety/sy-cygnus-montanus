var screen = {
    renderData: function (msg) {
    }
};


var events = {
    refreshEvents() {
        const query = {
            Section: "event",
            Limit: 50,
            Filter: 1
        };

        $.ajax({
            url: `${ACTIVE_SERVER}:${API.Port}/systemLog`,
            type: 'post',
            data: JSON.stringify(query),
            success: function (data) {
                try {
                    const json = JSON.parse(data);
                    events.render(json);
                } catch (e) {
                    console.error("Error parsing events data:", e);
                }
            }
        });
    },

    render(json) {
        if (!Array.isArray(json)) return;

        const $list = $('#eventLogList');
        $list.empty();

        $list.append(`
            <li class="thead" id="alarmLogListHeader">
                <div class="col-170 align-middle-center"><span>Time (GMT)</span></div>
                <div class="col-80 align-middle-center"><span>Event #</span></div>
                <div class="col-270-min align-middle-center"><span>Event Description</span></div>
            </li>
        `);

        json.forEach(item => {
            const id = item.ObjectId || item.alarmId;
            const desc = alarmData && alarmData[id] ? alarmData[id].alarmDescription : 'No description';
            $list.append(`
                <li>
                    <div class="col-170 align-middle-center"><span>${item.Date || item.alarmTime}</span></div>
                    <div class="col-80 align-middle-center"><span>${id}</span></div>
                    <div class="col-270-min align-middle-center"><span>${desc}</span></div>
                </li>
            `);
        });
    }
};

// Arranque inicial y refresco continuo
$(document).ready(() => {
    events.refreshEvents();
    setInterval(events.refreshEvents, 5000); // refrescar cada 5 segundos
});
