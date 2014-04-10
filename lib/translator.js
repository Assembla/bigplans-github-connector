'use strict';

function getGoalStatus(issue) {
  return (issue.state === 'open') ? 0 : 2;
}

function getIssueState(goal) {
  return (Number(goal.status) < 2) ? 'open' : 'closed';
}

// translations goes below:
function toGoal(issue) {
  return {
    title:        issue.title,
    description:  issue.body,
    external_id:  issue.number,
    status:       getGoalStatus(issue)
  };
}

function toIssue(goal) {
  var issue = {
    title:  goal.title,
    body:   goal.description,
    labels: goal.labels || []
  };

  if(goal.status) {
    issue.state = getIssueState(goal);
  }

  return issue;
}


function toProject(repo) {
  return {
    name:     repo.full_name,
    urlName:  repo.name
  };
}


function toBpUser(ghUser) {
  return {
    login: ghUser.login,
    email: ghUser.email
  };
}
// translations END

module.exports.toGoal     = toGoal;
module.exports.toIssue    = toIssue;
module.exports.toProject  = toProject;
module.exports.toBpUser   = toBpUser;
