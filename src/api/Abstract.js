var _ = require('lodash/core');
var request = require('superagent');

function Abstract(config, api) {
    this._config = config;
    this._base = config.base;
    this._api = api;

    this.authToken = null;
    this.user = null;
}

Abstract.prototype.setAuthToken = function (token) {
    this.authToken = token;
};

Abstract.prototype.getAuthToken = function () {
    return this.authToken;
};

Abstract.prototype.setUser = function (user) {
    this.user = user;
};

Abstract.prototype.getUser = function () {
    return this.user;
};

Abstract.prototype.GET = function(url, query, options) {

    if (this.authToken) {
        if (!query) {
            query = {};
        }

        query.authToken = this.authToken;
    }

    return new Promise(function(resolve, reject) {
        var r = request.get(url);

        if (query) {
            r.query(query);
        }

        r.end(function(err, res) {
            if (err) {
                return reject(err);
            }

            resolve({
                status: res.status,
                body: res.body
            });
        });
    });

};

Abstract.prototype.POST = function(url, body, options) {

    if (this.authToken) {

        if (!body) {
            body = {};
        }

        body.authToken = this.authToken;
    }

    return new Promise(function(resolve, reject) {
        var r = request.post(url);

        if (body) {
            r.send(body);
        }

        r.end(function(err, res) {
            if (err) {
                return reject(err);
            }

            resolve({
                status: res.status,
                body: res.body
            });
        });
    });

};

Abstract.prototype.DELETE = function(url, body) {

    if (this.authToken) {

        if (!body) {
            body = {};
        }

        body.authToken = this.authToken;
    }

    return new Promise(function(resolve, reject) {
        var r = request.delete(url);

        if (body) {
            r.send(body);
        }

        r.end(function(err, res) {
            if (err) {
                return reject(err);
            }

            resolve({
                status: res.status,
                body: res.body
            });
        });
    });

};

module.exports = {
    class: Abstract,

    extend: function(constr) {

        constr.prototype = _.create(Abstract.prototype, {
            'constructor': constr
        });

        return constr;

    },

    extends: function (obj) {

        var constr = obj.constructor;

        constr.prototype = _.create(Abstract.prototype, obj);

        return constr;
    }
};
