DoodleOrDie.Models.Room = Backbone.Model.extend({
  urlRoot: "/rooms",

  chains: function() {
    this.chains_collection = this.chains_collection ||
        new DoodleOrDie.Collections.RoomChains({ room: this });

    return this.chains_collection
  },

  userTimeline: function() {
    this.timeline_collection = this.timeline_collection ||
        new DoodleOrDie.Collections.RoomTimeline({ room: this });

    return this.timeline_collection
  },

  parse: function(resp) {
    if(resp.chains){

      this.chains().set(resp.chains);

      this.chains().each(function (chain, index) {
        chain.steps().set(resp.chains[index].steps)
      })

      delete resp.chains;
    }

    return resp;
  }
});