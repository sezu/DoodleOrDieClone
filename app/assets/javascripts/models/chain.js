DoodleOrDie.Models.Chain = Backbone.Model.extend({
  steps: function(){
    this.step_collection = this.step_collection ||
        new DoodleOrDie.Collections.ChainSteps({ chain: this });

    return this.step_collection
  },
});