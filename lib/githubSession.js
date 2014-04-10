'use strict';

var GitHubApi = require('github');

function GithubSession(token) {
  var github = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000
  });

  github.authenticate({
    type: 'oauth',
    token: token
  });

  return github;
}

function connect(token) {
  return new GithubSession(token);
}

module.exports          = GithubSession;
module.exports.connect  = connect;
