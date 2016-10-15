module.exports = [
    {
        route: '/',
        method: 'get',
        component: 'main-page'
    },
    {
        route: '/checks/:name',
        method: 'get',
        component: 'check-page'
    }
];
