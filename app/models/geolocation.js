import Ember from 'ember';

const Geolocation = Ember.Object.extend({
  accuracy: Ember.computed.alias('coords.accuracy'),
  altitude: Ember.computed.alias('coords.altitude'),
  altitudeAccuracy: Ember.computed.alias('coords.altitudeAccuracy'),
  heading: Ember.computed.alias('coords.heading'),

  promise: function() {
    var url = 'https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium&sensor=true';
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('coords', position.coords);
          resolve(self);
        }, function(error) {
          console.error(error.code, error.message, error);
          reject(error);
        });
      } else {
        fetch(url).then(function(response) {
          if (response.status !== 200) {
            var error = {
              code:    response.status,
              message: 'There was a problem resolving the browser location.'
            };
            console.error(error.code, error.message, error);
            return reject(error);
          }

          return response.json().then(function(data) {
            self.set('coords', {
              accuracy:  data.accuracy,
              latitude:  data.lat,
              longitude: data.lng
            });
            resolve(self);
          });
        }).catch(function(error) {
          console.error(error.code, error.message, error);
          reject(error);
        });
      }
    });
  },

  lat: Ember.computed.alias('coords.latitude'),
  lng: Ember.computed.alias('coords.longitude'),
  speed: Ember.computed.alias('coords.speed'),
  timestamp: Ember.computed.alias('coords.timestamp')
});

Geolocation.reopenClass({
  create() {
    var instance = this._super();
    return instance.promise();
  }
});

export default Geolocation;
