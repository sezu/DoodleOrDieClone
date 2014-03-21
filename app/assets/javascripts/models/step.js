DoodleOrDie.Models.Step = Backbone.Model.extend({
  is_image: function () {
    return (this.get("url") ? true : false)
  }
});