/*
 * grunt-i18n
 * https://github.com/amido/grunt-version-compile
 *
 * Copyright (c) 2015 Amido
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('compileVersion', 'Browserify centric plugin that allows multiple builds, rename files with known extensions in order to provide alternative versions of apps', function() {
    var config = grunt.config.get('compileVersion');
    if (!config.task)
      throw new Error('compileVersion: task must be supplied');

    if (!config.versions.length)
      throw new Error('compileVersion: versions must contain at least one value');

    grunt.task.run(config.task);
    var root = config.root || '.';
    var task = config.task;
    config.versions.forEach(function(version) {
      var preName = 'compileVersion-' + version + '-pre';
      var postName = 'compileVersion-' + version + '-post';
      if (!grunt.task.exists(preName)) {
        grunt.registerTask(preName, 'copied the files over', function() {
          var results = grunt.file.expand(root + '/**/*.' + version + '.*');
          results.forEach(function (versionFilePath) {
            var ext = path.extname(versionFilePath),
                defaultFilePath = versionFilePath.replace('.' + version + ext, ext),
                backupFileName = versionFilePath.replace('.' + version + ext, '-old' + ext);
            grunt.file.copy(defaultFilePath, backupFileName);
            grunt.file.copy(versionFilePath, defaultFilePath);
          });
        });
      }

      if (!grunt.task.exists(postName)) {
        grunt.registerTask(postName, 'copied the files over', function() {
          var results = grunt.file.expand(root + '/**/*-old.*');
          results.forEach(function(backupFilePath) {
            var ext = path.extname(backupFilePath),
                defaultFilePath = backupFilePath.replace('-old' + ext, ext),
                versionFilePath = defaultFilePath.replace(ext, '.' + version + ext);
            grunt.file.copy(defaultFilePath, versionFilePath);
            grunt.file.copy(backupFilePath, defaultFilePath);

            grunt.file.delete(backupFilePath);
          });
        });
      }

      grunt.task.run([preName].concat([task + ':' + version]).concat([postName]));
    });
  });

};