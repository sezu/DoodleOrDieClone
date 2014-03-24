DoodleOrDie.Views.StepFormView = Backbone.View.extend({

  template: function() {
    //choose template based on if last step is image or text
    return (this.lastStep.is_image() ? JST['steps/textform'] : JST['steps/canvasform'])
  },

  initialize: function(options){
    this.lastStep = options.lastStep
    this.brushSize = 5;
  },

  events: {
    "click .brush-size": "changeBrushSize",
    "click #undo": "undo",
    "click #animate": "animate",
    "click #clear": "clear"
  },

  render: function(){
    var content = this.template({ room: this.model })
    this.$el.html(content)

    if(!this.lastStep.is_image()) {
      this.createSketch();
    }

    return this;
  },

  createSketch: function() {
    this.sketch = new Sketch({
      element: document.getElementById("drawArea")
    });

    var that = this;

    this.sketch.resize(600, 400);
    this.sketch.picker = new Color.Picker({
      size: 225,
      hueWidth: 45,
      color: "#FF0000",
      eyedropLayer: this.sketch.layer[1],
      eyedropMouseLayer: this.sketch.layer[2],
      display: true,
      container: document.getElementById("color-picker"),
      callback: function(rgba, state, type, self) {
        that.sketch.style.strokeStyle = Color.Space(rgba, "RGBA>W3");;
      }
    });
  },

  changeBrushSize: function(event) {
    event.preventDefault();

    //update sketch style
    this.brushSize = $(event.currentTarget).data("size")
    this.sketch.style.lineWidth = this.brushSize;

    //update brush controls
    $("#current-size").text(this.brushSize)
    $("#size-slider").val(this.brushSize)
  },

  undo: function(event) {
    event.preventDefault();
    this.sketch.undo();
  },

  clear: function(event) {
    event.preventDefault();
    this.sketch.clearRecording();
  },

  animate: function(event) {
    event.preventDefault();
    this.sketch.redrawAnimate();
  }
  //this file is used for changing paint toolbox stuff
  //lots of events probably
})