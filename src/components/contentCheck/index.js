var Abstract = require('../Abstract');
var moment = require('moment');

var _get = require('lodash/get');

module.exports = Abstract.extend({
    template: require('./check.html'),

    data: function() {
        return {
            loading: false,

            check: {
                title: null,
                name: null
            },

            isPass: false,
            isFail: false,
            isWarn: false,

            debugShown: false,

            checkTaskResult: null,
            checkTaskRawResult: null,
            execTaskResult: null

        };
    },

    ready: function() {
        var that = this;

        var req = this.getRequest();

        this.getApi().checks.getByName(req.params.name)
            .then(function (check) {
                that.check = check;
                that.checkTaskResult = _get(check, 'checkTask.result', null);
                that.checkTaskRawResult = _get(check, 'checkTask.rawResult', null);
                that.execTaskResult = _get(check, 'execTask.result', null);
                that.processStatus();
            })
            .catch(function (error) {
                that.logError(error);
            });

    },

    beforeDestroy: function () {

    },

    methods: {
        toggleDebug: function () {
            this.debugShown = !this.debugShown;
        },

        processStatus: function () {
            var status = _get(this.check, 'checkTask.result.status', null);

            switch (status) {
                case 'pass':
                    this.isPass = true;
                    this.isFail = false;
                    this.isWarn = false;
                    break;
                case 'fail':
                    this.isPass = false;
                    this.isFail = true;
                    this.isWarn = false;
                    break;
                case 'warn':
                    this.isPass = false;
                    this.isFail = false;
                    this.isWarn = true;
                    break;
            }
        },

        edit: function (event) {
            event.preventDefault();
            this.loadUrl('/edit/' + this.check.name);
        }
    },

    computed: {
        status: function () {
            var taskStatus = _get(this.check, 'checkTask.status', null);

            if (['created', 'started', 'queued'].indexOf(taskStatus) > -1) {
                return 'in progress';
            }

            var status = _get(this.check, 'checkTask.result.status', '-');

            return status;
        },

        message: function () {
            return _get(this.check, 'checkTask.result.message', '');
        },

        finishDate: function () {
            var finish = _get(this.check, 'checkTask.finishDate', null);

            if (!finish) {
                return '';
            }

            return moment.unix(this.check.checkTask.finishDate).fromNow();
        }
    },

    components: {

    }
});
