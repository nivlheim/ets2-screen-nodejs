var ETCarsClient = require('etcars-node-client');
var SerialPort = require('serialport');
var port = new SerialPort('COM4', {
  baudRate: 9600
});

const parameters = {
    fuel: {
        current: 0,
        max: 0
    }
};

var etcars = new ETCarsClient();
// to enable debug console.log and console.error
etcars.enableDebug = true;

etcars.on('data', function(data) {
    let telemetry = data.telemetry.truck;
    // delete telemetry.wheelInfo;
    // delete telemetry.cabinOffset;
    // delete telemetry.worldPlacement;
    // delete telemetry.damages;
    // delete telemetry.forwardRatios;
    // delete telemetry.lights;
    // delete telemetry.warnings;
    parameters.fuel.current = parseInt(telemetry.fuel.currentLitres);
    parameters.fuel.max = telemetry.fuel.capacity;

    console.log(JSON.stringify(parameters, null, '  '));
    port.write(`${parameters.fuel.current},${parameters.fuel.max}`, ()=>{});
});

etcars.on('connect', function(data) {
    console.log('connected');
});

etcars.on('error', function(data) {
    console.log('etcars error');
});

etcars.connect();