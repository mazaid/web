var superagent = require('superagent');
var _ = require('lodash');

var createCombine = require('data-combiner/create');

var Abstract = require('./Abstract');

var Chain = require('maf/Chain');

var Checks = Abstract.extends({

    constructor: function(config) {
        Abstract.class.call(this, config);

        this._combine = createCombine([
            ['map', {from: 'metadata.resultset', to: 'resultset'}],
            ['dataArrayToObject', {from: 'metadata.checkTasks', to: 'checkTasks', byKey: 'checkId'}],
            ['combine', {
                for: 'result',
                to: 'checks',
                each: [
                    ['add', {byKey: 'id', fromObject: 'checkTasks', to: 'checkTask'}]
                ]
            }]
        ]);
    },

    getByName(name) {

        var that = this;

        return new Promise(function (resolve, reject) {
            var request = superagent.get(that._base + '/checks/' + name).query({withCheckTasks: true});

            request.end(function (error, res) {

                if (error) {
                    return reject(error);
                }

                var check = res.body.result;

                check.checkTask = _.get(res.body, 'metadata.checkTask', null);

                resolve(check);

            });
        });

    },

    find: function (filters) {

        var that = this;

        return new Promise(function (resolve, reject) {

            var request = superagent.get(that._base + '/checks');

            if (filters) {
                request.query(filters);
            }

            request.end(function (err, res) {

                if (err) {
                    return reject(err);
                }

                var body = res.body;

                var result = that._combine(body);

                resolve(result);
            });

        });

    },

    start: function (name) {
        var that = this;

        return new Promise(function (resolve, reject) {
            var request = superagent.post(that._base + '/checks/' + name + '/check');

            request.end(function (err, res) {
                if (err) {
                    return reject(err);
                }

                var body = res.body;

                var result = that._combine(body);

                resolve(result);
            });
        });

    },

    add: function (data) {
        var that = this;

        return new Promise(function (resolve, reject) {
            var request = superagent.post(that._base + '/checks');

            request.send(data);

            request.end(function (err, res) {
                if (err) {
                    return reject(err);
                }

                var body = res.body;

                resolve(res.body.result);
            });
        });

    },

    update: function (name, data) {
    var that = this;

    return new Promise(function (resolve, reject) {
        var request = superagent.patch(that._base + '/checks/' + name);

        request.send(data);

        request.end(function (err, res) {
            if (err) {
                return reject(err);
            }

            var body = res.body;

            resolve(res.body.result);
        });
    });

}

});

module.exports = Checks;
