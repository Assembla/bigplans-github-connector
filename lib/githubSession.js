'use strict';

var Q = require('q');
var GitHubApi = require('github');


module.exports = GitHubSession;


function GitHubSession(token) {
  this.github = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000
  });

  this.github.authenticate({
    type: 'oauth',
    token: token
  });
}


GitHubSession.prototype.getOwnRepos = function() {
  var github = this.github;

  return Q.promise(function(resolve, reject) {
    github.repos.getAll({}, function(err, repos) {
      if (err) {
        reject(err);
        return;
      }

      repos = repos.map(function(repo) {
        return {
          name    : repo.full_name,
          urlName : repo.name
        };
      });

      resolve(repos);
    });
  });
};
