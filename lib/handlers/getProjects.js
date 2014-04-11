'use strict';

var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken
function getProjects(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  github.repos.getAll({}, function(err, repos) {
    if (err) { return respondWith(err); }

    repos = repos.map(translator.toProject);
    respondWith({ projects: repos });
  });
}

module.exports = getProjects;
