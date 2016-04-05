var env = process.env.NODE_ENV || 'development';
var log4js = require('log4js');
var path = require('path');
env = env == "test" && 'development' || env;
var logConfigDir=path.resolve(__dirname, './configs/','log4js.'+env+'.json');
log4js.configure(logConfigDir);
var logger = log4js.getLogger(__filename);
logger.debug('current env is [', process.env.NODE_ENV, '], load configuration from [config.' + env +'.js]');

var socketiologger = log4js.getLogger('socket.io');

var config = require(path.resolve(__dirname, './configs','config.'+env));

module.exports = {
    logger:socketiologger,
    config:config,

}