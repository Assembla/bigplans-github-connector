'use strict';

function formatError(err, isError) {
  return {
    status: isError ? 'error' : 'fail',
    data: {},
    message: err.message || err.stack
  };
}

function formatJsend(result) {
  if(result instanceof Error) { return formatError(result); }

  if(typeof result === 'string') {
    return formatError({message: result}, true);
  }

  return {
    status:   'success',
    data:     result,
    message:  ''
  };
}

function respondWith(callback) {
  return function(msg) {
    callback(formatJsend(msg));
  };
}

module.exports = formatJsend;
module.exports.respondWith = respondWith;
