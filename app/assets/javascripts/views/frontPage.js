DoodleOrDie.Views.FrontPageView = Backbone.View.extend({
  template: JST['front'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})