DoodleOrDie.Collections.Rooms = Backbone.Collection.extend({
  model: DoodleOrDie.Models.Room,
  url: "/rooms",

  getOrFetch: function(id) {
     var model;
     var collection = this;

     if(model = this.get(id)) {
       model.fetch();

     } else {
       model = new DoodleOrDie.Models.Room({id: id});
       model.fetch({
         success: function() {
           collection.add(model) }
       });
     }
     return model;
   }
})