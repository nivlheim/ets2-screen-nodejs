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
                enabled: telemetry.engineEnabled
            },
            fuel: {
                current: parseInt(telemetry.fuel.currentLitres),
                max: telemetry.fuel.capacity,
                range: 0
            }
        };
        this._externalDataHandler(parameters);
    }

}

module.exports = Telemetry;
