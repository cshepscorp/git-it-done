var userFormEl = document.querySelector("#user-form"); // search area's form id
var nameInputEl = document.querySelector("#username"); // input area's id
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");

var getFeaturedRepos = function(language) {
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data.items, language);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  });
};


var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
  // make a request to the url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });
};

// executes upon form submission
var formSubmitHandler = function(event) {
  event.preventDefault(); // prevents the browser from sending the form's input data to a URL
  // get value from input element
  var username = nameInputEl.value.trim(); // nameInputEl is shortcut for form input element declared above

  if (username) {
    getUserRepos(username); // pass username data as parameter into the getUserRepos function
    nameInputEl.value = ""; // clear out value entered into input area since prevent default wont let it refresh
  } else {
    alert("Please enter a GitHub username"); // makes sure user enters a username
  }
  console.log(event); // event parameter returns SubmitEVent
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  // user exists but has no repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name; // owner:login is username

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) { // if repo has any open issues, display the number of and add red X icon
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"; // if repo has no open issues, add blue check icon
    }
    console.log(repos[i].open_issues_count);
    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }

}

var buttonClickHandler = function(event){
  var language = event.target.getAttribute("data-language");
  console.log(language);

  if (language) {
    getFeaturedRepos(language);
  
    // clear old content
    repoContainerEl.textContent = "";
  }
}

getFeaturedRepos();
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);