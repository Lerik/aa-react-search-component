import config from '../../config.json';
const EventEmitter = require('events');
const libReady = new EventEmitter();

let io;
module.exports = (socketioLib) => {
  if (socketioLib) {
    io = socketioLib;
    libReady.emit('ready');
    libReady.removeAllListeners('ready');
  }
  return module.exports;
};

module.exports.configureSocket = (callback) => {
  function setSocket() {
    const options = {
      transports: ['websocket'],
    };

    const socket = io(config.Backend, options);

    // socket.once('connect', () => console.log('connected')); // eslint-disable-line

    callback(socket);
  }

  if (io) {
    setSocket();
  } else {
    libReady.on('ready', setSocket);
  }

  return module.exports;
};
