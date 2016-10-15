var Abstract = require('../Abstract');

module.exports = Abstract.extend({
    template: require('./edit.html'),

    data: function () {
        return {
            name: null,
            form: {
                name: null,
                title: null,
                checker: 'http',
                data: null
            }
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
                data: form.data
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
