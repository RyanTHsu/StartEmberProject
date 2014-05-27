Ember.LOG_BINDINGS = true;

App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_ACTIVE_GENERATION: true,
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.reopen({
    rootURL: '/blog/'
});

App.Router.map(function() {
    // list of all registered users
    this.resource('users', function() {
        // edit an existing user
        this.route('edit', {path: '/:user_id' });
    });

    this.resource('user', {
        path: 'user/:id'
    }, function() {
        // edit an existing user
        this.route('edit');
    });
    
    this.resource('usernew', {
        path: 'user/new'
    });
    // view an existing user account
    

    this.resource('roles');
    this.resource('groups');
    this.resource('angular');
    this.resource('backbone');
    this.resource('item1');
    this.resource('item2');
});


/*
Route
*/



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
    model: function(){
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
    model: function(){
        return this.modelFor('user');
    },

    /*renderTemplate: function() {
        this.render('user.edit',{into:'application'});
    }*/
});

App.UsersEditRoute = Ember.Route.extend({
    model: function(param){
        return this.store.find('user', param.user_id);
    },

    renderTemplate: function() {
        this.render('users.edit',{into:'application'});
    }
});

/*var users = [{
        id: '1',
        name: "Tom Cruise",
        description: "tomcruise@abc.com"
    }, {
        id: '2',
        name: "Barrack Obama",
        description: "barrackobama@abc.com"
    }

]*/

/*
Model
*/
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
});*/


// set storage key for this class of models
/*App.User.reopenClass({
    storageKey: 'user'
});*/

/*
Controller
*/

App.UsersController = Ember.ArrayController.extend({
    //contentBinding: 'user'
    deleteMode: false,

    sortProperties: ['name'],
    sortAscending: true,
    item: null,
    actions: {
        edit: function(model){
          this.transitionToRoute('users.edit', model);
        },

        delete: function(model){
            $('#dialog1').modal('show');

            //this.toggleProperty('deleteMode');
            this.set('item', model);
            //this.set('deleteMode', true);
            // this tells Ember-Data to delete the current user
            //model.deleteRecord();
            //model.save();
            // then transition to the users route
            //this.transitionToRoute('users');
        },

        cancelDelete: function(){
          // set deleteMode back to false
          //this.set('deleteMode', false);
          $('#dialog1').modal('hide');
        },

        confirmDelete: function(model){
          // this tells Ember-Data to delete the current user
          this.get('item').deleteRecord();
          this.get('item').save();
          // and then go to the users route
          //this.transitionToRoute('users');
          // set deleteMode back to false
         // this.set('deleteMode', false);
          $('#dialog1').modal('hide');
        }
    }
});

App.UserController = Ember.ObjectController.extend({
    actions: {
        edit: function(){
          this.transitionToRoute('user.edit');
        }
    }
});

App.UsersEditController = Ember.ObjectController.extend({
    //contentBinding: 'user'
    actions: {
        update: function(model){
            model.save();
            this.transitionToRoute("/users");
        },

        save: function(){
            var user = this.get('model');
            // this will tell Ember-Data to save/persist the new record
            user.save();
            // then transition to the current user
            this.transitionToRoute('users');
        },

        cancel: function(model){
            //Ember.run(model, "destroy" );
            //this.storage.refresh('user');
            this.transitionToRoute('/users');
        }
    }
});

App.UserEditController = Ember.ObjectController.extend({
    needs: ['user'],
    update: function(model){
            model.save();
            this.transitionTo("users");
    },

    cancel: function(){
            //Ember.run(model, "destroy" );
            //this.storage.refresh('user');
            this.transitionToRoute('users');
    }
});

App.UsernewController = Ember.ObjectController.extend({
    actions: {
        create: function(model) {
            // just before saving, we set the creationDate
            //this.get('model').set('creationDate', new Date());

            // create a record and save it to the store
            var newUser = this.store.createRecord('user', model);
            newUser.save();

            // Get the todo title set by the "New Todo" text field
            /*var title = this.get('newTitle');
            if (!title.trim()) {
                return;
            }*/

            // Create the new Todo model
            /*var user = this.store.createRecord('user', {
                name: name,
                isCompleted: false
            });*/

            // Clear the "New Todo" text field
            //this.set('newTitle', '');

            // Save the new model
            //user.save();
            this.transitionTo('users');
        },

        cancel: function() {
            this.transitionTo('users');
        }
    }
});

$(function() {
    $('.list-group-item').css('background', '#F8F8F8');

    $('.list-group-item').parent().children('div').collapse('hide');

    $('.list-group-item').click(function() {
        var item_id = $(this).attr('href');
        $(this).parent().children('div').collapse('hide');
        $(item_id).collapse('toggle');
    });

    $('.list-group > li').click(function() {
        / /
var color = $(this).css('color');
//$('.list-group > li').removeClass('active');
$(this).addClass('active');
$('.list-group-item').css('background', '#F8F8F8');
$('.list-group-item').css('color', '#000000');
$(this).parent().parent().prev('a').css('background', '#6495ED');
$(this).parent().parent().prev('a').css('color', '#ffffff');
});

/*var guid = (function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                     .toString(16)
                     .substring(1);
          }
          return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
          };
    })();*/

/*$('.tree-toggle').click(function () {
      $(this).parent().children('ul.tree').toggle(300);
    });*/

/*$('.tree-toggle').hover(function () {
      $(this).css('cursor', 'pointer');
    });*/

/*$('.list-group-item').mouseover(function(){
      $(this).addClass('active');
    });*/

/*$('.list-group-item').mouseout(function(){
      $(this).removeClass('active');
    });*/

$('.dropdown-menu input').click(function(event) {
event.stopPropagation();
});
});