DoodleOrDie.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":  "frontPage",
    "rooms/:id":  "roomShow",
    "rooms":  "roomsIndex",
    "chains/:id": "chainShow",
    "users/:id": "userShow" //not implemented yet
  },

  frontPage: function() {
    //easy sign up, show chain examples, beginner page
    var frontPageView = new DoodleOrDie.Views.FrontPageView({})

    this._swapView(frontPageView)
  },

  roomsIndex: function() {
    //show all rooms, button/form/link to create rooms
    var roomsIndexView = new DoodleOrDie.Views.RoomsIndexView({
      collection: DoodleOrDie.rooms
    })

    this._swapView(roomsIndexView)
  },

  roomShow: function(id) {
    var room = DoodleOrDie.rooms.getOrFetch(id)

    var roomShowView = new DoodleOrDie.Views.RoomShowView({
      model: room
    })

    this._swapView(roomShowView)
  },

  chainShow: function(id) {
    var that = this
    var chain = new DoodleOrDie.Models.Chain({ id: id })

    chain.fetch({
      success: function() {
        var chainShowView = new DoodleOrDie.Views.ChainShowView({
          model: chain
        })

        that._swapView(chainShowView)

        //Hack to get canvas elements placed correctly
        //Subview Elements HAVE to be in DOM in order for correct placement
        var stepViews = chainShowView.subviews()["#steps"]

        for(var i = 0; i < stepViews.length; i++) {
          stepViews[i].waitForParentView = false
          stepViews[i].render();
        }

      },
      error: function() {
        //add some kind of error redirect?
      }
    })
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});