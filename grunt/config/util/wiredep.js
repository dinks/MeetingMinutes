// Configuration for Wiredep task(s)
// Injects Bower packages into your source code.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('wiredep', {
    app: {
      options: {
        ignorePath: /client\/|\.\.\//g,
        // Make sure everything has an absolute path (starts with '/')
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        // packages to ignore
        exclude: [
          'bower_components/html5shiv/',
          'bower_components/consolelog/',
          'bower_components/modernizr/',
          'bower_components/es5-shim/'
        ],
        overrides: {
          'foundation': {
            'main': [
              'css/foundation.css',
              'css/foundation.css.map',
              'js/foundation.js',
              'js/foundation/foundation.reveal.js',
              'js/foundation/foundation.topbar.js',
              'js/foundation/foundation.alert.js'
            ]
          },
          'lscache': {
            'main': 'lscache.min.js'
          },
          'pace': {
            'main': [
              'pace.min.js',
              'themes/blue/pace-theme-minimal.css'
            ]
          }
        }
      },
      src: [
        '<%= yeogurt.client %>/index.html'
      ]
    },
    styles: {
      src: ['<%= yeogurt.client %>/styles/**/*.{scss,sass}'],
      ignorePath: /client/g
    }
  });

};

module.exports = taskConfig;
