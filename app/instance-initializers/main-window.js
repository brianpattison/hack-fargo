import Ember from 'ember';
var remote = requireNode('remote');

export function initialize(instance) {
  var mainWindow = remote.getCurrentWindow();
  var settings = instance.container.lookup('service:settings');

  // Check for window frame settings and
  if (Ember.isNone(settings.get('mainWindowBounds'))) {
    settings.set('mainWindowBounds', mainWindow.getBounds());
  } else {
    mainWindow.setBounds(settings.get('mainWindowBounds'));
  }

  // Save the main window bounds on move
  mainWindow.removeAllListeners('move');
  mainWindow.on('move', function(e) {
    settings.set('mainWindowBounds', e.sender.getBounds());
  });

  // Save the main window bounds on resize
  mainWindow.removeAllListeners('resize');
  mainWindow.on('resize', function(e) {
    settings.set('mainWindowBounds', e.sender.getBounds());
  });
}

export default {
  name: 'main-window',
  after: 'settings',
  initialize: initialize
};
