const form = document.querySelector(".form");
const mainContent = document.querySelector(".main-content");
const results = document.querySelector(".results");
const alert = document.createElement("div");

if (form) form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  clearResults(results);

  const query = document.querySelector(".form-input").value;
  const p = document.createElement("p");
  const processing = document.createTextNode("processing...");
  p.appendChild(processing);

  mainContent.appendChild(p);

  if (query == "") return displayValidationError();

  fetch(`https://api.github.com/search/users?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayUsers(data));
}

function displayUsers(data) {
  if (alert) alert.remove();

  mainContent.removeChild(mainContent.lastChild);

  const users = data.items.slice(0, 10);

  users.forEach((user) => {
    let card = document.createElement("a");
    card.className = "card";
    card.href = user.html_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    let avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = user.avatar_url;
    avatar.alt = user.login;
    let name = document.createElement("p");
    name.className = "name";
    name.appendChild(document.createTextNode(user.login));

    card.appendChild(avatar);
    card.appendChild(name);

    results.appendChild(card);
  });
}

function displayValidationError() {
  mainContent.removeChild(mainContent.lastChild);

  alert.className = "alert";
  const message = document.createTextNode("Search field cannot be empty");
  const error = document.createElement("span");
  error.appendChild(document.createTextNode("Alert!"));

  alert.appendChild(message);
  alert.appendChild(error);

  mainContent.appendChild(alert);
}

function clearResults(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
