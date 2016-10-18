var express = require('express');

var logger = require('log4js').getLogger('mazaid-web');

var config = {
    host: null,
    port: 8081
};

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.listen(config.port, config.host, function () {
    logger.info(`listen on ${config.host}:${config.port}`);
});