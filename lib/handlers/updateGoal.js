'use strict';

var _ = require('underscore');
var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken, userName, urlName, goal
function updateGoal(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  var issue = translator.toIssue(params.goal);
  var data  = {
    number: params.goal.external_id,
    user:   params.userName,
    repo:   params.urlName
  };
  _.extend(data, issue);

  github.issues.edit(data, function(err, issue) {
    if(err) { return respondWith(err); }

    issue = translator.toGoal(issue);
    respondWith(issue);
  });
}

module.exports = updateGoal;
