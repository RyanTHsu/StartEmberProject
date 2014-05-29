App.Role = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string')
});

App.Role.FIXTURES = [{
    id: '1',
    name: "David Chen",
    description: "dc@abc.com"
}, {
    id: '2',
    name: "Roger Lin",
    description: "roger@abc.com"
}, {
    id: '3',
    name: "Rita Wang",
    description: "rita@abc.com"
}];