import Ember from 'ember';
import Route from 'hack-fargo/models/route';
var autocompleteService = new google.maps.places.AutocompleteService();

export default Ember.Controller.extend({
  distance: 0,
  drunkCount: 0,

  actions: {
    findRoute: function() {
      var self = this;
      Route.create({
        destination: this.get('destination'),
        origin:      this.get('origin')
      }).then(function(route) {
        console.log('route!', route.get('result'));
        self.set('directions', route.get('result'));
      }).catch(function(error) {
        console.error(error.code, error.message, error);
      });
    }
  },

  currentPathDidChange: function() {
    var currentPath = this.get('currentPath');

    // Set the body class based on route
    var splitPath = currentPath.split('.').map(function(path) {
      return Ember.String.dasherize(path);
    });

    var bodyClass = 'ember-application ' + splitPath.join(' ');
    $('body').attr('class', bodyClass);
  }.observes('currentPath'),

  destinationLocations: function() {
    var destination = this.get('destination');
    if (Ember.isBlank(destination)) { return; }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      autocompleteService.getPlacePredictions({ input: destination }, function(result) {
        if (Ember.isEmpty(result)) { return reject(result); }
        resolve(result.mapBy('description'));
      });
    });
  }.property('destination'),

  modelDidChange: function() {
    this.set('origin', this.get('model.lat') + ', ' + this.get('model.lng'));
  }.observes('model.lat', 'model.lng'),

  originLocations: function() {
    var origin = this.get('origin');
    if (Ember.isBlank(origin)) { return; }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      autocompleteService.getPlacePredictions({ input: origin }, function(result) {
        if (Ember.isEmpty(result)) { return reject(result); }
        resolve(result.mapBy('description'));
      });
    });
  }.property('origin'),

  safetyRating: function() {
    var distance = this.get('distance');
    var drunkCount = this.get('drunkCount');
    if (Ember.isNone(distance) || Ember.isNone(drunkCount) || drunkCount === 0) {
      return 'Very safe';
    }

    var safetyRating = distance / drunkCount;

    if (safetyRating > 500) {
      return 'Very safe';
    } else if (safetyRating > 300) {
      return 'Safe';
    } else if (safetyRating > 200) {
      return 'Kind of safe';
    } else if (safetyRating > 100) {
      return 'Be careful...';
    } else {
      return "Not safe!";
    }
  }.property('distance', 'drunkCount'),

  safetyRatingCssClass: function() {
    var safetyRating = this.get('safetyRating');
    switch(safetyRating) {
    case 'Very safe':
      return 'very-safe';
    case 'Safe':
      return 'safe';
    case 'Kind of safe':
      return 'kind-of-safe';
    case 'Be careful...':
      return 'be-careful';
    default:
      return 'not-safe';
    }
  }.property('safetyRating')
});
