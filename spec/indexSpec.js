'use strict';

var connector = require('..');

describe('connector module', function() {
  it('exposes lib/handlers/getProjects as getProjects', function() {
    expect(connector.getProjects).toBe(require('../lib/handlers/getProjects'));
  });
});
