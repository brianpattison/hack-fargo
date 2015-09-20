/* global __dirname */
'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Set app name and app version from environment variables
app.setName('Hack Fargo');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'accept-first-mouse': false,
    'height':             400,
    'min-height':         250,
    'min-width':          465,
    'show':               false,
    'title':              app.getName(),
    'width':              470
  });

  if (process.env.ELECTRON_ENV === 'development') {
    mainWindow.loadUrl('file://' + __dirname + '/development.html');
    // mainWindow.openDevTools();
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');
  }

  // Wait to show the window until the app has loaded
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});
