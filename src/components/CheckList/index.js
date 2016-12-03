var Abstract = require('../Abstract');

var moment = require('moment');

var _get = require('lodash/get');

module.exports = Abstract.extend({
    template: require('./list.html'),

    props: {
        checks: [],
        filterByName: null
    },

    events: {

    },

    ready: function () {

    },

    methods: {

    },

    components: {
        item: Abstract.extend({
            template: require('./item.html'),

            props: {
                item: null,
                over: false,
                started: false,
                hasUserAnalyzeFn: false
            },

            methods: {
                mouseover: function () {
                    this.over = true;
                },
                mouseleave: function () {
                    this.over = false;
                },
                start: function () {

                    var that = this;

                    this.getApi().checks.start(this.item.name)
                        .then(function () {
                            that.started = true;
                        })
                        .catch(function (error) {
                            that.logError(error);
                        });

                },

                edit: function () {
                    this.loadUrl('/edit/' + this.item.name);
                }
            },

            ready: function () {
                if (this.item.checkTask && this.item.checkTask.status !== 'finished') {
                    this.started = true;
                }

                if (this.item && this.item.userAnalyzeFn) {
                    this.hasUserAnalyzeFn = true;
                }
            },

            computed: {
                status: function () {
                    // var taskStatus = _get(this.item, 'checkTask.status', null);
                    // if (['created', 'started', 'queued'].indexOf(taskStatus) > -1) {
                    //     return 'in progress';
                    // }

                    var status = _get(this.item, 'checkTask.result.status', '');

                    return status;
                },

                message: function () {
                    return _get(this.item, 'checkTask.result.message', '');
                },

                finishDate: function () {
                    var finish = _get(this.item, 'checkTask.finishDate', null);

                    if (!finish) {
                        return '';
                    }

                    return moment.unix(this.item.checkTask.finishDate).fromNow();
                }
            }
        })
    }
});
