DoodleOrDie.Models.Room = Backbone.Model.extend({
  chains: function() {
    this.chains_collection = this.chains_collection ||
        new DoodleOrDie.Collections.RoomChains({ room: this });

    return this.chains_collection
  },

  currUserSteps: function() {
    this.userStep_collection = this.userStep_collection ||
        new DoodleOrDie.Collections.UsersRoomSteps({ room: this });

    return this.userStep_collection
  },

  parse: function(resp) {
    if(resp.chains){
      this.chains().set(resp.chains);

      this.chains().each(function (chain, index) {
        chain.steps().set(resp.chains[index].steps)
      })

      delete resp.chains;
    }

    if(resp.user_steps){
      this.currUserSteps().set(resp.user_steps)
      delete resp.user_steps;
    }

    return resp
  }
});