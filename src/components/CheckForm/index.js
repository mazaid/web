var Abstract = require('../Abstract');

module.exports = Abstract.extend({
    template: require('./form.html'),

    props: {
        form: {
            default: {
                name: null,
                title: null,
                checker: 'curl',
                timeout: 10,
                data: null,
                userAnalyzeFn: null
            }
        },
        debug: false,
        submitButtonTitle: {
            default: 'add'
        },
        showDebug: false
    },

    data: function () {
        return {
            dataStringValue: null
        };
    },

    watch: {

        form: function () {
            if (this.form.data) {
                this.dataStringValue = JSON.stringify(this.form.data, null, '    ');
                this._editor.setValue(this.dataStringValue, -1);
            }

            if (this.form.userAnalyzeFn) {
                this._userAnalyzeFnEditor.setValue(this.form.userAnalyzeFn, -1);
            }
        }

    },

    ready: function () {

        var that = this;

        this._editor = ace.edit('data');
        var JavaScriptMode = ace.require('ace/mode/javascript').Mode;

        this._editor.session.setMode(new JavaScriptMode());
        this._editor.renderer.setShowGutter(true);
        this._editor.setShowPrintMargin(false);

        if (this.form.data) {
            this.dataStringValue = JSON.stringify(this.form.data, null, '    ');
            this._editor.setValue(this.dataStringValue, -1);
        }

        this._editor.on('change', function () {
            that.dataStringValue = that._editor.getValue();

            try {
                that.form.data = JSON.parse(that.dataStringValue);
            } catch (e) {

            }
        });

        this._userAnalyzeFnEditor = ace.edit('userAnalyzeFn');
        var JavaScriptMode = ace.require('ace/mode/javascript').Mode;

        this._userAnalyzeFnEditor.session.setMode(new JavaScriptMode());
        this._userAnalyzeFnEditor.renderer.setShowGutter(true);
        this._userAnalyzeFnEditor.setShowPrintMargin(false);

        if (this.form.userAnalyzeFn) {
            this._userAnalyzeFnEditor.setValue(this.form.userAnalyzeFn, -1);
        }

        this._userAnalyzeFnEditor.on('change', function () {
            var value = that._userAnalyzeFnEditor.getValue();

            if (typeof value === 'string') {
                value = value.trim();
            }

            if (value) {
                that.form.userAnalyzeFn = value;
            } else {
                that.form.userAnalyzeFn = null;
            }

        });

    },

    methods: {
        nothing: function (event) {
            event.preventDefault();
        },

        submit: function (event) {
            event.preventDefault();
            this.$emit('submit', this.form);
        },

        toggleDebug: function (event) {
            this.showDebug = !this.showDebug;
        }

        // setFormData(formData) {
        //     if (formData.data) {
        //         this.dataStringValue = JSON.stringify(formData.data, null, '    ');
        //         editor.setValue(this.dataStringValue, -1);
        //     }
        // }
    }
});
