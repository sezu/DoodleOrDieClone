DoodleOrDie.Views.StepFormView = Backbone.View.extend({
  template: JST['steps/textform'],

  initialize: function(){

  },

  render: function(){
    var content = this.template({ room: this.model })
    this.$el.html(content)

    return this;
  }
})