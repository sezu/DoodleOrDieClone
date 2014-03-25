DoodleOrDie.Views.StepShowView = Backbone.View.extend({
  template: JST['steps/show'],

  className: function() {
    return this.model.is_image() ? "step-image" : "step-desc"
  },

  initialize: function(options) {
     this.uniqueID = options.uniqueID || ""
     this.waitForParentView = options.waitForParentView
     this.zoom = options.zoom || 1
     this.height = options.height || 400
     this.width = options.width || 600
     this.isLinkable = options.isLinkable || false
     //make sure this works!
  },

  events: {
    "click .animate": "animate"
  },

  render: function(){
    var content = this.template({
      step: this.model,
      linkable: this.isLinkable
    });
    this.$el.html(content);

    if(this.model.is_image() && !this.waitForParentView) {
      //debugger;
      this.createSketch();
    }

    return this;
  },

  createSketch: function() {
    var eleId = "drawArea" + this.model.id + this.uniqueID
    debugger;

    this.sketch = new Sketch({
      element: document.getElementById(eleId),
      zoom: this.zoom,
      path: JSON.parse(this.model.get("image"))
    });

    this.sketch.style.globalAlpha = 0
    this.sketch.resize(this.width, this.height);
  },

  animate: function() {

  }
})