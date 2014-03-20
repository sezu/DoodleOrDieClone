window.DoodleOrDie = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("initializing...")

    DoodleOrDie.rooms = new DoodleOrDie.Collections.Rooms();
    DoodleOrDie.rooms.fetch({
      success: function(){
        console.log("success!")

        new DoodleOrDie.Routers.AppRouter({
          $rootEl: $('#content')
        });

        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  DoodleOrDie.initialize();
});
