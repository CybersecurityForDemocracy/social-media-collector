const generic = require('./generic');

const facebookPreloader = data => generic(data, 'preload', ['./preload/coreDataGrab.js']);

module.exports = facebookPreloader;
