let menuToggle = document.getElementById("menu-toggle");
let popupNav = document.getElementById("popup_nav");
const userProfileButton = document.getElementById("user-profile");
const logoutButton = document.getElementById("logout-button");
const logoutButtons = document.getElementsByClassName("logout-button");
const popupLogoutButton = document.getElementById("popup-logout-button");
const popupUserProfileButton = document.getElementById("popup-user-profile");

menuToggle.addEventListener("click", function () {
  if (menuToggle.classList.contains("is-active")) {
    menuToggle.classList.remove("is-active");
    menuToggle.style.borderBottom = "2px solid";
    menuToggle.style.borderTop = "2px solid";
    popupNav.style.transform = "translate(100% ,0)";
  } else {
    menuToggle.classList.add("is-active");
    menuToggle.style.border = "0";
    popupNav.style.transform = "none";
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 990) {
    popupNav.style.display = "none";
  } else {
    popupNav.style.display = "block";
  }
});

userProfileButton.addEventListener("click", () => {
  if (userProfileButton.classList.contains("active")) {
    userProfileButton.classList.remove("active");
    logoutButton.classList.remove("active");
  } else {
    userProfileButton.classList.add("active");
    logoutButton.classList.add("active");
  }
});

popupUserProfileButton.addEventListener("click", () => {
  if (popupUserProfileButton.classList.contains("active")) {
    popupUserProfileButton.classList.remove("active");
    popupLogoutButton.classList.remove("active");
  } else {
    popupUserProfileButton.classList.add("active");
    popupLogoutButton.classList.add("active");
  }
});

for (const logoutButton of logoutButtons) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("username");
  });
}

let username = localStorage.getItem("username");
const userProfiles = document.getElementsByClassName("user-profile");
const loginButtons = document.getElementsByClassName("header_enter_btn");
const usernameContainers = document.getElementsByClassName("user-username");
if (username) {
  for (const loginButton of loginButtons) {
    loginButton.classList.add("hidden");
  }
  for (const usernameContainer of usernameContainers) {
    usernameContainer.innerHTML = username;
  }
} else {
  for (const userProfile of userProfiles) {
    userProfile.classList.add("hidden");
  }
}
