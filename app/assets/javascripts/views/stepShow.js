DoodleOrDie.Views.StepShowView = Backbone.View.extend({
  template: JST['steps/show'],

  className: "step",

  initialize: function(options) {
    Backbone.CompositeView.prototype.initialize.apply(this);
    this.listenTo(this, 'inDOM', this.createSketch);

    this.uniqueID = options.uniqueID || ""
    this.zoom = options.zoom || 1
    this.height = options.height || 400
    this.width = options.width || 600
    this.isLinkable = options.isLinkable || false
    this.showInfo = options.showInfo || false
  },

  events: {
    "click .animate": "animate"
  },

  render: function(){
    var content = this.template({
      step: this.model,
      linkable: this.isLinkable,
      showInfo: this.showInfo
    });
    this.$el.html(content);

    return this;
  },

  createSketch: function() {
    if (!this.model.is_image()) {
      return;
    }

    var eleId = "drawArea" + this.model.id + this.uniqueID

    this.sketch = new Sketch({
      element: document.getElementById(eleId),
      zoom: this.zoom,
      path: JSON.parse(this.model.get("image"))
    });

    this.sketch.style.globalAlpha = 0
    this.sketch.resize(this.width, this.height);
  },

  animate: function(event) {
    event.preventDefault();
    this.sketch.redrawAnimate();
  },
})