var Abstract = require('../Abstract');

module.exports = Abstract.extend({
    template: require('./form.html'),

    props: {
        form: {
            default: {
                name: null,
                title: null,
                checker: null,
                timeout: 60,
                data: null
            }
        },
        debug: false,
        submitButtonTitle: {
            default: 'add'
        },
        showDebug: false
    },

    data: function() {
        return {
            dataStringValue: null
        };
    },

    watch: {

        form: function() {
            if (this.form.data) {
                this.dataStringValue = JSON.stringify(this.form.data, null, '    ');
                this._editor.setValue(this.dataStringValue, -1);
            }
        }

    },

    ready: function() {

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

        this._editor.on('change', function() {
            that.dataStringValue = that._editor.getValue();

            try {
                that.form.data = JSON.parse(that.dataStringValue);
            } catch (e) {

            }
        });

    },

    methods: {
        nothing: function (event) {
            event.preventDefault();
        },

        submit: function(event) {
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