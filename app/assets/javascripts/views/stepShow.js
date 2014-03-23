DoodleOrDie.Views.StepShowView = Backbone.View.extend({
  template: JST['steps/show'],

  initialize: function(options) {
     this.playing = options.playing || "",
     this.waitForParentView = options.waitForParentView
  },

  render: function(){
    var content = this.template({ step: this.model });
    this.$el.html(content);

    if(this.model.is_image() && !this.waitForParentView) {
      debugger;
      this.createSketch();
    }

    return this;
  },

  createSketch: function() {

    this.sketch = new Sketch({
      element: document.getElementById("drawArea" + this.model.id + this.playing),
      path: JSON.parse(this.model.get("image"))
    });

    this.sketch.style.globalAlpha = 0
    this.sketch.resize(600, 400);
  }
})