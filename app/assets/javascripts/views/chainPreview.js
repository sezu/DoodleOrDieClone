DoodleOrDie.Views.ChainPreviewView = Backbone.CompositeView.extend({
  className: "preview",

  initialize: function () {
    Backbone.CompositeView.prototype.initialize.apply(this);
  },

  template: JST['chains/preview'],

  render: function() {
    var steps = this.model.steps().models;
    var lastStep = steps[steps.length - 1];

    if(!lastStep.is_image()) {

      if(steps.length < 3)
        return this
      lastDesc = steps[steps.length - 3]
      lastImage = steps[steps.length - 2]
    } else {
      if(steps.length < 2)
        return this
      lastDesc = steps[steps.length - 2]
      lastImage = lastStep
    }

    var descShow = new DoodleOrDie.Views.StepShowView({
      model: lastDesc,
      uniqueID: 'preview'
    })

    var imageShow = new DoodleOrDie.Views.StepShowView({
      model: lastImage,
      uniqueID: 'preview',
      zoom: 0.5,
      width: 300,
      height: 200,
      isLinkable: true
    })

    var content = this.template({ chain: this.model });
    this.$el.html(content);

    this.addSubview("#desc-" + this.model.id, descShow);
    this.addSubview("#image-" + this.model.id, imageShow);

    this.renderSubviews();
    return this;
  }
})