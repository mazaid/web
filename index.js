var express = require('express');
var fs = require('fs');

var logger = require('log4js').getLogger('mazaid-web');

var ServiceConfig = require('maf/Service/Config');

var serviceConfig = new ServiceConfig(logger, {
    configPath: '/data/etc/mazaid/web/config.json',
    consul: {
        key: 'services/mazaid/web',
        timeout: 1000
    },
    schema: require(`${__dirname}/config.schema`)
});

serviceConfig.load()
    .then(() => {

        var config = serviceConfig.toObject();

        var app = express();

        require('nprof/express/register')(logger, app, config.nprof);

        app.use('/', express.static(__dirname + '/public'));

        app.get('/feConfig', function (req, res) {
            res.json(config.feConfig);
        });

        app.listen(config.port, config.host, function () {
            logger.info(`listen on ${config.host}:${config.port}`);
        });
    })
    .catch(function (error) {
        logger.fatal(error);
    });
