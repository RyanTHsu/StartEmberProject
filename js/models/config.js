App.Config = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    isActivate: DS.attr('boolean'),
    type: DS.attr('string'),
    ip: DS.attr('string'),
    port: DS.attr('number'),
});

App.Config.FIXTURES = [];

