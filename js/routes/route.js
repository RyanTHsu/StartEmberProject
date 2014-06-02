App.ApplicationRoute = Ember.Route.extend({
    actions: {
        goToNewUser: function() {
            this.transitionTo('usernew');
        },
        goToUser: function(model) {
            this.transitionTo('user', model);
        }
    }

});

App.IndexRoute = Ember.Route.extend({
    Model: function(transition) {
        // redirect root
        this.transitionTo('/');
    }
});

App.UsersRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user');
    }
});

App.UserRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('user', params.id);
    }
});

App.UsernewRoute = Ember.Route.extend({
    model: function() {
        var obj = Ember.Object.extend(Ember.Copyable, {
            id: null,
            name: null,
            description: null,

            init: function() {
                /*if (Em.isNone(this.store.find('user'))) {
                  throw new Error(Ember.String.fmt("%@ has to implement storageKey property", [this]));
                }*/

                //if (Em.isNone(this.store.find('user', 1))){
                // guid is null when item is being created
                // set the guid for this item to new guid
                /*this.store.createRecord('user', {
                        id: this.createGUID()
                    });*/
                this.set('id', this.createGUID());
                //}
            },

            createGUID: function() {
                var s4 = function() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();

            },

            copy: function() {
                // copy method is used by the PhotoEditRoute to create a clone of the model
                // we create a clone to preserve the original incase Cancel button is clicked
                return Em.run(this.constructor, 'create', this.serialize());
            },

            serialize: function() {
                return this.getProperties(["id", "name", "description"]);
            }
        });

        return obj.create();
    }

    // reuse the user/edit template associated with the usersCreateController
    /*renderTemplate: function(){
        this.render('users.edit', {
          controller: 'usersCreate'
        });
    }*/
});

App.UserEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('user');
    },

    /*renderTemplate: function() {
        this.render('user.edit',{into:'application'});
    }*/
});

App.UsersEditRoute = Ember.Route.extend({
    model: function(param) {
        return this.store.find('user', param.id);
    },

    renderTemplate: function() {
        this.render('users.edit', {
            into: 'application'
        });
    }
});

App.RolesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('role');
    },

    actions: {
        goToNewRole: function() {
            this.transitionTo('rolenew');
        },
        goToRole: function(model) {
            this.transitionTo('role', model);
        }
    }
});

App.RoleRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('role', params.id);
    }
});

App.RolenewRoute = Ember.Route.extend({
    model: function() {
        var obj = Ember.Object.extend(Ember.Copyable, {
            id: null,
            name: null,
            description: null,

            init: function() {
                this.set('id', this.createGUID());
            },

            createGUID: function() {
                var s4 = function() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();

            },

            copy: function() {
                // copy method is used by the PhotoEditRoute to create a clone of the model
                // we create a clone to preserve the original incase Cancel button is clicked
                return Em.run(this.constructor, 'create', this.serialize());
            },

            serialize: function() {
                return this.getProperties(["id", "name", "description"]);
            }
        });

        return obj.create();
    }

    // reuse the user/edit template associated with the usersCreateController
    /*renderTemplate: function(){
        this.render('users.edit', {
          controller: 'usersCreate'
        });
    }*/
});

App.RoleEditRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('role');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        controller.set('model', model);
    }
});

App.RoleAddmemberRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('role');
        /*var fileterList = this.store.filter('user', function(user){
            if(user.get('name')) {return false;}
        });*/

        //var fileterList = this.store.find('user');

        /*var isMemberList = function(){
            return user.get('name').match('Kobe Bryant');
        }*/

        //fileterList.set('filterFunction', isMemberList);
        // Create a filter for all favorited posts that will be displayed in
        // the template. Any favorited posts that are already in the store
        // will be displayed immediately;
        // Kick off a query to the server for all posts that
        // the user has favorited. As results from the query are
        // returned from the server, they will also begin to appear.
    },

    userslist: function() {
        return this.store.find('user');
    },

    setupController: function(controller, model) {
        controller.set('userslist', this.userslist());
    }
});