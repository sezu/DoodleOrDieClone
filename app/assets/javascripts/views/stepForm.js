DoodleOrDie.Views.StepFormView = Backbone.View.extend({
  template: JST['steps/textform'],
  //choose template based on if next step is image or text

  initialize: function(options){
    this.next_step = options.next_step
  },

  render: function(){
    var content = this.template({ room: this.model })
    this.$el.html(content)

    return this;
  }

  //this file is used for changing paint toolbox stuff
  //lots of events probably
})