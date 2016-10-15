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
    },
    {
        route: '/add',
        method: 'get',
        component: 'add-page'
    },
    {
    route: '/edit/:name',
    method: 'get',
    component: 'edit-page'
}
];
