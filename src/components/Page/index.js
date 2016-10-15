var Abstract = require('../Abstract');

// var components = require('../index');

module.exports = Abstract.extend({

    template: require('./page.html'),
    //
    props: {
        contentComponentName: null
    },

    data: function() {
        return {

        };
    },

    components: {
        menu: require('../Menu'),
        // userMenu: require('../UserMenu')
    }

});
