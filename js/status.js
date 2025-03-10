let socketStatus = null;
let APIStatus = null;
let loadingStatus = null;
let socketConnected = false;
let lastNotificationTime = 0;
let socketConnectionEstablished = Vue.ref(false);
let APIConnectionEstablished = Vue.ref(false);
let componentLoadingText = Vue.ref('');

$( document ).ready(function() {

    status.initConnections ();

    setTimeout(function() {


        console.log("Paso 1: Intentando conectar socket...");

        let initSocketPromise = new Promise(function(resolve) {

            sock.on('deviceStats', function(msg) {
                console.log("Paso 2: Socket conectado, datos recibidos.");
                sock.off('deviceStats');
                socketConnectionEstablished.value = true;
                helpers.clockAndDate();
                resolve(true);
            });
        });

        initSocketPromise.then(function() {
            console.log("Paso 3: Verificando API...");
            let checkAPIPromise = new Promise(function(resolve) {

                $.getJSON(ACTIVE_SERVER + ":" + API.Port + "/devices", function() {
                    console.log("Paso 4: API respondió correctamente.");
                    APIConnectionEstablished.value = true;
                    resolve(true);
                })
                .fail(function() {
                    APIConnectionEstablished.value = false;
                });
            });

            checkAPIPromise.then(function() {
                console.log('Paso 5: Datos obtenidos, continuando...');
            });

        });

    }, 1000);

});


