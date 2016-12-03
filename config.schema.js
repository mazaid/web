var joi = require('joi');

var config = {
    host: 'localhost',
    port: 8081,

    feConfig: {
        base: 'http://localhost:8080/api'
    },

    nprof: {
        snapshotPath: '/data/tmp/mazaid-web'
    }

};

module.exports = {
    host: joi.string().allow(null).default(config.host),
    port: joi.number().default(config.port),

    feConfig: joi.object().default(config.feConfig).keys({
        base: joi.string().default(config.feConfig.base)
    }),

    nprof: joi.object().default(config.nprof).keys({
        snapshotPath: joi.string().default(config.nprof.snapshotPath)
    })

};
