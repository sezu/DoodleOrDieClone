DoodleOrDie.Views.StepShowView = Backbone.View.extend({
  template: JST['steps/show'],

  initialize: function(options) {
     this.playing = options.playing || "",
     this.waitForParentView = options.waitForParentView
     this.zoom = options.zoom || 1
     this.height = options.height || 400
     this.width = options.width || 600
     this.isPreview = options.config || false
     //make sure this works!
  },

  events: {
    "click .animate": "animate"
  },

  render: function(){
    var content = this.template({ step: this.model });
    this.$el.html(content);

    if(this.model.is_image() && !this.waitForParentView) {
      this.createSketch();
    }

    return this;
  },

  createSketch: function() {

    this.sketch = new Sketch({
      element: document.getElementById("drawArea" + this.model.id + this.playing),
      zoom: this.zoom,
      path: JSON.parse(this.model.get("image"))
    });

    this.sketch.style.globalAlpha = 0
    this.sketch.resize(this.width, this.height);
  },

  animate: function() {

  }
})