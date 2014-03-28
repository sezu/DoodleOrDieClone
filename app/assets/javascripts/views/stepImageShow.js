DoodleOrDie.Views.StepImageShowView = Backbone.View.extend({
  template: JST['steps/image'],

  className: "step",

  initialize: function(options) {
    //Backbone.CompositeView.prototype.initialize.apply(this);
    //this.listenTo(this, 'inDOM', this.createSketch);

    this.uniqueID = options.uniqueID || ""
  },

  render: function(){
    var content = this.template({
      step: this.model
    });
    this.$el.html(content);

    return this;
  }
})