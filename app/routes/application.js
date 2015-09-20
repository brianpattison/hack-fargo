import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    Ember.run.scheduleOnce('afterRender', function() {
      setTimeout(function() {
        $('.application').css({ opacity: 1 });
      }, 0);
    });
  },

  title: function(tokens) {
   var base = 'Hack Fargo';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? tokens.reverse().join(' - ') : base;
  }
});
