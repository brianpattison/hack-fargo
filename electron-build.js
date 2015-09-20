var exec = require('child_process').exec;
var packagejson = require('./package.json');
var packager = require('electron-packager');

var commands = [];

// Clean up build and temp files
commands.push('mkdir -p ./build');
commands.push('rm -rf ./build');
commands.push('mkdir -p ./dist');
commands.push('rm -rf ./dist');
commands.push('mkdir -p ./tmp');
commands.push('rm -rf ./tmp');

// Make sure node modules and bower components are installed
commands.push('npm install');
commands.push('bower install');

// Command for building the Ember app
commands.push('ember build');

// Ignore Ember source files
var ignore = [
  'app/',
  'bower_components/',
  'config/',
  'public/',
  'tests/',
  'tmp/',
  'vendor/'
];

// Additional files/folders to ignore
ignore = ignore.concat([
  'build/',
  'node_modules/.bin/',
  '.bowerrc',
  '.DS_Store',
  '.editorconfig',
  '.ember-cli',
  '.gitignore',
  '.jshintrc',
  '.travis.yml',
  '.watchmanconfig',
  'bower.json',
  'development.html',
  'electron-build.js',
  'ember-cli-build.js',
  'Procfile',
  'README.md',
  'screenshot-osx.png',
  'screenshot-windows.png',
  'testem.json'
]);

// Ignore node development dependencies
var devDependencies = packagejson['devDependencies'];
if (devDependencies === null || devDependencies === undefined) {
  devDependencies = {};
}
Object.keys(devDependencies).forEach(function(moduleName) {
  ignore.push('node_modules/' + moduleName);
});

// Build the Ember app
console.log(commands.join(' && '));
exec(commands.join(' && '), function() {
  // Build the Electron app
  var versionString = packagejson['versionString'];
  versionString['ProductName'] = packagejson['productName'];
  versionString['ProductVersion'] = packagejson['version'];

  packager({
    all:              true,
    'app-bundle-id':  packagejson['appBundleId'],
    'app-version':    packagejson['version'],
    asar:             true,
    dir:              './',
    ignore:           ignore,
    name:             packagejson['productName'],
    out:              './build',
    overwrite:        true,
    version:          packagejson['devDependencies']['electron-prebuilt'].replace(/[^\d.]/g, '')
    // ,'version-string': versionString // Wine is required to set the Windows version string
  }, function(error, appPath) {
    console.log('error:', error);
    console.log('appPath:', appPath);
  });
});
