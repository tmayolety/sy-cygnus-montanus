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
            },
            error: function (xhr, status, error) {
                console.error("AJAX error loading events:", status, error);
            }
        });
    },

    render(json) {
        if (!Array.isArray(json)) return;

        const $list = $('#eventLogList');
        $list.empty();

        json.forEach(item => {
            const id = item.ObjectId || item.alarmId;
            const desc = alarmData?.[id]?.alarmDescription || 'No description';
            const date = item.Date || item.alarmTime || '';

            $list.append(`
                <li>
                    <div class="col-170 align-middle-center"><span>${date}</span></div>
                    <div class="col-80 align-middle-center"><span>${id}</span></div>
                    <div class="col-270-min align-middle-center"><span>${desc}</span></div>
                </li>
            `);
        });
    }
};

$(document).ready(() => {
    events.refreshEvents();
    setInterval(events.refreshEvents, 5000); // refrescar cada 5 segundos
});
