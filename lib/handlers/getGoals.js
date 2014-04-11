'use strict';

var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken, userName, urlName
function getGoals(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  github.issues.repoIssues({
    repo: params.urlName,
    user: params.userName,
    state: 'open',
    per_page: 100
  }, function(err, issues) {
    if (err) { return respondWith(err); }

    issues = issues.map(translator.toGoal);
    respondWith({ goals: issues });
  });
}

module.exports = getGoals;
