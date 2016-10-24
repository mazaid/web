var express = require('express');
var fs = require('fs');

var logger = require('log4js').getLogger('mazaid-web');

var configPath = '/data/etc/mazaid/web/config.json';

if (fs.existsSync(configPath)) {
    try {
        var config = JSON.parse(fs.readFileSync(configPath).toString());
    } catch (e) {
        logger.fatal(new Error('invalid JSON config ' + configPath));
        throw e;
    }
}

var app = express();

require('nprof/express/register')(logger, app, config.nprof);

app.use('/', express.static(__dirname + '/public'));

app.get('/feConfig', function (req, res) {
    res.json(config.feConfig);
});

app.listen(config.port, config.host, function () {
    logger.info(`listen on ${config.host}:${config.port}`);
});
