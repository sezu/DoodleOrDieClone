DoodleOrDie.Collections.RoomChains = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Chain,

  url: function() {
    return this.room.url()
  },

  initialize: function(options) {
    this.room = options.room
  }
})