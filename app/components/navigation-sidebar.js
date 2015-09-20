import Ember from 'ember';
var interact = requireNode('interact.js');

export default Ember.Component.extend({
  classNames: ['navigation-sidebar'],
  tagName: 'nav',

  didInsertElement: function() {
    var initialWidth = this.get('settings.navigationWidth');
    var minContainerWidth = 50;
    var navSelector = '.navigation-sidebar';
    var self = this;

    Ember.run.scheduleOnce('afterRender', function() {
      // Enable resizing
      var navigation = interact(navSelector);
      var navigationWidth, windowWidth;

      navigation.resizable({ edges: { right: '.resize' } });

      navigation.on('resizestart', function() {
        document.body.style.cursor = 'col-resize';
        windowWidth = window.innerWidth;
      });

      // Perform the actual resizing
      navigation.on('resizemove', function(event) {
        navigationWidth = event.rect.width;
        // Make sure the navigation can't be resized past the window or too small
        if (windowWidth - minContainerWidth > navigationWidth && navigationWidth > minContainerWidth) {
          event.target.style.maxWidth = navigationWidth + 'px';
          event.target.style.minWidth = navigationWidth + 'px';
        }
      });

      // Save the resized width to app settings
      navigation.on('resizeend', function() {
        self.set('settings.navigationWidth', navigationWidth);
        document.body.style.cursor = 'default';
      });

      // Set the initial width from the saved setting
      if (initialWidth) {
        setTimeout(function() {
          var nav = $(navSelector);
          nav.css({
            maxWidth: initialWidth + 'px',
            minWidth: initialWidth + 'px'
          });
          $('.application').css({ opacity: 1 });
        }, 0);
      } else {
        $('.application').css({ opacity: 1 });
      }
    });
  }
});
