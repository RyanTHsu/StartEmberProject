App.User = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    isChecked: DS.attr('boolean'),
    //roles: DS.hasMany('role'),
    roles: DS.attr('array'),
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

App.User.FIXTURES = [{
    id: '1',
    name: "Tom Cruise",
    description: "tomcruise@abc.com",
    isChecked: false,
    roles: []
}, {
    id: '2',
    name: "Barrack Obama",
    description: "barrackobama@abc.com",
    isChecked: false,
    roles: []
}, {
    id: '3',
    name: "Kobe Bryant",
    description: "kobebryant@abc.com",
    isChecked: false,
    roles: []
}, {
    id: '4',
    name: "David Chen",
    description: "david@abc.com",
    isChecked: false,
    roles: []
}, {
    id: '5',
    name: "Roger Lin",
    description: "roger@abc.com",
    isChecked: false,
    roles: []
}, {
    id: '6',
    name: "Rita Wang",
    description: "ritawang@abc.com",
    isChecked: false,
    roles: []
},
];







/*
App.Model = Ember.Object.extend(Ember.Copyable, {
    init: function() {
        // make sure that class has a storageKey property, otherwise throw an error
        // storageKey is the key that's used in localStorage
        if (this.constructor.storageKey == null) {
            throw new Error(Ember.String.fmt("%@ has to implement storageKey property", [this]));
        }
        if (this.get('guid') == null) {
            // guid is null when item is being created
            // set the guid for this item to new guid
            this.set('guid', this.createGUID());
        }
    },
    // default guid
    guid: null,

    createGUID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    },

    copy: function() {
        // copy method is used by the PhotoEditRoute to create a clone of the model
        // we create a clone to preserve the original incase Cancel button is clicked
        return Ember.run(this.constructor, 'create', this.serialize());
    },
    serialize: function() {
        // Our presistance layer doesn't know about the fields that custom models need to preserve
        // for this reason, we need a serialize function that will return a version of this model
        // that can be saved to localStorage
        //throw new Error(Ember.String.fmt("%@ has to implement serialize() method which is required to convert it to JSON.", [this]));
    }
});
*/

// add a class property ( aka static property )
/*App.Model.reopenClass({
    
    storageKey: null
});

App.User = App.Model.extend({
    name: '',
    description: '',
    // Tells the resistance layer what properties to save to localStorage
    // Ember Data does this for you.
    serialize: function() {
        return this.getProperties(["guid", "name", "description"]);
    }
});


// set storage key for this class of models
/*App.User.reopenClass({
    storageKey: 'user'
});*/