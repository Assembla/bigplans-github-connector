'use strict';

var Q = require('q');
var GitHubApi = require('github');


module.exports = GitHubSession;


function GitHubSession(token) {
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


  this.getOwnRepos = function() {
    return Q.promise(function(resolve, reject) {
      github.repos.getAll({}, function(err, repos) {
        if (err) return reject(err);

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


  this.getOrganisations = function() {
    return Q.promise(function(resolve, reject) {
      github.user.getOrgs({}, function(err, organisations) {
        if (err) return reject(err);

        organisations = organisations.map(function(organisation) {
          return organisation.login;
        });

        resolve(organisations);
      });

      return reject;
    });
  };


  this.getOrganisationRepos = function(organisation) {
    return Q.promise(function(resolve, reject) {
      github.repos.getFromOrg({
        org: organisation
      }, function(err, repos) {
        if (err) return reject(err);

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

}


