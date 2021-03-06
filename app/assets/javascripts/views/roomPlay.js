DoodleOrDie.Views.RoomPlayView = Backbone.CompositeView.extend({
  template: JST['rooms/play'],

  initialize: function(options) {
    Backbone.CompositeView.prototype.initialize.apply(this);

    this.timelineCreated = false;
    this.listenTo(this.model.userTimeline(), "sync", this.createStepTimeline);
    this.listenTo(this.model.userTimeline(), "add", this.addToTimeline);
    
    //unassigns chain so others can play on it
    var that = this
    $(".navbar").on("click", "a", function(e) {that.unassignChain(e) })
    window.addEventListener("beforeunload", function() { that.unassignChain() })

    this.missionText = "Loading..."
    this.fetchStepToPlay(this.renderNextStep.bind(this));
  },

  render: function() {
    var content = this.template({ room: this.model, missionText: this.missionText })
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

  events: {
    "click #skip": "skip",
    "submit #step-form": "submit",
    "click #timeline-prev": "prevTimeline",
    "click #timeline-next": "nextTimeline",
    "click .step-image": "unassignChain"
  },

  createStepTimeline: function() {
    if(this.timelineCreated){
      return;
    }

    var steps = this.model.userTimeline().steps()

    this.timeline = [];
    this.timelineIndex = this.timelineIndex || steps.length;

    if(this.timelineIndex < 0)
      return;

    var counter = this.timelineIndex - 1;

    while(this.timeline.length < 8 && counter >= 0) {

      var stepShow = new DoodleOrDie.Views.StepTimelineShowView({
        model: steps[counter]
      })

      this.timeline.push(stepShow)
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

    var stepShow = new DoodleOrDie.Views.StepTimelineShowView({
      model: step
    })

    this.timelineIndex += 1;
    this.timeline.unshift(stepShow)
    this.addSubview("#timeline", stepShow);

    if(this.timeline.length > 8){
      this.removeSubview("#timeline", this.timeline.pop())
    }

    this.render()
  },

  prevTimeline: function(event) {
    event.preventDefault();
    var index = $("body").width() >= 1200 ? 8 : 5


    //no prev drawings
    if(this.timelineIndex <= index)
      return

    this.timelineIndex -= index;

    if(this.timelineIndex < index && this.model.userTimeline().steps().length >= index)
    {
      this.timelineIndex = index;
    }

    for(var i = 0; i < this.timeline.length; i++) {
      this.removeSubview("#timeline", this.timeline[i]);
    }

    this.timelineCreated = false;
    this.createStepTimeline();
  },

  nextTimeline: function(event) {
    event.preventDefault();
    var index = $("body").width() >= 1200 ? 8 : 5
    var max = this.model.userTimeline().steps().length

    if(this.timelineIndex === max)
      return

    this.timelineIndex += index;
    //no future drawings
    if(this.timelineIndex > max) {
      this.timelineIndex = max
    }

    for(var i = 0; i < this.timeline.length; i++) {
      this.removeSubview("#timeline", this.timeline[i]);
    }

    this.timelineCreated = false;
    this.createStepTimeline();
  },

  skip: function(){
    event.preventDefault();
    //update skip counter and create doNotPlay association
    //this.next_step.save();
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
    if(this.next_step)
      this.unassignChain()
    
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
    $("#step-submit").text("Loading...")

    var chain_id = this.next_step.get("chain_id")

    if(this.next_step.is_image()){
      var params = $(event.currentTarget).serializeJSON()["step"];

      if(!/\S/.test(params["description"])) {
        //add some kind of input error to screen
        console.log("Form cannot be blank!")
        return;
      }

    } else {

      var params = { image: this.stepForm.sketch.toString(),
                     aws_image: this.stepForm.sketch.toDataURL() }

      if(params["image"] === "[]") {
        console.log("Form cannot be blank!")
        return;
      }
    }

    if(chain_id) {
      _.extend(params, {
        chain_id: chain_id,
        rank: this.next_step.get("rank") + 1
       })

       this.model.userTimeline().create(params, {wait: true});

    } else {

      _.extend(params, {
        room_id: this.model.id,
        rank: 1
      });

      this.model.chains().create(params, {wait: true})

    //create new chain and new step if no chain_id

    // var that = this
    //   this.model.chains().create({ room_id: this.model.id }, {
    //     success: function(resp){
    //
    //       _.extend(params, {
    //         chain_id: resp.id,
    //         rank: 1
    //       })
    //
    //       that.model.userTimeline().create(params, {wait: true});
    //       that.fetchStepToPlay(that.renderNextStep.bind(that));
    //       $("#step-submit").text("Submit!")
    //     }
    //   })
      //Fix this to add to timeline!
    }

    this.fetchStepToPlay(this.renderNextStep.bind(this));
  },
  
  unassignChain: function (event) {
    if(event && event.currentTarget.text === "Play")
      return

    if (this.next_step.get("chain_id")) {
      this.next_step.save({}, { async:false }); //unassigns the chain
    }    
  }
})