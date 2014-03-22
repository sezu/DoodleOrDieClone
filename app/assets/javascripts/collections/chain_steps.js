DoodleOrDie.Collections.ChainSteps = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Step,

  url: function(){
    return this.chain.url() + "/steps"
  },

  initialize: function(options) {
    this.chain = options.chain;
  },

  comparator: function(step) {
    //sort by created date.
    return step.get("created_at")
  }
})