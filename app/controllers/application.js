import Ember from 'ember';

export default Ember.Controller.extend({
  currentPathDidChange: function() {
    var currentPath = this.get('currentPath');

    // Set the body class based on route
    var splitPath = currentPath.split('.').map(function(path) {
      return Ember.String.dasherize(path);
    });

    var bodyClass = 'ember-application ' + splitPath.join(' ');
    $('body').attr('class', bodyClass);
  }.observes('currentPath')
});
