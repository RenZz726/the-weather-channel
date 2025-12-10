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

const passwordInput = document.querySelector("#password");
const passwordBox = passwordInput.closest(".signin-inputbox");
const passwordIcon = passwordBox.querySelector(".signin-validicon");
const TICK_IMG = "assests/tick1.svg";
const CROSS_IMG = "assests/cross1.svg";
const ruleLength = document.querySelector("#rule-length");
const ruleNumber = document.querySelector("#rule-number");
const ruleSpecial = document.querySelector("#rule-special");
const iconLength = ruleLength.querySelector(".rule-icon");
const iconNumber = ruleNumber.querySelector(".rule-icon");
const iconSpecial = ruleSpecial.querySelector(".rule-icon");
const numberPattern = /[0-9]/;
const specialPattern = /[!@#$%&]/;
passwordIcon.style.display = "none";
function showBullet(iconEl) {
  iconEl.src = "";
  iconEl.style.width = "0";
}
function showIcon(iconEl, imgSrc) {
  iconEl.src = imgSrc;
  iconEl.style.width = "10px";
  iconEl.style.marginRight = "6px";
}
function updateRule(ruleEl, iconEl, isValid, isTyping) {
  if (!isTyping) {
    showBullet(iconEl);
    ruleEl.style.color = "#686c74";
    ruleEl.style.listStyleType = "disc";
    return;
  }
  ruleEl.style.listStyleType = "none";
  if (isValid) {
    ruleEl.style.color = "green";
    showIcon(iconEl, TICK_IMG);
  } else {
    ruleEl.style.color = "red";
    showIcon(iconEl, CROSS_IMG);
  }
}

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  const validLength = value.length >= 8;
  const validNumber = numberPattern.test(value);
  const validSpecial = specialPattern.test(value);
  const isTyping = value.length > 0;
  updateRule(ruleLength, iconLength, validLength, isTyping);
  updateRule(ruleNumber, iconNumber, validNumber, isTyping);
  updateRule(ruleSpecial, iconSpecial, validSpecial, isTyping);
  passwordInput.style.borderColor = "#1b4de4";
  passwordIcon.style.display = "none";
});

passwordInput.addEventListener("blur", () => {
  const value = passwordInput.value.trim();
  const validLength = value.length >= 8;
  const validNumber = numberPattern.test(value);
  const validSpecial = specialPattern.test(value);
  if (value === "") {
    passwordInput.style.borderColor = "red";
    updateRule(ruleLength, iconLength, false, false);
    updateRule(ruleNumber, iconNumber, false, false);
    updateRule(ruleSpecial, iconSpecial, false, false);
    passwordIcon.style.display = "none";
    return;
  }
  if (validLength && validNumber && validSpecial) {
    passwordInput.style.borderColor = "#1b4de4";
    passwordIcon.style.display = "block";
  } else {
    passwordInput.style.borderColor = "red";
    passwordIcon.style.display = "none";
  }
});

const eyeButtons = document.querySelectorAll(".eye-btn");
eyeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".signin-password").querySelector("input");
    if (input.type === "password") {
      input.type = "text";
      btn.querySelector("img").src = "assets/eye-open.svg";
    } else {
      input.type = "password";
      btn.querySelector("img").src = "assets/password.svg";
    }
  });
});

const confirmInput = document.querySelector("#confirmPassword");
const confirmBox = confirmInput.closest(".signin-inputbox");
const confirmIcon = confirmBox.querySelector(".signin-validicon");
const confirmError = confirmBox.querySelector("#confirm-error");
confirmIcon.style.display = "none";
confirmError.textContent = "";
let confirmTyped = false;
function checkConfirmPassword() {
  const confirmValue = confirmInput.value;
  const passwordValue = passwordInput.value;
  if (confirmValue.trim() === "") {
    confirmError.textContent = "Password is required";
    confirmInput.style.borderColor = "red";
    confirmIcon.style.display = "none";
    return;
  }
  if (confirmValue !== passwordValue) {
    confirmError.textContent = "Passwords do not match";
    confirmInput.style.borderColor = "red";
    confirmIcon.style.display = "none";
  } else {
    confirmError.textContent = "";
    confirmInput.style.borderColor = "#1b4de4";
    confirmIcon.style.display = "block";
  }
}
confirmInput.addEventListener("focus", () => {
  confirmInput.style.borderColor = "#1b4de4";
  confirmError.textContent = "";
});
confirmInput.addEventListener("input", () => {
  if (!confirmTyped && confirmInput.value.length > 0) confirmTyped = true;
  checkConfirmPassword();
});
passwordInput.addEventListener("input", () => {
  if (confirmTyped) {
    checkConfirmPassword();
  }
});


