DoodleOrDie.Models.Chain = Backbone.Model.extend({
  urlRoot: "chains/",

  // initialize: function(options) {
  //   this.id = options.id
  // },

  steps: function(){
    this.step_collection = this.step_collection ||
        new DoodleOrDie.Collections.ChainSteps({ chain: this });

    return this.step_collection
  },

  parse: function(resp){
    if(resp.steps){
      this.steps().set(resp.steps);

      delete resp.chains;
    }

    return resp;
  },

  is_over: function(){
    return (this.get("is_completed") ? true : false)
  }
});