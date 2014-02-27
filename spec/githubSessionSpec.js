'use strict';

var GitHubSession = require('../lib/githubSession.js');


describe('GitHubSession: wrapper for the node-github module', function() {
  var github, token, username;

  beforeEach(function() {
    username = 'test-bpc';
    token = '08e4314357fa1ce5ca492d02ddd2649b5b1af452';
    github = new GitHubSession(token);
  });


  describe('.getOwnRepos', function() {
    var expectedRepos;

    beforeEach(function() {
      expectedRepos = [{
        name: username + '/repo1',
        urlName: 'repo1'
      }, {
        name: username + '/repo2',
        urlName: 'repo2'
      }, {
        name: username + '/repo3',
        urlName: 'repo3'
      }];
    });

    it('returns the list of user’s repos', function(done) {
      github.getOwnRepos()
      .then(function successHandler(repos) {
        expect(repos).toEqual(expectedRepos);
        done();
      })
      .catch(function errorHandler(err) {
        expect(err.message).toBe('');
        done(false);
      });
    });
  });

});
