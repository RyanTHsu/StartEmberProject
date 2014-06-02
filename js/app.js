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
        /*this.route('edit', {
            path: '/:user_id'
        });*/
    });

    // view an existing user account
    this.resource('user', {
        path: 'user/:user_id'
    }, function() {
        // edit an existing user
        this.route('edit');
    });

    //create an user
    this.resource('usernew', {
        path: 'user/new'
    });

    // list of all roles
    this.resource('roles');

    // view an existing role account
    this.resource('role', {
        path: 'role/:role_id'
    }, function() {
        // edit an existing user
        this.route('edit');
        this.route('addmember');
    });

    //create an role
    this.resource('rolenew', {
        path: 'role/new'
    });

    this.resource('groups');
    this.resource('angular');
    this.resource('backbone');
    this.resource('item1');
    this.resource('item2');
});

App.set('selectedNodes', Em.A());

$(function() {
    //$('.list-group-item').css('background', '#F8F8F8');
    //$('.list-group > li > a').css('color', '#6495ED');
    $('.list-group-item').parent().children('div').collapse('hide');

    $('.list-group-item').click(function() {
        var item_id = $(this).attr('href');
        $(this).parent().children('div').collapse('hide');
        $(item_id).collapse('toggle');
    });

    $('.list-group > li > a').click(function() {
        /*var color = window.getComputedStyle(
                document.querySelector('.list-group > li > a'), ':hover'
                ).getPropertyValue('color');*/

        $('.list-group > li > a').removeClass('darkblue');
        $(this).addClass('darkblue');
    });

    $('.list-group > li').click(function() {
        $('.list-group > li').css('background', '#ffffff');
        $('.list-group > li').css('color', '#F8F8F8');
        $(this).css('background', '#f2f2f2');
        //$(this).child().css('color', '#191970');
        //var color = $(this).css('color');
        //$('.list-group > li').removeClass('active');
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