App.User = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    roles: DS.hasMany('role', {async: true})
});

App.User.FIXTURES = [{
    id: '1',
    name: "Tom Cruise",
    description: "tomcruise@abc.com",
    roles: ['1', '3']
}, {
    id: '2',
    name: "Barrack Obama",
    description: "barrackobama@abc.com",
    roles: ['3']
}, {
    id: '3',
    name: "Kobe Bryant",
    description: "kobebryant@abc.com",
    roles: ['1', '2']
}];

