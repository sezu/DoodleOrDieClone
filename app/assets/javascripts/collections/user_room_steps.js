DoodleOrDie.Collections.UsersRoomSteps = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Step,

  url: function(){
    return this.room.url() + "/steps"
  },

  initialize: function(options) {
    this.room = options.room;
  },

  comparator: function(step) {
    //sort by created date.
    return step.get("created_at")
  }
})