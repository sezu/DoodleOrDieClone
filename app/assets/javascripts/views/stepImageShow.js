DoodleOrDie.Views.StepImageShowView = Backbone.View.extend({
  template: JST['steps/image'],

  className: "step",

  render: function(){
    var content = this.template({
      step: this.model
    });

    this.$el.html(content);
    return this;
  }
})