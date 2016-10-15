// var fs = require('fs');

var Abstract =  {

    methods: {

        // getTemplate: function (path) {
        //     return fs.readFileSync(path).toString();
        // },

        navigate: function (event) {

            var trgt = (event.currentTarget) ? event.currentTarget : event.target;

            var path = trgt.pathname;

            if (trgt.search) {
                path += trgt.search;
            }

            this.$root._router(path);

            event.preventDefault();
        },

        setContentReady: function () {
            this.$emit('contentReady');
        },

        scrollTop: function () {
            // $('html').scrollTop(0);
            window.scroll(0, 0);
        },

        processError: function (error) {

            if (!error.status) {
                this.$dispatch('serverError');
                this.getLogger().error(error);
                return;
            }

            if (error.status == 404) {
                this.$dispatch('notFound');
                return;
            }

            this.getLogger().error(error);

            this.$dispatch('serverError');

            return;

        },

        logError: function (error) {
            this.getLogger().error(error);
        },

        loadUrl: function (url) {
            return this.$root._router(url);
        },

        getApi: function (name) {
            if (!name) {
                return this.$root._api;
            }

            return this.$root._api[name];
        },

        getLogger: function () {
            return this.$root._logger;
        },

        getRequest: function () {
            return this.$root._request;
        },

        getUser: function () {
            return this.$root._user;
        },

        setMeta: function (meta) {
            if (meta) {
                if (meta.title) {
                    document.title = meta.title;
                }
            }
        },
        _clone: function (object) {
            return JSON.parse(JSON.stringify(object));
        }
    }
};

var _ = require('lodash');

module.exports = {
    extend: function (obj) {
        return _.merge(_.cloneDeep(Abstract), obj);
    },
    getTemplate: function (path) {
        return fs.readFileSync(path).toString();
    }
};
