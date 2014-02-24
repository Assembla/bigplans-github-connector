'use strict';

var connector = require('..');

describe('test runner', function() {
  it('runs', function() {
    expect(connector).toEqual(jasmine.any(Object));
  });
});
