DoodleOrDie.Views.RoomShowView = Backbone.CompositeView.extend({
  template: JST['rooms/show'],

  render: function() {
    var content = this.template({ room: this.model })
    this.$el.html(content)

    this.renderSubviews();
    return this;
  }
})