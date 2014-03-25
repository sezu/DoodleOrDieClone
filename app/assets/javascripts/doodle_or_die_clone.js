window.DoodleOrDie = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    DoodleOrDie.rooms = new DoodleOrDie.Collections.Rooms();
    DoodleOrDie.rooms.fetch({
      success: function(){

        new DoodleOrDie.Routers.AppRouter({
          $rootEl: $('#content')
        });

        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  DoodleOrDie.initialize();
});

//Composite Views
Backbone.CompositeView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this, 'inDOM', this.cascadeInDOM);
  },

  cascadeInDOM: function () {
    this.inDOM = true;
    _(this.subviews()).each(function(selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview) {
        subview.trigger('inDOM');
      })
    })
  },

  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.trigger('outDOM');
    this.inDOM = false;
    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;

    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();

        if (view.inDOM) {
          subview.trigger('inDOM');
        }
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  }
});