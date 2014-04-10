'use strict';

var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken, userName, urlName
function getUsers(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  github.repos.getCollaborators({
    user: params.userName,
    repo: params.urlName
  }, function(err, collaborators) {
    if (err) { return respondWith(err); }

    collaborators = collaborators.map(translator.toBpUser);
    respondWith(collaborators);
  });
}

module.exports = getUsers;
