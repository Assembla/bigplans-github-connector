'use strict';

var config = require('load-grunt-config');
var path = require('path');

module.exports = function(grunt) {
  config(grunt, {
    configPath: path.join(process.cwd(), 'tasks/config'),
    init: true,
    loadGruntTasks: true,

    config: {
      pkg    : grunt.file.readJSON('package.json'),
      src    : ['index.js', 'lib/**/*.js'],
      config : ['package.json', 'Gruntfile.js', '.jshintrc', 'tasks/**/*.js'],
      specs  : ['spec/**/*.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('pre-commit', ['test']);
};
