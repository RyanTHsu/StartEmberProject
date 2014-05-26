App.User = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('boolean')
});

App.User.FIXTURES = [{
    id: '1',
    name: "Tom Cruise",
    description: "tomcruise@abc.com"
}, {
    id: '2',
    name: "Barrack Obama",
    description: "barrackobama@abc.com"
}, {
    id: '3',
    name: "Kobe Bryant",
    description: "kobebryant@abc.com"
}];