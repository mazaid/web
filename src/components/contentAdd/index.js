var Abstract = require('../Abstract');

module.exports = Abstract.extend({
    template: require('./add.html'),

    data: function () {
        return {
            form: {
                name: null,
                title: null,
                checker: 'curl',
                timeout: 10,
                data: null
            }
        };
    },

    ready: function () {

    },

    components: {
        'add-form': require('../CheckForm')
    },

    methods: {
        add: function (form) {
            var that = this;

            this.getApi().checks.add(form)
                .then(function () {
                    that.loadUrl('/');
                })
                .catch(function (error) {
                    that.getLogger().error(error);
                });
        }
    }
});
