App.Role = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    users: DS.hasMany('user', {
        async: true
    })
});

App.Role.FIXTURES = [{
    id: '1',
    name: "Admin",
    description: "This is role of admin",
    users: ['2']
}, {
    id: '2',
    name: "Customer",
    description: "This is role of customer",
}, {
    id: '3',
    name: "Trinity Super User",
    description: "This is Trinity super user",
}];