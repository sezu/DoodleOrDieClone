DoodleOrDie.Views.RoomShowView = Backbone.CompositeView.extend({
  template: JST['rooms/show'],

  initialize: function(options) {
    Backbone.CompositeView.prototype.initialize.apply(this);
    this.listenTo(this.model, "sync", this.addChainPreviews);
  },

  render: function() {
    var content = this.template({ room: this.model })
    this.$el.html(content)

    this.renderSubviews();
    return this;
  },

  addChainPreviews: function() {
    var view = this;

    this.model.chains().each(function(chain){
      var chainPreview = new DoodleOrDie.Views.ChainPreviewView({
        model: chain
      })

      view.addSubview("#chains", chainPreview);
    });

    this.render()
  }
})