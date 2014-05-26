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
    this.resource('users', {
        path: '/users'
    });
    this.resource('new', {
        path: 'user/new'
    });
    // view an existing user account
    this.resource('user', {
        path: '/user/:id'
    }, function() {
        // edit an existing user
        this.route('edit');
    });

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
            this.transitionTo('new');
        },
        goToUser: function(model) {
            this.transitionTo('user', model);
        }
    }

});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function(transition) {
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

App.NewRoute = Ember.Route.extend({
    actions: {
        create: function() {
            // Get the todo title set by the "New Todo" text field
            var title = this.get('newTitle');
            if (!title.trim()) {
                return;
            }

            // Create the new Todo model
            var user = this.store.createRecord('user', {
                name: name,
                isCompleted: false
            });

            // Clear the "New Todo" text field
            this.set('newTitle', '');

            // Save the new model
            user.save();
            this.transitionTo('users');
        }

        cancel: function() {
            this.transitionTo('users');
        }
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
    contentBinding: 'user'
});


App.UserEditController = Ember.ObjectController.extend({
    needs: ['user']
}); * /

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