import Ember from 'ember';
import Geolocation from 'hack-fargo/models/geolocation';

export default Ember.Route.extend({
  activate: function() {
    Ember.run.scheduleOnce('afterRender', function() {
      setTimeout(function() {
        $('.application').css({ opacity: 1 });
      }, 0);
    });
  },

  model() {
    return Geolocation.create();
  },

  title: function(tokens) {
   var base = 'Hack Fargo';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? tokens.reverse().join(' - ') : base;
  }
});
