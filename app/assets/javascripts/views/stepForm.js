DoodleOrDie.Views.StepFormView = Backbone.View.extend({
  template: function() {
    //choose template based on if last step is image or text
    return (this.lastStep.is_image() ? JST['steps/textform'] : JST['steps/canvasform'])
  },

  initialize: function(options){
    this.lastStep = options.lastStep
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
      //container: document.getElementById("color-picker"),
      callback: function(rgba, state, type, self) {
        that.sketch.style.strokeStyle = Color.Space(rgba, "RGBA>W3");;
      }
    });
  }
  //this file is used for changing paint toolbox stuff
  //lots of events probably
})