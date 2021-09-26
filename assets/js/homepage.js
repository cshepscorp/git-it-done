var userFormEl = document.querySelector("#user-form"); // search area's form id
var nameInputEl = document.querySelector("#username"); // input area's id
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data, user); // displays 
    });
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
  console.log(repos);
  console.log(searchTerm);

  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

}
  
userFormEl.addEventListener("submit", formSubmitHandler);