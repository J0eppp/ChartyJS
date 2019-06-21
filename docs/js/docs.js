let issues;

let amountOfIssuesDiv = document.getElementById('amountOfIssues');
let latestIssueDiv = document.getElementById('latestIssue');

$.get("https://api.github.com/repos/J0eppp/ChartyJS/issues", (data) => {
  issues = data;
  console.log(data);
  amountOfIssuesDiv.innerText += " " + data.length;

  if (data.length > 0) {
    let latestIssue = {
      title: data[data.length - 1].title,
      createdBy: data[data.length - 1].user.login,
      createdByProfileLink: data[data.length - 1].user.html_url
    }

    let latestIssueTitle = document.createElement("h4");
    latestIssueTitle.appendChild(document.createTextNode(latestIssue.title));
    latestIssueDiv.appendChild(latestIssueTitle);

    let createdByP = document.createElement("p");
    createdByP.innerText = "Created by: ";

    let latestIssueAnchor = document.createElement("a");
    latestIssueAnchor.innerText = latestIssue.createdBy;
    latestIssueAnchor.href = latestIssue.createdByProfileLink;
    createdByP.appendChild(latestIssueAnchor);

    latestIssueDiv.appendChild(createdByP);
  }
});
