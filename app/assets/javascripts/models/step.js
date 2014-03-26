DoodleOrDie.Models.Step = Backbone.Model.extend({
  //WRONG!

  is_image: function () {
    return (this.get("image") ? true : false)
  }
});