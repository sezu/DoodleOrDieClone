DoodleOrDie.Views.StepShowView = Backbone.View.extend({
  template: JST['steps/show'],

  render: function(){
    var content = this.template({ step: this.model });
    this.$el.html(content);

    return this;
  }
})