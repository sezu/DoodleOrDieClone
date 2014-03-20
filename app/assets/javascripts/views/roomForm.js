DoodleOrDie.Views.PostFormView = Backbone.View.extend({
  template: JST['rooms/form'],

  events: {"submit #room-form": "submit"},

  render: function(){
    var content = this.template({ room: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON()["room"];

    DoodleOrDie.rooms.create(params, {
      success: function() {
        view.remove()
      }
    })
  }
})