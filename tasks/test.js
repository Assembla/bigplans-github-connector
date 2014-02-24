'use strict';

module.exports = function(grunt) {
  grunt.registerTask('test', ['lint', 'jasmine_node']);
};
