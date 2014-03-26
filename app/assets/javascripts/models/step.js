DoodleOrDie.Models.Step = Backbone.Model.extend({
  urlRoot: "/steps",
  //WRONG!

  is_image: function () {
    return (this.get("image") ? true : false)
  }
});