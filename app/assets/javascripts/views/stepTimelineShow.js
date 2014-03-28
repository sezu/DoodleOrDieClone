DoodleOrDie.Views.StepTimelineShowView = Backbone.View.extend({
  template: JST['steps/timeline'],

  className: "step",

  render: function(){
    var content = this.template({
      step: this.model
    });

    this.$el.html(content);
    return this;
  }
})