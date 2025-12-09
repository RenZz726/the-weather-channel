function showPage(pageId) {
  const pages = ["signinPage", "signupPage", "forgotPage"];

  pages.forEach((id) => {
    const page = document.getElementById(id);
    if (page) page.style.display = "none";
  });

  const activePage = document.getElementById(pageId);
  if (activePage) activePage.style.display = "block";
}

showPage("signinPage");

const firstName = document.querySelector("#firstName");
const parentBox = firstName.closest(".signin-inputbox");
const firstNameIcon = parentBox.querySelector(".signin-validicon");
const errorMsg = parentBox.querySelector(".error-msg");
firstNameIcon.style.display = "none";
errorMsg.textContent = "";
let firstNameTyped = false;
firstName.addEventListener("focus", () => {
  firstName.style.borderColor = "#1b4de4";
  const rawValue = firstName.value;
  const trimmed = rawValue.trim();
  if (firstNameTyped) {
    if (rawValue.length === 0) {
      errorMsg.textContent = "First Name is Required";
    } else if (trimmed === "") {
      errorMsg.textContent =
        "You have entered only spaces. This is an incorrect format. Please try again.";
    } else {
      errorMsg.textContent = "";
    }
  } else {
    errorMsg.textContent = "";
  }
});
firstName.addEventListener("input", () => {
  const rawValue = firstName.value;
  const trimmed = rawValue.trim();
  if (!firstNameTyped && rawValue.length > 0) {
    firstNameTyped = true;
  }
  if (rawValue.length > 0 && trimmed === "") {
    errorMsg.textContent =
      "You have entered only spaces. This is an incorrect format. Please try again.";
    firstNameIcon.style.display = "none";
    firstName.style.borderColor = "#1b4de4";
    return;
  }
  if (trimmed === "") {
    if (firstNameTyped) {
      errorMsg.textContent = "First Name is Required";
    } else {
      errorMsg.textContent = "";
    }
    firstNameIcon.style.display = "none";
    firstName.style.borderColor = "#1b4de4";
  } else {
    errorMsg.textContent = "";
    firstNameIcon.style.display = "none";
    firstName.style.borderColor = "#1b4de4";
  }
});
firstName.addEventListener("blur", () => {
  const rawValue = firstName.value;
  const trimmed = rawValue.trim();
  if (rawValue.length > 0 && trimmed === "") {
    firstNameIcon.style.display = "none";
    firstName.style.borderColor = "red";
    errorMsg.textContent =
      "You have entered only spaces. This is an incorrect format. Please try again.";
    return;
  }
  if (trimmed === "") {
    if (firstNameTyped) {
      errorMsg.textContent = "First Name is Required";
      firstName.style.borderColor = "red";
    } else {
      errorMsg.textContent = "";
      firstName.style.borderColor = "#1b4de4";
    }
    firstNameIcon.style.display = "none";
  } else {
    firstNameIcon.style.display = "block";
    firstName.style.borderColor = "#1b4de4";
    errorMsg.textContent = "";
  }
});

const emailInput = document.querySelector("#email");
const emailBox = emailInput.closest(".signin-inputbox");
const emailIcon = emailBox.querySelector(".signin-validicon");
let emailError = emailBox.querySelector(".error-msg");
if (!emailError) {
  emailError = document.createElement("div");
  emailError.classList.add("error-msg");
  emailBox.appendChild(emailError);
}
emailIcon.style.display = "none";
emailError.textContent = "";
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/;
emailInput.addEventListener("focus", () => {
  emailInput.style.borderColor = "#1b4de4";
  emailError.textContent = "";
});
emailInput.addEventListener("input", () => {
  const value = emailInput.value;
  emailIcon.style.display = "none";
  emailInput.style.borderColor = "#1b4de4";
  emailError.textContent = "";
  if (/[A-Z]/.test(value)) {
    emailInput.style.borderColor = "red";
    emailError.textContent = "Email must not contain capital letters";
  }
});
emailInput.addEventListener("blur", () => {
  const value = emailInput.value.trim();
  if (value === "") {
    emailInput.style.borderColor = "red";
    emailError.textContent = "Email is required";
    emailIcon.style.display = "none";
    return;
  }
  if (!emailPattern.test(value)) {
    emailInput.style.borderColor = "red";
    emailError.textContent = "Invalid input";
    emailIcon.style.display = "none";
  } else {
    emailInput.style.borderColor = "#1b4de4";
    emailError.textContent = "";
    emailIcon.style.display = "block";
  }
});
