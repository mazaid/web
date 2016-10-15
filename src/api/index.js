var _ = require('lodash');

module.exports = function(config) {

    var classes = {
        Checks: require('./Checks')
    };

    var api = {};

    api.checks = new classes.Checks(config);

    return api;
};
