App.UsersController = Ember.ArrayController.extend({
    //contentBinding: 'user'
    deleteMode: false,

    sortProperties: ['name'],
    sortAscending: true,
    item: null,
    actions: {
        edit: function(model) {
            this.transitionToRoute('users.edit', model);
        },

        delete: function(model) {
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

        cancelDelete: function() {
            // set deleteMode back to false
            //this.set('deleteMode', false);
            $('#dialog1').modal('hide');
        },

        confirmDelete: function(model) {
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
        edit: function() {
            this.transitionToRoute('user.edit');
        }
    }
});

App.UsersEditController = Ember.ObjectController.extend({
    //contentBinding: 'user'
    actions: {
        update: function(model) {
            model.save();
            this.transitionToRoute("/users");
        },

        save: function() {
            var user = this.get('model');
            // this will tell Ember-Data to save/persist the new record
            user.save();
            // then transition to the current user
            this.transitionToRoute('users');
        },

        cancel: function(model) {
            //Ember.run(model, "destroy" );
            //this.storage.refresh('user');
            this.transitionToRoute('/user');
        }
    }
});

App.UserEditController = Ember.ObjectController.extend({
    needs: ['user'],
    update: function(model) {
        model.save();
        this.transitionTo("users");
    },

    cancel: function(model) {
        model.rollback();
        this.transitionToRoute('user');
    }
});

App.UsernewController = Ember.ObjectController.extend({
    actions: {
        create: function(model) {
            // just before saving, we set the creationDate
            //this.get('model').set('creationDate', new Date());

            // create a record and save it to the store
            var newUser = this.store.createRecord('user', model);

            var self = this;

            var onSuccess = function() {
                self.transitionToRoute('users');
            };

            var onFail = function() {
                // deal with the failure here
            };

            newUser.save().then(onSuccess, onFail);

            //newUser.save();

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
            //this.transitionTo('users');
        },

        cancel: function() {
            this.transitionTo('users');
        }
    }
});

App.RolesController = Ember.ArrayController.extend({
    deleteMode: false,

    sortProperties: ['name'],
    sortAscending: true,
    item: null,
    actions: {
        edit: function(model) {
            this.transitionToRoute('roles.edit', model);
        },

        delete: function(model) {
            $('#dialog1').modal('show');
            this.set('item', model);
        },

        cancelDelete: function() {
            $('#dialog1').modal('hide');
        },

        confirmDelete: function(model) {
            // this tells Ember-Data to delete the current role
            this.get('item').deleteRecord();
            this.get('item').save();
            $('#dialog1').modal('hide');
        }
    }
});



App.RoleController = Ember.ObjectController.extend({
    showDelete: false,
    needs: ['roleAddmember'],
    userslist: [],

    isChecked: function(key, value){
        var model = this.get('userslist');

        if (value === undefined) {
          // property being used as a getter
          return model.get('isChecked');
        } else {
          // property being used as a setter
          model.set('isChecked', value);
          //model.save();
          return value;
        }
    }.property('userslist.isChecked'),

    /*someArray: function(){
        var arr = Ember.A();
        this.get('userslist').forEach(function(item){
            arr.pushObject(item); //some object that is represents each specific combination
         });
       });
    
        return arr; 
    }.property('userslist'),*/

    actions: {
        edit: function() {
            this.transitionToRoute('role.edit');
        },

        delete: function(item){
            var selectedNodes = this.get('model.users');
            var child = this.get('controllers.roleAddmember')
            selectedNodes.removeObject(item);
            if(!child.get('userslist').contains(item))
                child.get('userslist').pushObject(item);
        },

        addMember: function() {
            //this.transitionToRoute('role.addmember');
            $('#usersModel').modal('show');
            this.set('showDelete', true);
            var selectedNodes = this.get('userslist');
            selectedNodes.setEach('isChecked', false);
            memberlist = this.get('model.users');

            var tempArr = [];

            memberlist.forEach(function(item){
                var nodes = selectedNodes.findBy('name', item.name);
                tempArr.pushObject(nodes);
            });

            tempArr.setEach('isChecked', true);
        },

        saveMember: function(){
            var selectedNodes = this.get('userslist').filterBy('isChecked', true);
            var memberlist = this.get('model.users');
            memberlist.clear();
            selectedNodes.forEach(function(item){
                if(!memberlist.contains(item)){
                    memberlist.pushObject(item);
                    //memberlist.sortBy('name');
                }
            });

            this.get('model').save();
            this.set('showDelete', false);
            $('#usersModel').modal('hide');

        },

        deleteMember: function(node){
            var memberlist = this.get('model.users');
            memberlist.removeObject(node);
            this.get('model').save();
            //alert("item: "+node.name);

            var nodes = this.get('userslist').findBy('name', node.name);
            /*var nodes = this.get('userslist').find(function(item, index, enumerable){
                    return item.name == node.name;
            });*/
            
            //alert("node:"+ nodes.name);

            nodes.set('isChecked', true);

            /*this.get('userslist').forEach(function(item){
                if(item.name == nodes.name){
                    item.set('isChecked', false);
                    //alert("select:"+ item.isChecked);
                }
            });*/
        }
    }
});

App.RoleEditController = Ember.ObjectController.extend({
    update: function() {
        this.get('model').save();
        this.transitionTo("roles");
    },

    cancel: function() {
        this.get('model').rollback();
        this.transitionToRoute('role');
    }
});

App.RoleAddmemberController = Ember.ObjectController.extend({
    needs: ['role'],
    member: null,
    isMember: false,
    userslist: [],

    init: function(){
        var parent = this.get('controllers.role');

        /*this.get('userslist').filter(function(item, index, self) {
            this.get('model.users').forEach(function(node){
                if(node == item) return false;
            });
            //if (this.get('model.users').contains(item)) { return false; }
        });*/
    },

    /*memberDidChange: function() {
        this.set('isMember', App.get('selectedNodes').contains(this.get('member').name));
    }.observes('member'),*/

    addItem: function(node) {
            //this.set('member', model);
            var selectedNodes = this.get('model.users');
            //alert("selectedNodes= " + selectedNodes);
            var tempArr = this.get('userslist');

            if (!selectedNodes.contains(node)) {
                selectedNodes.pushObject(node);
                this.get('userslist').removeObject(node);
                //alert("node= " + node.get('name'));
            }
            
    },

    update: function() {
            this.get('model').save();
            var parent = this.get('controllers.role');
            parent.set('showDelete', false);
            this.transitionTo("roles");
    },

    cancel: function() {
            this.get('model.users').invoke('rollback');
            this.get('model').rollback();
            var parent = this.get('controllers.role');
            parent.set('showDelete', false);
            this.transitionToRoute('roles');
    },

    isMemberDidChange: function() {
        //alert("isMember= " + this.get('isMember'));
        var selectedNodes = this.get('model.users');
        //alert("selectedNodes= " + selectedNodes);
        var tempArr = this.get('userslist');
        //alert("selectedNodes= " + selectedNodes);
        var node = this.get('member');
        //alert("node= " + node);
        if (this.get('isMember')) {
            if (!selectedNodes.contains(node)) {
                selectedNodes.pushObject(node);
                this.get('userslist').removeObject(node);
                //alert("node= " + node.get('name'));
            }
        }else{
                selectedNodes.removeObject(node);
                //alert("node= " + node.get('name'));
        }

    }.observes('isMember')
});

App.RolenewController = Ember.ObjectController.extend({
    actions: {
        create: function(model) {
            // just before saving, we set the creationDate
            //this.get('model').set('creationDate', new Date());

            // create a record and save it to the store
            var newRole = this.store.createRecord('role', model);

            var self = this;

            var onSuccess = function() {
                self.transitionToRoute('roles');
            };

            var onFail = function() {
                // deal with the failure here
            };

            newRole.save().then(onSuccess, onFail);

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
            //this.transitionTo('users');
        },

        cancel: function() {
            this.transitionTo('roles');
        }
    }
});

App.CheckboxItemController = Ember.ObjectController.extend({
    selected: function() {
        var activity = this.get('content');
        var children = this.get('parentController.elementsOfProperty');
        return children.contains(activity);
    }.property(),
    label: function() {
        return this.get('model.' + this.get('parentController.labelPath'));
    }.property(),
    selectedChanged: function() {
        var activity = this.get('content');
        var children = this.get('parentController.elementsOfProperty');
        if (this.get('selected')) {
            children.pushObject(activity);
        } else {
            children.removeObject(activity);
        }
    }.observes('selected')
});