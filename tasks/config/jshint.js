'use strict';

var readJSON = require('grunt/lib/grunt/file').readJSON;

module.exports = {
  options: readJSON('.jshintrc'),
  all: ['<%= config %>', '<%= src %>', '<%= specs %>']
};
