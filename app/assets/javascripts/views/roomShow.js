DoodleOrDie.Views.RoomShowView = Backbone.CompositeView.extend({
  template: JST['rooms/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.addChainPreviews);
  },

  events: {
    "click #play-now": "play",
    "click #explore-room" : "explore",
    "click #skip": "skip",
    "click #submit-step": "submit"
  },

  render: function() {
    var content = this.template({ room: this.model })
    this.$el.html(content)

    this.renderSubviews();
    return this;
  },

  addChainPreviews: function() {
    //THIS NEEDS FIXING ONCE IMAGES GET ADDED!
    //currently only displaying last step in each chain!
    var view = this;

    this.model.chains().each(function(chain){
      var lastStep = chain.steps().models[chain.steps().length - 1]

      var stepShow = new DoodleOrDie.Views.StepShowView({
        model: lastStep
      })
      //need to add href to preview, perhaps use a 2nd step show view,

      view.addSubview("#chains", stepShow);
      stepShow.render();
    });
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
    //show player's timeline eventually
  },

  skip: function(){
    event.preventDefault();
    //clear next_step div
    this.removeSubview("#last-step", this.nextStepShow)
    this.fetchStepToPlay();
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
    this.nextStepShow = new DoodleOrDie.Views.StepShowView({
      model: this.next_step
    })

    this.addSubview("#last-step", this.nextStepShow);
    this.nextStepShow.render();

    this.addStepForm();
  },

  addStepForm: function() {
    if(this.stepForm)
      this.removeSubview("#step-form", this.stepForm);

    this.stepForm = new DoodleOrDie.Views.StepFormView({
      model: this.next_step
    })

    this.addSubview("#step-form", this.stepForm);
    this.stepForm.render();
  },

  submit: function(event) {
    event.preventDefault()
    debugger;
    //create new step

    //create new chain and new step if no chain_id
  }
})