'use strict';

var translator = require('../../lib/translator');

describe('Translator', function() {
  describe('#toBpUser', function() {
    it('translates user fields', function() {
      var githubUser = { name: 'Bob Marley', login: 'bob', email: 'bob@mail.com' };
      var result = translator.toBpUser(githubUser);

      expect(result).toEqual({ login: 'bob', email: 'bob@mail.com' });
    });
  });


  describe('#toProject', function() {
    it('translates repo fields', function() {
      var githubRepo = {
        name: 'repo-one',
        full_name: 'Repo One',
        git_clone_url: 'git@github.com/'
      };

      var result = translator.toProject(githubRepo);
      expect(result).toEqual({ name: 'Repo One', urlName: 'repo-one' });
    });
  });


  describe('#toIssue', function() {
    var bpGoal;

    beforeEach(function() {
      bpGoal = {
        title: 'goal name',
        description: 'some text'
      };
    });

    it('translates goal fields', function() {
      var result = translator.toIssue(bpGoal);

      expect(result.title).toEqual(bpGoal.title);
      expect(result.body).toEqual(bpGoal.description);
      expect(result.state).toBeUndefined();
      expect(result.labels).toBeDefined();
    });

    describe('status changes', function() {
      it('assigns status open', function() {
        bpGoal.status = 1; // WIP
        var result = translator.toIssue(bpGoal);
        expect(result.state).toEqual('open');
      });

      it('assigns status closed', function() {
        bpGoal.status = 2; // CLOSED
        var result = translator.toIssue(bpGoal);
        expect(result.state).toEqual('closed');
      });
    });
  });


  describe('#toGoal', function() {
    var ghIssue;
    var reqParams;

    beforeEach(function() {
      ghIssue = {
        title: 'issue name',
        body: 'some text',
        number: 5,
        state: 'open'
      };

      reqParams = {
        userName: 'qwerty',
        urlName:  'qwerty-repo'
      };
    });

    it('translates issue fields', function() {
      var result = translator.toGoal(ghIssue, reqParams);

      var link = 'https://github.com/qwerty/qwerty-repo/issues/' + ghIssue.number;
      expect(result.link)       .toEqual(link);
      expect(result.title)      .toEqual(ghIssue.title);
      expect(result.description).toEqual(ghIssue.body);
      expect(result.external_id).toEqual(ghIssue.number);
    });

    describe('status changes', function() {
      it('assigns status open', function() {
        var result = translator.toGoal(ghIssue, reqParams);

        expect(result.status).toEqual(0);
      });

      it('assigns status closed', function() {
        ghIssue.state = 'closed';
        var result = translator.toGoal(ghIssue, reqParams);

        expect(result.status).toEqual(2);
      });
    });
  });
});
