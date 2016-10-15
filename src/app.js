var _ = require('lodash');

var qs = require('qs');

var Vue = require('vue');

var VueSortable = require('vue-sortable');

Vue.use(VueSortable);

var routes = require('./config/routes');

var contentComponents = require('./components/contentComponents');

var Abstract = require('./components/Abstract');

_.each(contentComponents, function (component, name) {
    Vue.component(name, component);
});

var config = {

    base: 'http://localhost:8080/api',

    api: {

    },

};

var Api = require('./api');

var api = Api(config);

var logger = require('loglevel');

var page = require('page');

var app = new Vue(Abstract.extend({
    el: $('._body').get(0),
    template: require('./templates/index.html'),
    compiled: function () {
        this._api = api;
        this._logger = logger;
        this._router = page;
        this._request = null;
    },
    data: function () {
        return {
            contentComponent: 'empty-page',
            authToken: null
        };
    },
    components: {
        page: require('./components/Page')
    }
}));

var createRoute = function (route, app) {

    return function (req) {

        req.query = qs.parse(req.querystring);
        app._request = req;

        if (app.contentComponent == route.component &&
            app.$refs.page.$refs.contentComponent.initData
        ) {
            app.$refs.page.$refs.contentComponent.initData();
        } else {
            app.contentComponent = route.component;
        }
    };

};

_.each(routes, function (route) {
    page(route.route, createRoute(route, app));
});

page({click: false});
