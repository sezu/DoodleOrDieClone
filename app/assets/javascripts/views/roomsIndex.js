DoodleOrDie.Views.RoomsIndexView = Backbone.View.extend({
  template: JST['rooms/index'],

  initialize: function() {
    this.listenTo(this.collection, "add", this.render)
  },

  events: {
    "click #new-room": "showRoomForm"
  },

  render: function() {
    var content = this.template({ rooms: this.collection })
    this.$el.html(content)

    return this;
  },

  showRoomForm: function(event) {
    //pop-up create room form, e.g. modal
    debugger;
    event.preventDefault();

    //need to hide #new-room link

    var room = new DoodleOrDie.Models.Room
    var roomFormView = new DoodleOrDie.Views.PostFormView({
      model: room
    })

    $("#new-room-form").append(roomFormView.render().$el)
  }
})