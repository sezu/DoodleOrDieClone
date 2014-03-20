//stretch goal
DoodleOrDie.Collections.UserChains = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Chain,

  url: function() {
    return this.user.url()
  },

  initialize: function(options) {
    this.user = options.user
  }
})