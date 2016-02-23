/*
 * grunt-version-compile
 * https://github.com/amido/grunt-version-compile
 *
 * Copyright (c) 2015 Silas Landricombe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var count = 1;
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    compileVersion: {
        versions: ['alt'],
        root: 'test',
        task: 'build'
    },

    copy: {
      main: {
        expand: true,
        flatten: true,
        src: [ 'test/nested/folder/constants.js', 'test/nested/folder/styles.css' ],
        dest: 'test/build'
      },
      alt: {
        expand: true,
        flatten: true,
        src: [ 'test/nested/folder/constants.js', 'test/nested/folder/styles.css' ],
        dest: 'test/build/alt/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'compileVersion', 'nodeunit']);
  grunt.registerTask('build', ['copy:main']);
  grunt.registerTask('build:alt', ['copy:alt']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
