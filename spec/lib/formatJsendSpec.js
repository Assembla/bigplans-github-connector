'use strict';

var formatJsend = require('../../lib/formatJsend');

describe('formatJsend', function() {
  var responseData;
  var errorMessage;
  var success;
  var error;

  beforeEach(function() {
    responseData = { name: 'test' };
    errorMessage = 'Error message';

    success = {
      status:   'success',
      data:     responseData,
      message:  ''
    };

    error = {
      status:   'fail',
      data:     {},
      message:  'Error message'
    };
  });

  describe('formatter', function() {
    it('formats success message', function() {
      var result = formatJsend(responseData);
      expect(result).toEqual(success);
    });

    describe('error messages', function() {
      it('asiings error object with message', function() {
        var err   = new Error(errorMessage);

        var result = formatJsend(err);
        expect(result).toEqual(error);
      });

      it('asiings error object with stack', function() {
        var err       = new Error(errorMessage);
        error.message = err.stack;
        delete err.message;

        var result = formatJsend(err);
        expect(result).toEqual(error);
      });

      it('asiings error message string', function() {
        var result = formatJsend(errorMessage);
        error.status = 'error';

        expect(result).toEqual(error);
      });
    });
  });

  describe('#respondWith wrapper', function() {
    var responseHook;
    var respondWith;

    beforeEach(function() {
      responseHook  = jasmine.createSpy('responseHook');
      respondWith   = formatJsend.respondWith(responseHook);
    });

    it('passes the correct result', function() {
      respondWith(responseData);
      expect(responseHook).toHaveBeenCalledWith(success);
    });
  });
});
