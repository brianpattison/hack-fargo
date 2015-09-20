import Ember from 'ember';

var directionsRenderer = new google.maps.DirectionsRenderer();

export default Ember.Component.extend({
  classNames: ['google-map'],
  currentMarkers: [],
  zoom: 3,

  didInsertElement: function() {
    var self = this;
    Ember.run.scheduleOnce('afterRender', function() {
      var element = self.get('element');
      var map = new google.maps.Map(element, {
        center: { lat: 46, lng: -96 },
        zoom: 3
      });
      self.set('map', map);
    });
  },

  centerDidChange: function() {
    var map = this.get('map');
    var center = this.get('center');

    if (Ember.isNone(map) || Ember.isNone(center)) {
      return;
    }

    var latLng = new google.maps.LatLng(center.get('lat'), center.get('lng'));
    map.setCenter(latLng);
  }.observes('center.lat', 'center.lng', 'map').on('init'),

  directionsDidChange: function() {
    var directions = this.get('directions');
    if (Ember.isNone(directions)) { return; }
    directionsRenderer.setDirections(directions);
  }.observes('directions'),

  mapDidChange: function() {
    var map = this.get('map');
    if (Ember.isNone(map)) { return; }
    directionsRenderer.setMap(map);
  }.observes('map'),

  markersDidChange: function() {
    var map = this.get('map');
    var markers = this.get('markers');

    if (Ember.isNone(map) || Ember.isNone(markers)) {
      return;
    }

    // Clear current markers
    var currentMarkers = this.get('currentMarkers');
    currentMarkers.forEach(function(marker) {
      marker.setMap(null);
    });

    // Add the new markers to the map
    markers.forEach(function(marker) {
      marker.setMap(map);
    });

    this.set('currentMarkers', markers);
  }.observes('map', 'markers.[]'),

  zoomDidChange: function() {
    var map = this.get('map');
    var zoom = this.get('zoom');

    if (Ember.isNone(map) || Ember.isNone(zoom)) {
      return;
    }

    map.setZoom(zoom);
  }.observes('map', 'zoom').on('init')
});
