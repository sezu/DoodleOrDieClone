DoodleOrDie.Models.Step = Backbone.Model.extend({
  is_image: function () {
    //return (this.get("image") ? true : false)
    return (this.get("description") ? false : true)
  }
});