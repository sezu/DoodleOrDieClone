DoodleOrDie.Views.ChainPreviewView = Backbone.CompositeView.extend({
  template: JST['chains/preview'],

  render: function() {
    var content = this.template({ chain: this.model })
    this.$el.html(content)

    var steps = this.model.steps().models
    var lastStep = steps[steps.length - 1]

    if(!lastStep.is_image()) {
      lastDesc = steps[steps.length - 3]
      lastImage = steps[steps.length - 2]
    } else {
      lastDesc = steps[steps.length - 2]
      lastImage = lastStep
    }

    var descShow = new DoodleOrDie.Views.StepShowView({
      model: lastDesc,
      uniqueID: preview
    })

    debugger;

    var imageShow = new DoodleOrDie.Views.StepShowView({
      model: lastImage,
      uniqueID: preview,
      zoom: 0.5,
      width: 300,
      height: 200,
      isLinkable: true//,
      //waitForParentView: true
    })

    this.addSubview("#desc-" + this.model.id, descShow);
    this.addSubview("#image-" + this.model.id, imageShow);

    this.renderSubviews();
    return this;
  }
})