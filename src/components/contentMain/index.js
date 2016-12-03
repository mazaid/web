var Abstract = require('../Abstract');
var moment = require('moment');

module.exports = Abstract.extend({
    template: require('./main.html'),

    data: function () {
        return {
            loading: false,
            checks: [],
            filterByName: null
        };
    },

    ready: function () {
        var that = this;

        var req = this.getRequest();

        this.refresh();

        this.refreshInterval = setInterval(function () {
            that.refresh();
        }, 5000);
    },

    beforeDestroy: function () {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    },

    methods: {
        refresh: function () {
            var that = this;

            var query = {
                withCheckTasks: {
                    fields: 'id, checkId, status, result, timeout, startDate, finishDate'
                },
                limit: 100
            };

            this.getApi().checks.find(query)
                .then(function (data) {
                    that.checks = data.checks;
                })
                .catch(function (error) {
                    that.logError(error);
                });
        },

        add: function () {
            this.loadUrl('/add');
        }
    },

    components: {
        CheckList: require('../CheckList'),
    }
});
