const SerialPort = require('serialport');

class Display {
    constructor(serialPortIdentifier) {
        this._port = new SerialPort(
            serialPortIdentifier, 
            { baudRate: 9600 }
        );
    }

    send(data) {
        const message = JSON.stringify(data);
        this._port.write(message, ()=>{
            console.log('Data sent: ', message);
        });
    }
}

module.exports = Display;
