import Ember from 'ember';

var directionsService = new google.maps.DirectionsService();

const Route = Ember.Object.extend({
  destination: null,
  origin: null,

  promise: function() {
    var request = this.get('request');
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          self.set('result', result);
          resolve(self);
        } else {
          console.error('result', result, 'status', status);
          reject(result);
        }
      });
    });
  },

  request: function() {
    return {
      destination: this.get('destination'),
      origin:      this.get('origin'),
      travelMode:  google.maps.TravelMode.DRIVING
    };
  }.property('destination', 'origin'),
});

Route.reopenClass({
  create(params) {
    var instance = this._super(params);
    return instance.promise();
  }
});

export default Route;
