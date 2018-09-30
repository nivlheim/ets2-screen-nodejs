const Telemetry = require('./lib/Telemetry');
const Display = require('./lib/Display');

const display = new Display('COM4');
const telemetry = new Telemetry(display.send.bind(display));

telemetry.start();