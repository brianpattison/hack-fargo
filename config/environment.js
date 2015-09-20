/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hack-fargo',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // CSP Policy Directives
  // @see https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives
  ENV.contentSecurityPolicy = {
    'connect-src': "'self' *.googleapis.com gis.hackfargo.co",
    'default-src': "'none'",
    'font-src': "'self' fonts.gstatic.com",
    'img-src': "*",
    'media-src': "'self'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com",
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
