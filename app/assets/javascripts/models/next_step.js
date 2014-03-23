DoodleOrDie.Models.NextStep = Backbone.Model.extend({
  urlRoot: function() {
    return this.room.url() + "/fetch_step"
  },

  initialize: function(options) {
    this.room = options.room
  },

  is_image: function () {
    return (this.get("image") ? true : false)
  }
});