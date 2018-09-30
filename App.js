var ETCarsClient = require('etcars-node-client');
const Display = require('./lib/Display');

const display = new Display('COM4');
const parameters = {
    engine: {
        enabled: 0
    },
    fuel: {
        current: 0,
        max: 0,
        range: 0
    }
};

var etcars = new ETCarsClient();
// to enable debug console.log and console.error
etcars.enableDebug = true;

etcars.on('data', function(data) {
    if (!data.telemetry) {
        return;
    }
    let telemetry = data.telemetry.truck;
    // delete telemetry.wheelInfo;
    // delete telemetry.cabinOffset;
    // delete telemetry.worldPlacement;
    // delete telemetry.damages;
    // delete telemetry.forwardRatios;
    // delete telemetry.lights;
    // delete telemetry.warnings;
    // console.log(telemetry);
    parameters.fuel.current = parseInt(telemetry.fuel.currentLitres);
    parameters.fuel.max = telemetry.fuel.capacity;
    parameters.engine.enabled = telemetry.engineEnabled;
    display.sendData(parameters);
});

etcars.on('connect', function(data) {
    console.log('connected');
});

etcars.on('error', function(data) {
    console.log('etcars error');
});

etcars.connect();