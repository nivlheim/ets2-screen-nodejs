var ETCarsClient = require('etcars-node-client');

class Telemetry {
    constructor(externalDataHandler) {
        this._etcars = new ETCarsClient();
        this._etcars.enableDebug = true;
        this._externalDataHandler = externalDataHandler;
        this._etcars.on('data', this._dataHandler.bind(this));
    }

    start() {
        this._etcars.connect();
    }

    _dataHandler(data) {
        if (!data.telemetry) {
            return;
        }
        let telemetry = data.telemetry.truck;

        let parameters = {
            engine: {
                enabled: telemetry.engineEnabled,
                rpm: telemetry.engineRPM,
                maxRpm: telemetry.maxEngineRPM
            },
            fuel: {
                current: parseInt(telemetry.fuel.currentLitres),
                max: telemetry.fuel.capacity,
                range: telemetry.fuelRange
            },
            speed: {
                speed: telemetry.speed,
                cruiseControlSpeed: telemetry.cruiseControlSpeed
            }
        };
        this._externalDataHandler(parameters);
    }

}

module.exports = Telemetry;
