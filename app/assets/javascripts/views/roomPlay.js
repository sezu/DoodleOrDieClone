DoodleOrDie.Views.RoomPlayView = Backbone.CompositeView.extend({
  template: JST['rooms/play'],

  initialize: function(options) {
    Backbone.CompositeView.prototype.initialize.apply(this);

    this.listenTo(this.model.userTimeline(), "sync", this.createStepTimeline);
    this.listenTo(this.model.userTimeline(), "add", this.addToTimeline);

    this.fetchStepToPlay(this.renderNextStep.bind(this));
    this.missionText = "Loading..."
    this.timelineCreated = false
  },

  render: function() {
    var content = this.template({ room: this.model, missionText: this.missionText })
    this.$el.html(content)

    this.renderSubviews();
    return this;
  },

  events: {
    "click #skip": "skip",
    "submit #step-form": "submit"
  },

  createStepTimeline: function() {
    console.log(this)
    if(this.timelineCreated){
      return;
    }

    this.timeline = [];
    this.timelineIndex = this.model.userTimeline().length - 1;

    if(this.timelineIndex.length < 0)
      return;

    var steps = this.model.userTimeline().models;
    var counter = this.timelineIndex;

    while(this.timeline.length < 8 && counter > 0) {
      if(steps[counter].is_image()) {

        var stepShow = new DoodleOrDie.Views.StepShowView({
          model: steps[counter],
          zoom: 0.166,
          width: 100,
          height: 66.6,
          isLinkable: true,
          uniqueID: "timeline"
        })

        this.timeline.push(stepShow)
      }
      counter--;
    }

    for(var i = this.timeline.length - 1; i >= 0; i--) {
      this.addSubview("#timeline", this.timeline[i]);
    }

    this.timelineCreated = true;
    this.render();
  },

  addToTimeline: function(step) {
    if(!this.timelineCreated || !step.is_image())
    {
     return
    }

    var stepShow = new DoodleOrDie.Views.StepShowView({
      model: step,
      zoom: 0.166,
      width: 100,
      height: 66.6,
      isLinkable: true,
      uniqueID: "timeline"
    })

    this.timeline.unshift(stepShow)
    this.addSubview("#timeline", stepShow);

    if(this.timeline.length > 8){
      this.removeSubview("#timeline", this.timeline.pop())
    }

    this.render()
  },

  skip: function(){
    event.preventDefault();
    //update skip counter and create doNotPlay association
    this.next_step.save();
    this.fetchStepToPlay(this.renderNextStep.bind(this));
  },

  renderNextStep: function (next_step) {
    this.next_step = next_step;
    if (this.nextStepShow)
      this.removeSubview("#last-step", this.nextStepShow);
    this.addNextStep(next_step);
    this.addStepForm(next_step);
  },

  fetchStepToPlay: function(callback){
    var view = this;
    var next_step = new DoodleOrDie.Models.NextStep({ room: this.model })
    //fetches a valid step from rails
    next_step.fetch({
      success: function() {
        callback(next_step)
      },
      //if no valid step, create new chain
      error: function() {
        next_step.set({ description: "Start a new chain!"})
        callback(next_step)
      }
    })
  },

  addNextStep: function(next_step) {
    this.missionText = next_step.is_image() ? "DESCRIBE" :"DRAW"
    //$("#mission").append('<a href="#" id="skip">Skip</a>')

    this.nextStepShow = new DoodleOrDie.Views.StepShowView({
      model: next_step,
      //needed to add a unique id tag to nextstep view
      uniqueID: "play"
    })

    this.addSubview("#last-step", this.nextStepShow);
  },

  addStepForm: function(next_step) {
    if(this.stepForm)
      this.removeSubview("#step-form", this.stepForm);

    this.stepForm = new DoodleOrDie.Views.StepFormView({
      lastStep: next_step
    })

    this.addSubview("#step-form", this.stepForm);

    this.render();
  },

  submit: function(event) {
    event.preventDefault()

    var chain_id = this.next_step.get("chain_id")

    if(this.next_step.is_image()){
      var params = $(event.currentTarget).serializeJSON()["step"];

      if(!/\S/.test(params["description"])) {
        //add some kind of input error to screen
        console.log("Form cannot be blank!")
        return;
      }

    } else {

      var params = { image: this.stepForm.sketch.toString() }

      if(params["image"] === "[]") {
        console.log("Form cannot be blank!")
        return;
      }
    }

    if(chain_id) {
      //create new step
      //might be making this on wrong collection
      //user room timeline instead maybe
      _.extend(params, {
        chain_id: chain_id,
        rank: this.next_step.get("rank") + 1
       })

       this.model.userTimeline().create(params);

       //build this on timeline instead - THIS DOESNT EXIST ANYMORE!!!!
       //this.model.chains().get(chain_id).steps().create(params)

    } else {
    //create new chain and new step if no chain_id
      _.extend(params, {
        room_id: this.model.id,
        rank: 1
      })

      this.model.chains().create(params)
    }

    this.fetchStepToPlay(this.renderNextStep.bind(this));
  }
})