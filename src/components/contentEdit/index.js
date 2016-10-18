var Abstract = require('../Abstract');

var _get = require('lodash/get');

module.exports = Abstract.extend({
    template: require('./edit.html'),

    data: function () {
        return {
            name: null,
            check: null,
            form: {
                name: null,
                title: null,
                checker: 'http',
                data: null,
                userAnalyzeFn: null
            },
            checkTaskResult: null,
            checkTaskRawResult: null,
            execTaskResult: null
        };
    },

    ready: function () {
        var req = this.getRequest();
        var name = req.params.name;

        var that = this;

        this.getApi().checks.getByName(name)
            .then(function (check) {
                that.name = name;
                that.form = check;

                that.check = check;
                that.checkTaskResult = _get(check, 'checkTask.result', null);
                that.checkTaskRawResult = _get(check, 'checkTask.rawResult', null);
                that.execTaskResult = _get(check, 'execTask.result', null);
            })
            .catch(function (error) {
                that.processError(error);
            });

    },

    components: {
        'edit-form': require('../CheckForm')
    },

    methods: {
        update: function (form) {
            var that = this;

            var update = {
                name: form.name,
                title: form.title,
                checker: form.checker,
                timeout: form.timeout,
                data: form.data,
                userAnalyzeFn: form.userAnalyzeFn
            };

            this.getApi().checks.update(this.name, update)
                .then(function () {
                    that.loadUrl('/');
                })
                .catch(function (error) {
                    that.getLogger().error(error);
                });
        }
    }
});
