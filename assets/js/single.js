var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    
    // <repo> encompasses the username and repo name bc many repo names are the same across users ie. cshepscorp/git-it-done
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; //? adding direction=asc to the end of the query URL to specify the sort order

    fetch(apiUrl).then(function(response) {
        //successful
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayIssues(data);
        });
        }
        else {
            alert("There was a problem with your request!");
          }
    });
};

var displayIssues = function(issues) {
    console.log(issues);
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var kindOf;
        if (issues[i].pull_request) {
                kindOf = "(Pull request)";
            } else {
                kindOf = "(Issue)";
            }

        var issueEl = 
            `<a href='${issues[i].html_url}' target='_blank' class='list-item flex-row justify-space-between align-center'>
                    <span>${issues[i].title}</span>
                    <span>${kindOf}</span>
             </a>
            `;

        issueContainerEl.append(issueEl);
        // $("#issues-container").append(issueEl);
        // var issueEl = document.createElement("a");
        // issueEl.classList = "list-item flex-row justify-space-between align-center";
        // issueEl.setAttribute("href", issues[i].html_url);
        // issueEl.setAttribute("target", "_blank");

        // // create span to hold issue title
        // var titleEl = document.createElement("span");
        // titleEl.textContent = issues[i].title;

        // // append to container - put titleEl into issueEl
        // issueEl.appendChild(titleEl);

        // // create a type element
        // var typeEl = document.createElement("span");

        // // check if issue is an actual issue or a pull request
        // if (issues[i].pull_request) {
        // typeEl.textContent = "(Pull request)";
        // } else {
        // typeEl.textContent = "(Issue)";
        // }

        // // append to container put typeEl into issueEl
        // issueEl.appendChild(typeEl);
        
        // issueContainerEl.append(issueEl); // append to container put issueEl into issueContainerEl
      }
    
    
}

getRepoIssues('facebook/react');
