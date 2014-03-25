DoodleOrDie.Views.StepFormView = Backbone.View.extend({

  template: function() {
    //choose template based on if last step is image or text
    return (this.lastStep.is_image() ? JST['steps/textform'] : JST['steps/canvasform'])
  },

  initialize: function(options){
    this.lastStep = options.lastStep
    this.brushSize = 10;
    this.colorPickerDisplay = false;
  },

  events: {
    "click .brush-size": "changeBrushSize",
    "click .color": "changeColor",
    "change #size-slider" :"changeBrushSizeSlider",
    "click #undo": "undo",
    "click #animate": "animate",
    "click #clear": "clear",
    "click #more-colors": "showColorPicker"
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

  changeBrushSizeSlider: function(event) {
    this.brushSize = $(event.currentTarget).val()
    this.sketch.style.lineWidth = this.brushSize;
    $("#current-size").text(this.brushSize)
  },

  changeColor: function(event) {
    event.preventDefault();

    if(this._currentSelector) {
      this._currentSelector.removeClass("selected-color")
      this._currentSelector.text("")
    }

    this._currentSelector = $(event.currentTarget)
    this._currentSelector.addClass("selected-color")
    this._currentSelector.append("X")

    var color = this._currentSelector.data().hex
    this.sketch.picker.update(color)
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
  },

  showColorPicker: function(event) {
    event.preventDefault();
    this.colorPickerDisplay = !this.colorPickerDisplay

    this.sketch.picker.toggle(this.colorPickerDisplay)
    $("#color-picker").removeClass("hide");
  }
})