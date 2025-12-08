let calendar_previous = document.querySelector(".calendar-previous");
let calendar_next = document.querySelector(".calendar-next");
let month_name = document.querySelector(".month-name");
let year_name = document.querySelector(".year-name");
let con1 = document.querySelector(".container1");
let mcard1 = document.querySelector(".monthly-card1");
let c1 = document.querySelector(".c1");
let monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

console.log(calendar_next);
let i;
calendar_next.addEventListener("click", () => {
  if (Number(year_name.value) > 0) {
    console.log(Number(year_name.value));
    for (i = 0; i < monthArray.length; i++) {
      if (monthArray[i] === month_name.value) {
        break;
      }
    }
    if (month_name.value === "Dec") {
      year_name.value = (Number(year_name.value) + 1).toString();
      if (Number(year_name.value) === 0) year_name.value = "2026";
    }

    if (i === monthArray.length - 1) {
      calendar_next.textContent = monthArray[1];
      month_name.value = monthArray[0];
      calendar_previous.textContent = monthArray[i];
    } else if (i === monthArray.length - 2) {
      calendar_next.textContent = monthArray[0];
      month_name.value = monthArray[i + 1];
      calendar_previous.textContent = monthArray[i];
    } else {
      calendar_next.textContent = monthArray[i + 2];
      month_name.value = monthArray[i + 1];
      calendar_previous.textContent = monthArray[i];
    }
  }
});

calendar_previous.addEventListener("click", () => {
  if (Number(year_name.value) >= 2024) {
    for (i = 0; i < monthArray.length; i++) {
      if (monthArray[i] === month_name.value) {
        break;
      }
    }
    if (month_name.value === "Jan") {
      year_name.value = (Number(year_name.value) - 1).toString();
      if (Number(year_name.value) === 0) year_name.value = "2024";
    }

    if (i === 0) {
      calendar_next.textContent = monthArray[i];
      month_name.value = monthArray[monthArray.length - 1];
      calendar_previous.textContent = monthArray[monthArray.length - 2];
    } else if (i === 1) {
      calendar_next.textContent = monthArray[i];
      month_name.value = monthArray[i - 1];
      calendar_previous.textContent = monthArray[monthArray.length - 1];
    } else {
      calendar_next.textContent = monthArray[i];
      month_name.value = monthArray[i - 1];
      calendar_previous.textContent = monthArray[i - 2];
    }
  }
});

month_name.addEventListener("input", () => {
  console.log(month_name.value);
  //   console.log(calendar_next.textContent);

  for (let i = 0; i < monthArray.length; i++) {
    if (monthArray[i] === month_name.value) {
      if (i === monthArray.length - 1) {
        calendar_next.textContent = monthArray[0];
        calendar_previous.textContent = monthArray[i - 1];
      } else if (i === 0) {
        calendar_next.textContent = monthArray[i + 1];
        calendar_previous.textContent = monthArray[monthArray.length - 1];
      } else {
        calendar_next.textContent = monthArray[i + 1];
        calendar_previous.textContent = monthArray[i - 1];
      }
    }
  }
});

let boxes = document.querySelectorAll(".card");

con1.addEventListener("click", (e) => {
  mcard1.classList.remove("hide");

  let tar = e.target.className;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove("active");
  }
  if (tar === "card") e.target.classList.add("active");
});

c1.addEventListener("click", () => {
  mcard1.classList.add("hide");
});