const status = {
    initConnections: function () {

        console.log('Init Connection...');

        let connectServer_1 = new Promise(function(resolve, reject) {

            setTimeout( function() {
                if (ACTIVE_SERVER == null) {
                    reject(true);
                    sock.disconnect();
                }
            }, 2000);

            sock = io.connect(SERVER_1_IP + ':8000', {
                'reconnection': true,
                'reconnectionDelay': 500,
                'reconnectionAttempts': 1,
                transports: ['websocket'],
                upgrade: false
            });

            sock.on('connect', function(){
                console.log('Socket connected successfully.');
                clearTimeout(socketConnected);
                $('#alarmPLC').removeClass('open');
                ACTIVE_SERVER = SERVER_1_IP;
                STANDBY_SERVER = SERVER_2_IP;
                SERVER_1_ACTIVE = true;
                resolve(true);

            });
            sock.on('error', function(err) {
                console.error('Socket encountered an error:', err);
            });

        });
        connectServer_1.then(function() {
            console.log('Connected to Server 1');
            status.initSocketConnections();


        }).catch(function() {

            console.log('Server 1 failed. Connecting Server 2');

            let connectServer_2 = new Promise(function(resolve, reject) {

                setTimeout( function() {
                    if (ACTIVE_SERVER == null) {
                        sock.disconnect();
                        reject(true);
                    }
                }, 2000);

                sock = io.connect(SERVER_2_IP + ':8000' , {
                    'reconnection': true,
                    'reconnectionDelay': 500,
                    'reconnectionAttempts': 1,
                    transports: ['websocket'],
                    upgrade: false
                });

                sock.on('connect', function(){
                    clearTimeout(socketConnected);
                    $('#alarmPLC').removeClass('open');
                    ACTIVE_SERVER = SERVER_2_IP;
                    STANDBY_SERVER = SERVER_1_IP;
                    SERVER_2_ACTIVE = true;
                    resolve(true);
                });
            });

            connectServer_2.then(function() {
                console.log('Connected to Server 2');
                status.initSocketConnections();


            }).catch(function() {
                sock.disconnect();
                console.log('BOTH SERVER FAILED TO CONNECT. Retrying again in 20 seconds...');
                setTimeout( function() {
                    status.initConnections ();
                }, 20000);
            });
        });

    },
    initSocketConnections: function () {

        console.log('Initializing socket connections...');

        setTimeout( function() {
            console.log('Subscribing to channels...');
            status.subscribeChannels();
        }, 12000);

        sock.on('disconnect', function(){
            console.log('Socket disconnected. Reconnecting in 2 seconds...');
            socketConnected = setTimeout(function() {

                $('#popUpAlarmTitle').html('SERVER CONNECTION LOST');
                $('#popUpAlarmMessage').html('The connection between this screen and the server has been lost.');
                $('#alarmPLC').addClass('open');

                sock.disconnect();
                ACTIVE_SERVER = null;

                status.initConnections ();

            }, 2000);

        });

        sock.on('connect', function(){
            console.log('Socket reconnected successfully.');
            clearTimeout(socketConnected);
            $('#alarmPLC').removeClass('open');

        });

        sock.on('reconnect_failed', function() {
            console.error('Socket failed to reconnect.');
        });

        //SIGNAL LIMITS CHANNEL SUBSCRIBE
        sock.on('limits', function(msg) {

            var json = JSON.parse(msg);
            if (typeof json.HH !== 'undefined')
            {
                helpers.limitChange(json.alarmId, json.HH, json.H, json.L, json.LL);
            }

            if (typeof json.delay !== 'undefined')
            {
                $('#alarmDelay_' + json.alarmId).html(json.delay/1000);
            }

            if (typeof json.Preset !== 'undefined')
            {
                helpers.setVisualUMSSettings(json.Preset, json.ElevateTimer);
                $('#presetUMS').val(parseInt(json.Preset));
            }

            if (typeof json.UMS !== 'undefined')
            {
                helpers.coundownUMSControl(json);
            }

            if (typeof json.ClearDeadman !== 'undefined')
            {
                var presetUMS = parseInt($('#presetUMS').val());
                if (presetUMS > 0) {
                    $('#UMSTextBig').html('UNATTENDED');
                }
            }

            if (typeof json.type !== 'undefined')
            {
                $('#alarmType_' + json.alarmId ).removeClass(typeAClass);
                switch (json.type) {
                    case 1:
                        alarms.alarmTypePreAlarm(json.alarmId);
                        break;
                    case 0:
                        alarms.alarmTypeAlarm(json.alarmId);
                        break;
                    }

            }
        });

        sock.on('sync', function(msg) {

            var json = JSON.parse(msg);
            document.getElementById("timeZone").value = json.Action;
            $("#timeZoneSelector").val(json.Type);

        });
    },
    subscribeChannels: function () {
        console.log('Entering subscribeChannels function...');
    
        try {
            // SIGNIFICAR DISPOSITIVOS PARA SUSCRIBIRSE A LOS CANALES
            console.log('Iterating through deviceData...');
            $.each(deviceData, function(key, value) {
                console.log(`Checking device: ${key}, IP: ${value.IP}`);
    
                if (value.IP != '0') {
                    console.log('Channel connected: ' + key);
                    sock.on(key, function(msg) {
                       
                        try {
                            screen.renderData(msg);
                            bringValues(msg);
                        } catch (error) {
                            console.error(`Error rendering data for channel ${key}:`, error);
                        }
                    });
                } else {
                    console.warn(`Device ${key} has IP set to 0, skipping channel connection.`);
                }
            });
    
            // EVENTO `deviceStats`
            console.log('Setting up "deviceStats" event listener...');
            sock.on("deviceStats", function(msg) {
               
    
                try {
                    var item = JSON.parse(msg);
                    console.log("Received deviceStats:", item); 
                    if ($("#deviceLast_" + item.deviceId).length) {
                        //console.log(`Updating device ${item.deviceId} data...`);
    
                        if (item.deviceId == 1) {
                            if ($('#popUpAlarmTitle').text() == 'ALARM PLC CONNECTION LOST') {
                                $('#alarmPLC').removeClass('open');
                                console.log('Removed PLC alarm popup.');
                            }
                        }
    
                        document.getElementById('deviceLast_' + item.deviceId).innerHTML = item.last.toFixed(1);
                        document.getElementById('deviceTotal_' + item.deviceId).innerHTML = item.total.toFixed(1);
                    } else {
                        console.warn(`Device element "deviceLast_${item.deviceId}" not found.`);
                    }
                } catch (error) {
                    console.error('Error processing "deviceStats" message:', error);
                }
            });
    
            // ACTIVACIÓN DE LAS ALARMAS
            console.log('Subscribing to active alarms...');
            alarms.activeAlarmSubscribe();
    
        } catch (error) {
            console.error('Error in subscribeChannels function:', error);
        }
    
        console.log('Exiting subscribeChannels function.');
    }
}

function bringValues(msg) {
    var json = JSONH.parse(msg);
    json.forEach(function (item) {

        if (typeof valueRaw[item.signalId] == 'undefined') {
            valueRaw[item.signalId] =  Vue.ref();
            valueEscalated[item.signalId] = Vue.ref();
            valueFiltered[item.signalId] = Vue.ref();
        } else {
            valueRaw[item.signalId].value = item.raw;
            valueEscalated[item.signalId].value = item.escalatedValue;
            valueFiltered[item.signalId].value = item.filteredValue;
        }

    });
}


