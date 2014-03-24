DoodleOrDie.Collections.RoomChains = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Chain,

  // url: function() {
  //   return this.room.url() + "/chains"
  // },

  url: "/chains",

  initialize: function(options) {
    this.room = options.room
  }
})