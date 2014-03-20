DoodleOrDie.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "":  "frontPage",
    "rooms/:id/steps": "play"
    "rooms/:id":  "roomShow",
    "rooms":  "roomsIndex",
  },

  frontPage: function() {
    //easy sign up, show chain examples, maybe I don't need?
    var frontPageView = new DoodleOrDie.Views.FrontPageView({})

    this._swapView(frontPageView)
  },

  roomsIndex: function() {
    //show all rooms, button/form/link to create room
    var roomsIndexView = new DoodleOrDie.Views.RoomsIndexView({
      collection: DoodleOrDie.rooms
    })

    this._swapView(roomsIndexView)
  },

  roomShow: function(id) {
    //fetch chains for particular room, everything = id 1
    //show images of chains
    //add "play" button on that room
    //clicking play should generate curr_chain_id for user, maybe?
    var room = DoodleOrDie.rooms.getOrFetch(id)

    var roomShowView = new DoodleOrDie.Views.RoomShowView({
      model: room
    })

    this._swapView(roomShowView)
  },

  play: function() {
    //show timeline of current user's doodle steps for this particular room
    //draw/describe on new/next chain
  }

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});