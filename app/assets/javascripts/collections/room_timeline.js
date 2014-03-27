DoodleOrDie.Collections.RoomTimeline = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Step,

  url: function(){
    return this.room.url() + "/timeline"
  },

  initialize: function(options) {
    this.room = options.room;
  },

  comparator: function(step) {
    //sort by created date.
    return step.get("created_at")
  },

  imageSteps: function() {
    var images = [];

    for(var i = 0; i < this.models.length; i++) {
      if (this.models[i].is_image())
      images.push(this.models[i])
    }

    return images;
  }
})