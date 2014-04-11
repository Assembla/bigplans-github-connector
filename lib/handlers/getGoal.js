'use strict';

var formatJsend   = require('../formatJsend');
var GithubSession = require('../githubSession');
var translator    = require('../translator');

// params: accessToken, urlName, userName, id
function getGoal(params, callback) {
  var github      = GithubSession.connect(params.accessToken);
  var respondWith = formatJsend.respondWith(callback);

  github.issues.getRepoIssue({
    number: params.id,
    user:   params.userName,
    repo:   params.urlName
  }, function(err, issue) {
    // err object will be passed on not_found
    if(err) { return respondWith(err); }

    issue = translator.toGoal(issue);
    respondWith({ goal: issue });
  });
}

module.exports = getGoal;
