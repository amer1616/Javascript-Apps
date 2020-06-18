// event to submit the form
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// saving the issueInputForm, using localstorage

function saveIssue(ev) {
  let issueDesc = document.getElementById('issueDescInput').value;
  let issueSeverity = document.getElementById('issueSeverityInput').value;
  let issueAssignedTo = document.getElementById('issueAssignInput').value;
  let issueId = chance.guid();
  let issueStatus = 'Open';

  // creating issue obj to be used it for localStorage
  var issue = {
    id: issueId,
    desc: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  };

  // check if localStorage array is empty to create new array store and setting new obj issue in JSON form
  if (localStorage.getItem('issues') == null) {
    issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    // else get all stored issues & set new items in JSON form
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // reset all form inputs after adding new issue
  document.getElementById('issueInputForm').reset();

  // fetching all issues to update the list
  fetchIssues();

  // prevent normal page refersh after submitting
  ev.preventDefault();
}
// setting status to Closed
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }
  //updating our output
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
};

//deleting issue
function deleteIssue(id, ev) {
  let issues = JSON.parse(localStorage.getItem('issues'));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  };
  //updating our output
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  ev.preventDefault();
};

// fetching issues
function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (let issue of issues) {
    issuesList.innerHTML +=
      `
      <div class="notification content is-primary">
          <h5>Issue Id: ${issue.id}</h5>
          <p><span class="tag is-info">${issue.status}</span></p>
          <h3>${issue.desc}</h3>
          <p><span class="icon"><i class="fa fa-calendar"></i></span> ${issue.severity}</p>
          <p><span class="icon"><i class="fa fa-user"></i></span> ${issue.assignedTo}</p>
          <a href="#/" onclick="setStatusClosed(\'${issue.id}\')" class="button is-warning">Close</a>
          <a href="#/" onclick="deleteIssue(\'${issue.id}\')" class="button is-danger">Delete</a>
      </div>
        `;
  }
}

window.addEventListener('load', fetchIssues);