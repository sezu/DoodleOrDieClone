DoodleOrDie.Views.RoomShowView = Backbone.CompositeView.extend({
  template: JST['rooms/show'],

  initialize: function(options) {
    Backbone.CompositeView.prototype.initialize.apply(this);
    this.listenTo(this.model, "sync", this.addChainPreviews);
    this.listenTo(this.model, "sync", this.addStepTimeline);
  },

  events: {
    "click #play-now": "play",
    "click #explore-room" : "explore",
    "click #skip": "skip",
    "submit #step-form": "submit"
  },

  render: function() {
    var content = this.template({ room: this.model })
    this.$el.html(content)

    this.renderSubviews();
    return this;
  },

  addChainPreviews: function() {
    var view = this;
    debugger;

    this.model.chains().each(function(chain){
      var chainPreview = new DoodleOrDie.Views.ChainPreviewView({
        model: chain
      })

      view.addSubview("#chains", chainPreview);
    });

    //this.render()
  },

  addStepTimeline: function() {
    this.timeline = [];

    var steps = this.model.currUserSteps().models
    var counter = steps.length - 1;
    //maybe use counter to keep track of where in timeline you are.

    //debugger;

    while(this.timeline.length < 8 && counter > 0) {
      if(steps[counter].is_image()) {

        var stepShow = new DoodleOrDie.Views.StepShowView({
          model: steps[counter],
          zoom: 0.2,
          width: 120,
          height: 80,
          isLinkable: true,
          uniqueID: "timeline"
        })

        this.timeline.push(stepShow)
        this.addSubview("#timeline", stepShow);
      }

      counter--;
    }

    this.render();
  },

  explore: function() {
    $("#chains").removeClass("hidden")
    $("#play").addClass("hidden")
    $("#explore-room").text("Play Now")
    $("#explore-room").attr("id", "play-now")
  },

  play: function(){
    event.preventDefault();
    $("#chains").addClass("hidden")
    $("#play").removeClass("hidden")
    $("#play-now").text("Explore Room")
    $("#play-now").attr("id", "explore-room")

    if(!this.next_step){
      this.fetchStepToPlay();
    }
  },

  skip: function(){
    event.preventDefault();
    //clear next_step div
    this.fetchStepToPlay();
    this.removeSubview("#last-step", this.nextStepShow)

    //somehow update skip counter on chain_id
  },

  fetchStepToPlay: function(){
    var view = this;
    this.next_step = new DoodleOrDie.Models.NextStep({ room: this.model })
    //fetches a valid step from rails
    this.next_step.fetch({
      success: function() {
        view.addNextStep();
      },
      //if no valid step, create new chain
      error: function() {
        view.next_step.set({ description: "Start a new chain!"})
        view.addNextStep();
      }
    })
  },

  addNextStep: function() {
    var missionText = this.next_step.is_image() ? "DESCRIBE" :"DRAW"
    $("#mission").text(missionText)
    $("#mission").append('<a href="#" id="skip">Skip</a>')

    this.nextStepShow = new DoodleOrDie.Views.StepShowView({
      model: this.next_step,
      //needed to add a unique id tag to nextstep view
      uniqueID: "play"
    })

    this.addSubview("#last-step", this.nextStepShow);
    this.nextStepShow.render();

    this.addStepForm();
  },

  addStepForm: function() {
    if(this.stepForm)
      this.removeSubview("#step-form", this.stepForm);

    this.stepForm = new DoodleOrDie.Views.StepFormView({
      lastStep: this.next_step
    })

    this.addSubview("#step-form", this.stepForm);
    this.stepForm.render();
  },

  submit: function(event) {
    event.preventDefault()

    var chain_id = this.next_step.get("chain_id")

    if(this.next_step.is_image()){
      var params = $(event.currentTarget).serializeJSON()["step"];
    } else {
      var params = { image: this.stepForm.sketch.toString() }
    }

    if(chain_id) {
      //create new step
      //might be making this on wrong collection
      //user room steps instead maybe
      _.extend(params, { chain_id: chain_id })
      this.model.chains().get(chain_id).steps().create(params)

    } else {
    //create new chain and new step if no chain_id
      _.extend(params, { room_id: this.model.id })
      this.model.chains().create(params)
    }

    this.removeSubview("#last-step", this.nextStepShow)
    this.fetchStepToPlay();
  }
})