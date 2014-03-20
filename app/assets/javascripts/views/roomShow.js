DoodleOrDie.Views.RoomShowView = Backbone.View.extend({
  template: JST['rooms/show'],

  render: function() {
    var content = this.template({ room: this.model })
    this.$el.html(content)

    return this;
  }
})