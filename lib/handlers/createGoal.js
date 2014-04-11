'use strict';

var _ = require('underscore');
var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken, userName, urlName, goal
function createGoal(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  var issue = translator.toIssue(params.goal);
  var data  = {
    user: params.userName,
    repo: params.urlName
  };
  _.extend(data, issue);

  github.issues.create(data, function(err, issue) {
    if(err) { return respondWith(err); }

    issue = translator.toGoal(issue);
    respondWith({ goal: issue });
  });
}

module.exports = createGoal;
