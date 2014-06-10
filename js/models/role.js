App.Role = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    users: DS.attr('array'),
    //users: DS.hasMany('user')
    isChecked: DS.attr('boolean')
});

DS.Model.reopen({
   clone: function() {
    var model = this,
        attrs = model.toJSON(),
        class_type = model.constructor;

    var root = Ember.String.decamelize(class_type.toString().split('.')[1]);

    /**
     * Need to replace the belongsTo association ( id ) with the
     * actual model instance.
     *
     * For example if belongsTo association is project, the
     * json value for project will be:  ( project: "project_id_1" )
     * and this needs to be converted to ( project: [projectInstance] )
     *
     */
    this.eachRelationship(function(key, relationship){
      if (relationship.kind == 'belongsTo') {
        attrs[key] = model.get(key)
      }
    })

    return Ember.copy(attrs, true);
    //this.store.createRecord(root, attrs).save();
  }

})

App.Role.FIXTURES = [{
    id: '1',
    name: "Admin",
    description: "This is role of admin",
    //users: [{ id: '1', name: 'Tom Cruise', description: 'no comment'}]
    users: [],
    isChecked: false
}, {
    id: '2',
    name: "Customer",
    description: "This is role of customer",
    users: [],
    isChecked: false
}, {
    id: '3',
    name: "Trinity Super User",
    description: "This is Trinity super user",
    users: [],
    isChecked: false
}];