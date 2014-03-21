DoodleOrDie.Views.ChainShowView = Backbone.CompositeView.extend({
  template: JST['chains/show'],

  initialize: function(options) {
    this.listenTo(this.model.steps(), "add", this.addStep);

    this.model.steps().each(this.addStep.bind(this));
  },

  render: function(){
    var content = this.template({ chain: this.model });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

  addStep: function(step){
    var stepShow = new DoodleOrDie.Views.StepShowView({
      model: step
    })

    this.addSubview("#steps", stepShow)
    stepShow.render();
  }
})