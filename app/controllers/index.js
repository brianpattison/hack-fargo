import Ember from 'ember';
import impairedDrivers from 'hack-fargo/models/impaired-drivers';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  directions: Ember.computed.alias('applicationController.directions'),
  distance: Ember.computed.alias('applicationController.distance'),
  drunkCount: Ember.computed.alias('applicationController.drunkCount'),
  geolocation: Ember.computed.alias('applicationController.model'),
  impairedDrivers: impairedDrivers,
  route: Ember.computed.alias('directions.routes.firstObject'),

  markers: function() {
    var route = this.get('directions.routes.firstObject');
    var drivers = this.get('impairedDrivers');
    var markers = [];
    if (Ember.isNone(route) || Ember.isEmpty(drivers)) {
      return markers;
    }

    var routeBounds = route.bounds;

    drivers.forEach(function(driver) {
      var marker = new google.maps.Marker({
        icon: {
          scaledSize: new google.maps.Size(20, 20),
          url:        'images/car.png'
        },
        position: {
          lat: driver.lat,
          lng: driver.lng
        },
        title: driver.date.toString()
      });

      if (routeBounds.contains(marker.getPosition())) {
        markers.push(marker);
      }
    });

    return markers;
  }.property('route', 'impairedDrivers'),

  markersDidChange: function() {
    console.log(this.get('directions.routes.firstObject'));
    this.set('drunkCount', this.get('markers.length'));
  }.observes('markers.length'),

  distanceDidChange: function() {
    var distance = this.get('route.legs.firstObject.distance.value');
    if (Ember.isNone(distance)) { return; }
    this.set('distance', distance);
  }.observes('route'),
});
