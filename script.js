const mainBody = document.querySelector(".main-without-footer");
const adBlock = document.querySelector(".adv1");
const footerSection = document.querySelectorAll(".footer");

const todayButton = document.querySelector('.today-with-content')
const hourlySection = document.querySelector(".hourhourly");
const hourlyButton = document.querySelector(".hourly-with-content");

const monthlySection = document.querySelector(".monthly");
const monthlyButton = document.querySelector(".monthly-with-content");

const radarButton = document.querySelector(".radar-with-content");
const radarSection = document.querySelector(".radar");
const radarFooterSection = document.querySelector(".radar-footer");

hourlySection.classList.add("hide");
monthlySection.classList.add("hide");
radarSection.classList.add("hide");

todayButton.addEventListener('click',()=>{
mainBody.classList.remove('hide')
hourlySection.classList.add("hide");
monthlySection.classList.add("hide");
radarSection.classList.add("hide");
})
hourlyButton.addEventListener("click", () => {
  mainBody.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  hourlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
});

monthlyButton.addEventListener("click", () => {
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  radarSection.classList.add("hide");
  monthlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
});

radarButton.addEventListener("click", () => {
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  footerSection[1].classList.add("hide");
  radarSection.classList.remove("hide");
});

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
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.watchPosition(success, error);
let marker, circle, zoomed;

function success(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

  if (!zoomed) {
    Zoomed = map.fitBounds(circle.getBounds());
    map.setZoom(map.getZoom() - 6);
  }
  map.setView([lat, lng]);
}

function error(err) {
  if (err.code === 1) {
    alert("Please allow geolocation access");
  } else {
    alert("Cannot get current location");
  }
}
const radarFeatures = document.querySelectorAll(".radar .feature-item .item");
const radarPopup = document.querySelector(".radar .weather-condition-pop-up");
const radarPopupHideButton = document.querySelector(".radar .hide-menubutton");
const radarPopupHideMenu = document.querySelector(".radar .hide-menu");
const radarShowPopup = document.querySelector(".radar .show-menu");
const radarNotification = document.querySelector(
  ".radar .weather-condition-pop-up .notification"
);
const radarCloseNotificationBtn = document.querySelector(
  ".radar .weather-condition-pop-up img"
);
const radarTime = document.querySelector(".radar-time");
const radarTimeLine = document.querySelector(".radar .weather-timeline");
const ticks = document.querySelector(".weather-timeline .ticks");
const radarInput = document.querySelector(".radar .range-wrapper input");
const radarPlay = document.querySelector(".radar .range .play");
const radarPause = document.querySelector(".radar .range .pause");
const radarLoader = document.querySelector(".radar .loader");
const radarLoading = document.querySelector(".radar .loading");
const weatherMap = document.querySelectorAll(".radar .weather-map");
const radarToogleBtnArea = document.querySelector(".radar .toogle-button");
const radarToogleBtn = document.querySelector(".radar .toogle-button .btn");
const radarFeatureList = document.querySelector(".radar .features");
const radarMapOptions = document.querySelector(".radar .map-options");
const radarCloseMapOptions = document.querySelector(
  ".radar .map-options .close-map-options"
);
const radarMapLayers = document.querySelector(".radar .map-options-layers");
const radarMapSpeciality = document.querySelector(
  ".radar .map-options-speciality"
);
const radarLayersAndStyles = document.querySelector(
  ".radar .map-options .layers-and-styles"
);
const radarSpecialityMaps = document.querySelector(
  ".radar .map-options .speciality-maps"
);

let popUp = true;
let play = false;
const now = Date.now();
const date = new Date(now);

const day = date.toDateString().split(" ")[0];
const hours = date.getHours();
const mins = date.getMinutes();

radarTime.textContent = `${day} ${hours.toString().padStart(2, "0")}:${mins
  .toString()
  .padStart(2, "0")}`;

let radarMin = 0;
let radarMax = 8;
if (hours > 8) {
  radarMin = 9;
  radarMax = 16;
} else if (hours > 16) {
  radarMin = 17;
  radarMax = 24;
}
for (let i = radarMin; i <= radarMax; i++) {
  ticks.insertAdjacentHTML(
    "beforeend",
    `<span>${i.toString().padStart(2, "0")}</span>`
  );
}
radarInput.min = radarMin;
radarInput.max = radarMax;
radarInput.value = hours;

let loadTimer = 0;
radarFeatures.forEach((feature, index) => {
  feature.addEventListener("click", () => {
    clearInterval(loadTimer);
    weatherMap.forEach((map) => {
      map.style.display = "none";
    });
    if (index < 3) weatherMap[index].style.display = "flex";
    else if (index === 3) {
      weatherMap[0].style.display = "flex";
      radarFeatureList.style.display = "none";
      radarNotification.style.display = "none";
      radarPopupHideMenu.style.display = "none";
      radarMapOptions.style.display = "block";
      radarTimeLine.style.height = "647px";
    } else weatherMap[0].style.display = "flex";
    radarLoader.style.display = "block";
    requestAnimationFrame(() => {
      radarLoading.style.width = `${Math.floor(Math.random() * 30 + 40)}%`;
    });
    loadTimer = setInterval(() => {
      radarLoader.style.display = "none";
      radarLoading.style.width = "0%";
    }, 300);
    radarFeatures.forEach((f) => {
      f.classList.remove("featureHighlighted");
    });
    feature.classList.add("featureHighlighted");
  });
});
radarCloseMapOptions.addEventListener("click", () => {
  radarFeatureList.style.display = "flex";
  radarMapOptions.style.display = "none";
  radarTimeLine.style.height = "261px";
  radarFeatures[3].classList.remove("featureHighlighted");
  radarFeatures[0].classList.add("featureHighlighted");
  radarPopupHideMenu.style.display = "flex";
  if (popUp) radarNotification.style.display = "block";
});

radarMapLayers.addEventListener("click", () => {
  radarLayersAndStyles.style.display = "block";
  radarMapLayers.style.borderBottom = "2px solid black";
  radarMapSpeciality.style.borderBottom = "none";
  radarSpecialityMaps.style.display = "none";
});
radarMapSpeciality.addEventListener("click", () => {
  radarLayersAndStyles.style.display = "none";
  radarMapLayers.style.borderBottom = "none";
  radarSpecialityMaps.style.display = "block";
  radarMapSpeciality.style.borderBottom = "2px solid black";
});
let timer = 0;
radarPlay.addEventListener("click", () => {
  radarPlay.style.display = "none";
  radarPause.style.display = "block";

  let count = radarInput.value;
  timer = setInterval(() => {
    radarTime.textContent = `${day} ${count}:${mins
      .toString()
      .padStart(2, "0")}`;
    radarInput.value = count++;
    if (count > radarMax) count = radarMin;
  }, 500);
});

radarPause.addEventListener("click", () => {
  radarPause.style.display = "none";
  radarPlay.style.display = "block";
  clearInterval(timer);
});

radarCloseNotificationBtn.addEventListener("click", () => {
  popUp = false;
  radarNotification.classList.add("hide");
});

radarPopupHideButton.addEventListener("click", () => {
  radarNotification.classList.add("hide");
  radarPopup.classList.add("hide");
});

radarShowPopup.addEventListener("click", () => {
  radarPopup.classList.remove("hide");
  if (popUp) radarNotification.classList.remove("hide");
});

let radarToggle = false;
radarToogleBtnArea.addEventListener("click", () => {
  radarToogleBtn.classList.toggle("toogled");
  if (!radarToggle) {
    radarToogleBtnArea.style.backgroundColor = "#000";

    radarPlay.style.display = "none";
    radarPause.style.display = "block";

    let count = radarInput.value;
    timer = setInterval(() => {
      radarTime.textContent = `${day} ${count}:${mins
        .toString()
        .padStart(2, "0")}`;
      radarInput.value = count++;
      if (count > radarMax) count = radarMin;
    }, 500);
  } else {
    radarPause.style.display = "none";
    radarPlay.style.display = "block";
    clearInterval(timer);

    radarToogleBtnArea.style.backgroundColor = "rgb(154, 154, 154)";
  }
  radarToggle = !radarToggle;
});
requestAnimationFrame(() => {
  radarLoading.style.width = "56%";
});
setTimeout(() => {
  radarLoading.style.width = "0%";
  radarLoader.style.display = "none";
}, 400);
weatherMap[0].style.display = "flex";
radarMapOptions.style.display = "none";
radarSpecialityMaps.style.display = "none";
const hourPlace = document.querySelector(".hourplace");
const ist = document.querySelector(".ist");
const hoursummary = document.querySelector(".hoursummary");
const hourdayPartDetails = document.querySelector(".hourdayPartDetails");

const API_KEY = "e687396580364dc882344618250512";
const LOCATION = "Rajpath Area";

const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    //location
    const loc = data.location;
    //header location,IST
    hourPlace.textContent = `${loc.name}, ${loc.region}, ${loc.country}`;
    ist.textContent = `${loc.localtime.split(" ")[1]}`;
    let minutes;
    let hr;

    let days = data.forecast.forecastday;
    for (let day of days) {
      //dataList
      const HourDate = document.createElement("div");
      const hours = day.hour;
      let formattedDate = new Date(day.date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      HourDate.classList.add("hourdate");
      hoursummary.appendChild(HourDate);

      let items = formattedDate.split(" ");
      formattedDate = `${items[0]} ${items[2]} ${items[1]}`;
      formattedDate = formattedDate.replace(",", "");
      //date
      HourDate.textContent = formattedDate;
      let listId;
      hours.forEach((hrs, index) => {
        let fullHrs = hrs.time;
        let dateObj = new Date(fullHrs);
        let apiHour = Number(fullHrs.split(" ")[1].split(":")[0]);
        let hourDate = fullHrs.split(" ")[0];
        let todayDate = loc.localtime.split(" ")[0];

        if (hourDate === todayDate) {
          let currentHr = Number(loc.localtime.split(" ")[1].split(":")[0]);
          let currentMin = Number(loc.localtime.split(" ")[1].split(":")[1]);
          //  console.log(currentHr,currentMin)
          if (currentMin <= 30) {
            currentMin = 30;
          } else {
            currentHr += 1;
            currentMin = 30;
            // console.log(hr, minutes)
          }
          if (currentHr === 24) currentHr = 0;
          if (apiHour < currentHr) return;
          hr = apiHour;
          minutes = 30;
        } else {
          hr = apiHour;
          minutes = 30;
        }
        const div = document.createElement("div");
        let weatherIcon = "https:" + hrs.condition.icon;
        div.id = `class-${new Date(day.date).getDate()}:${index}`;
        // console.log(fullHrs.split(' ')[1].split(':')[0])
        div.innerHTML = `
        <div class="hourtime">${String(hr).padStart(2, "0")}:${minutes}</div>
        <div class="hourtemp">${Math.round(hrs.temp_c)}°</div>
        <div class="hoursun">
        <img class ="hoursunny" src ='${weatherIcon}'>
          <span class="hourweather">${hrs.condition.text}</span>
        </div>
        <div class="hourperc">
          <svg name="rain-drop" class='hourrain-drop' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">                   
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
        </svg>
        <span class="hourpercValue">${hrs.chance_of_rain}%</span>
        </div>
        <div class="hourwind">
          <svg class ='hourarrow' name="arrow" style="transform:rotate(247.5deg)" class="hourDetailsSummary--windDirectionalIcon--3r9Hl Icon--icon--ySD-o Icon--darkTheme--RWEd0" aria-label="arrow" data-testid="WindDirectionIcon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
            <path d="m15.369 10.869-4.744 4.737V3h-1.25v12.606L4.631 10.87l-.881.881L10 18l6.25-6.25-.881-.881Z" fill="currentColor"></path>
          </svg>
          <span>${hrs.wind_dir} ${Math.round(hrs.wind_kph)}</span>
        </div>
          <svg width = '18' height = '18' class='houradd' name="add"  fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
          <title>Add</title>
          <path d="M10.625 9.875V5.5h-1.25v4.375H5v1.25h4.375V15.5h1.25v-4.375H15v-1.25h-4.375Z" fill="currentColor"></path>
        </svg>
        <svg width = '18' name="subtract" class='hoursubtract' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
          <title>Subtract</title>
          <path d="M15 9.875H5v1.25h10v-1.25Z" fill="currentColor"></path>
        </svg>
        </span>
     `;
        div.classList.add("hoursummaryContent");
        hoursummary.appendChild(div);
        // card
        const ul = document.createElement("ul");
        ul.id = `card-${new Date(day.date).getDate()}:${index}`;
        ul.innerHTML = `          
                    <li class="hourlist">
                      <svg class ='hourimg' name="feels-like" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Temperature feels like</title>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.611 5.704A2.5 2.5 0 0 0 15 6.125a2.507 2.507 0 0 0 2.5-2.5 2.5 2.5 0 1 0-3.889 2.079Zm.694-3.118a1.25 1.25 0 1 1 1.39 2.078 1.25 1.25 0 0 1-1.39-2.078ZM13.75 19.25h2.5A1.254 1.254 0 0 0 17.5 18v-4.375a1.254 1.254 0 0 0 1.25-1.25v-3.75a1.843 1.843 0 0 0-1.875-1.875h-3.75a1.842 1.842 0 0 0-1.875 1.875v3.75a1.253 1.253 0 0 0 1.25 1.25V18a1.253 1.253 0 0 0 1.25 1.25Zm-.87-11.213A.59.59 0 0 1 13.125 8h3.75a.59.59 0 0 1 .625.625v3.75h-1.25V18h-2.5v-5.625H12.5v-3.75a.59.59 0 0 1 .38-.588Zm-6.63 5.078V8H5v5.115a1.875 1.875 0 1 0 1.25 0ZM3.204 18.52a4.37 4.37 0 0 0 2.421.729 4.37 4.37 0 0 0 3.125-7.43V4.874a3.125 3.125 0 1 0-6.25 0v6.944a4.37 4.37 0 0 0 .704 6.702ZM4.3 3.55A1.87 1.87 0 0 1 5.625 3 1.877 1.877 0 0 1 7.5 4.875v7.49l.207.186a3.125 3.125 0 1 1-4.165 0l.208-.186v-7.49c0-.497.198-.974.55-1.325Z" fill="currentColor"></path>
                      </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">Feels Like</span>
                        <p class="hourtempValue">${Math.round(hrs.temp_c)}°</p>
                      </div>
                    </li>
                    <li class="hourlist">
                      <svg class ='hourimg'name="wind" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875h8.125A3.125 3.125 0 1 0 10 6.75h1.25a1.875 1.875 0 1 1 1.875 1.875H5v1.25Zm7.166 7.209a3.125 3.125 0 1 0 2.209-5.334H2.5V13h11.875a1.875 1.875 0 1 1-1.875 1.875h-1.25c0 .829.33 1.623.916 2.209Z" fill="currentColor"></path>
                      </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">Wind</span>
                        <p class="hourtempValue">${hrs.wind_dir} ${Math.round(hrs.wind_kph)}</p>
                      </div>
                    </li>
                    <li class="hourlists none">
                        <svg class ='hourimg' name="humidity" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                          <title>Humidity</title>
                          <path d="M14.673 9.246 10.53 2.648a.65.65 0 0 0-1.06 0l-4.16 6.63c-.578.932-.9 2-.934 3.097a5.625 5.625 0 1 0 11.25 0 6.29 6.29 0 0 0-.952-3.13ZM10 16.75a4.38 4.38 0 0 1-4.375-4.375 4.986 4.986 0 0 1 .761-2.465l.585-.93 6.296 6.296A4.359 4.359 0 0 1 10 16.75Z" fill="currentColor"></path>
                        </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">Humidity</span>
                        <p class="hourtempValue">${hrs.humidity}%</p>
                      </div>
                    </li>
                    <li class="hourlists">
                      <svg class ='hourimg' name="uv" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>UV index</title>
                        <path d="m10 4.195 1.09 1.833.49.822.92-.257 1.95-.544L13.908 8l-.257.92.822.49 1.833 1.09-1.833 1.09-.822.489.257.921.544 1.95-1.95-.543-.922-.257-.489.822L10 16.805l-1.09-1.833-.49-.822-.92.257-1.95.544L6.093 13l.257-.921-.822-.489-1.833-1.09 1.833-1.09.822-.49L6.093 8l-.544-1.95 1.951.543.921.257.49-.822L10 4.195Zm0-2.445L7.835 5.389 3.75 4.25l1.139 4.085L1.25 10.5l3.639 2.164L3.75 16.75l4.085-1.139L10 19.25l2.165-3.639 4.085 1.139-1.139-4.086L18.75 10.5l-3.639-2.165L16.25 4.25l-4.085 1.139L10 1.75Z" fill="currentColor"></path>
                      </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">UV Index</span>
                        <p class="hourtempValue">${hrs.uv}</p>
                      </div>
                    </li>
                    <li class="hourlists">
                      <svg class ='hourimg' name="cloud" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Cloud</title>
                        <g clip-path="url(#cloud-icon-clip-path)">
                          <path d="M10 4.875c.317 0 .633.031.944.094a5 5 0 0 1 3.969 3.962l.162.844.844.15a3.437 3.437 0 0 1-.625 6.825H4.688a3.438 3.438 0 0 1-.625-6.825l.837-.15.163-.844A5 5 0 0 1 10 4.875Zm0-1.25A6.25 6.25 0 0 0 3.856 8.7a4.688 4.688 0 0 0 .825 9.3h10.625a4.687 4.687 0 0 0 .825-9.3 6.25 6.25 0 0 0-6.13-5.075Z" fill="currentColor"></path>
                        </g>
                        <defs>
                          <clipPath id="cloud-icon-clip-path">
                            <path fill="currentColor" transform="translate(0 .5)" d="M0 0h20v20H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">Clound Cover</span>
                        <p class="hourtempValue">${hrs.cloud}%</p>
                      </div>
                    </li>
                    <li class="hourlists">
                      <svg class ='hourimg' name="precip-rain" class="hourDetailsTable--icon--t9ZNa Icon--icon--ySD-o Icon--actionTheme--Xn6vT" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Rain drop</title>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
                      </svg>
                      <div class="hourfield">
                        <span class="hourfeelsLike">Rain Amount</span>
                        <p class="hourtempValue">${hrs.chance_of_rain} mm</p>
                      </div>
                    </li>
       `;
        ul.classList.add(`hourdata`);
        ul.classList.add("hourdayPartDetails");
        const listItem = document.getElementById(
          `class-${new Date(day.date).getDate()}:${index}`
        );
        listItem.insertAdjacentElement("afterend", ul);
      });
    }
    document.querySelectorAll('[id^="class-"]').forEach((el) => {
      let add = el.querySelector(".houradd");
      let sub = el.querySelector(".hoursubtract");
      el.addEventListener("click", (e) => {
        document.querySelectorAll('[id^="class-"]').forEach((item) => {
          if (item !== el) {
            item.classList.remove("active");
          }
        });
        let dateId = e.currentTarget.id.split("-")[1];
        add.style.display = add.style.display === "none" ? "block" : "none";
        sub.style.display = sub.style.display === "block" ? "none" : "block";
        el.classList.toggle("active");
        const ul = document.getElementById(`card-${dateId}`);
        ul.style.display = ul.style.display === "flex" ? "none" : "flex";
      });
    });
    const firstItem = document.querySelector('[id^="card-"]');
    const firstList = document.querySelector('[id^="class-"]');
    if (firstItem) {
      firstItem.style.display = "flex";
      firstList.querySelector(".hoursubtract").style.display = "block";
      firstList.querySelector(".houradd").style.display = "none";
    }
  })
  .catch((err) => console.log(err));
const airbtn = document.querySelector(".air-button");
const ttip = document.querySelector(".tooltip");
const tttext = document.querySelector(".tooltiptext");
const headdrop = document.querySelector(".head-drop");
const tabs = document.querySelector(".tabs");
const blankp = document.querySelector(".path-blank");
headdrop.addEventListener("click", () => {
  tabs.classList.toggle("hide");
  americas.style.border = "none";
  americas.style.borderBottom = "1px solid rgb(218, 218, 218)";
  me.style.border = "none";
  me.style.borderBottom = "1px solid rgb(218, 218, 218)";
  afr.style.border = "none";
  afr.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ap.style.border = "none";
  ap.style.borderBottom = "1px solid rgb(218, 218, 218)";
  eur.style.border = "none";
  eur.style.borderBottom = "1px solid rgb(218, 218, 218)";
});
const countries1 = document.querySelector(".countries1");
const countries2 = document.querySelector(".countries2");
const countries3 = document.querySelector(".countries3");
const countries4 = document.querySelector(".countries4");
const countries5 = document.querySelector(".countries5");
const add1 = document.querySelector(".add1");
const minus1 = document.querySelector(".minus1");
const add2 = document.querySelector(".add2");
const minus2 = document.querySelector(".minus2");
const add3 = document.querySelector(".add3");
const minus3 = document.querySelector(".minus3");
const add4 = document.querySelector(".add4");
const minus4 = document.querySelector(".minus4");
const add5 = document.querySelector(".add5");
const minus5 = document.querySelector(".minus5");
let americas = document.querySelector(".americas");
let me = document.querySelector(".me");
let afr = document.querySelector(".afr");
let ap = document.querySelector(".ap");
let eur = document.querySelector(".eur");
americas.addEventListener("click", () => {
  americas.style.border = "1px solid #f3cb17ff";
  countries1.classList.toggle("hide");
  add1.classList.toggle("hide");
  minus1.classList.toggle("hide");
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border = "none";
  me.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border = "none";
  afr.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border = "none";
  ap.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border = "none";
  eur.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
me.addEventListener("click", () => {
  countries2.classList.toggle("hide");
  add2.classList.toggle("hide");
  minus2.classList.toggle("hide");
  me.style.border = "1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border = "none";
  americas.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border = "none";
  afr.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border = "none";
  ap.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border = "none";
  eur.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
afr.addEventListener("click", () => {
  countries3.classList.toggle("hide");
  add3.classList.toggle("hide");
  minus3.classList.toggle("hide");
  afr.style.border = "1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border = "none";
  americas.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border = "none";
  me.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border = "none";
  ap.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border = "none";
  eur.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
ap.addEventListener("click", () => {
  countries4.classList.toggle("hide");
  add4.classList.toggle("hide");
  minus4.classList.toggle("hide");
  ap.style.border = "1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border = "none";
  americas.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border = "none";
  me.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border = "none";
  afr.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border = "none";
  eur.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
eur.addEventListener("click", () => {
  countries5.classList.toggle("hide");
  add5.classList.toggle("hide");
  minus5.classList.toggle("hide");
  eur.style.border = "1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border = "none";
  americas.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border = "none";
  me.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border = "none";
  afr.style.borderBottom = "1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border = "none";
  ap.style.borderBottom = "1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
ttip.addEventListener("click", () => {
  airbtn.style.border = "2px solid blue";
  tttext.classList.toggle("ttvisible");
});
const closedbtn = document.querySelector(".closedbtn");
const main = document.querySelector(".main-body");
main.addEventListener(
  "click",
  (event) => {
    console.log(event.target);
    if (event.target !== airbtn) {
      airbtn.style.border = "none";
    }
  },
  true
);

const loc = document.querySelector(".location span");
const temp = document.querySelector(".thermo-value");
const w = document.querySelector(".wind-value");
const hum = document.querySelector(".humid-value");
const dew = document.querySelector(".dew-value");
const pres = document.querySelector(".pressure-value");
const uv = document.querySelector(".uv-value");
const vis = document.querySelector(".visible-value");
const moon = document.querySelector(".moon-value");
const t2 = document.querySelector(".t2");
const feel = document.querySelector(".temp span");
const wd = document.querySelector(".weather-descp");
const rise = document.querySelector(".rise span");
const set = document.querySelector(".set span");
const time = document.querySelector(".time span");

async function fetchData() {
  const response1 = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1"
  );
  const data1 = await response1.json();
  w.textContent = data1.wind.speed + "km/h";
  hum.textContent = data1.main.humidity + "%";
  pres.textContent = data1.main.pressure + "mb";
  vis.textContent = data1.visibility + "km";
  let m1 = Math.floor(data1.main.temp_max - 273) + "°";
  let m2 = Math.floor(data1.main.temp_min - 273) + "°";
  let tm1m2 = m1 + "/" + m2;
  temp.textContent = tm1m2;
  t2.textContent = Math.floor(data1.main.feels_like - 273) + "°";
  feel.textContent = Math.floor(data1.main.feels_like - 273) + "°";
  loc.textContent = data1.name;
  wd.textContent = `Weather Today in ${data1.name}`;
  const now = new Date();
  let today = now.toString().split(" ");
  time.textContent = `As of ${today[4]} IST`;
  const a = new Date(data1.sys.sunrise);
  let s1 = a.toString().split(" ");
  rise.textContent = s1[4].slice(0, s1.length - 4);
  const b = new Date(data1.sys.sunset);
  let s2 = b.toString().split(" ");
  set.textContent = s2[4].slice(0, s2.length - 4);
}
fetchData();

const mt = document.querySelector(".morning-temp");
const at = document.querySelector(".afternoon-temp");
const et = document.querySelector(".evening-temp");
const ot = document.querySelector(".overnight-temp");

const h0 = document.querySelector(".now-temp");
const h1 = document.querySelector(".hour1-temp");
const h2 = document.querySelector(".hour2-temp");
const h3 = document.querySelector(".hour3-temp");
const h4 = document.querySelector(".hour4-temp");

const tm1 = document.querySelector(".hour1-time");
const tm2 = document.querySelector(".hour2-time");
const tm3 = document.querySelector(".hour3-time");
const tm4 = document.querySelector(".hour4-time");
const tm = [tm1, tm2, tm3, tm4];

const tmp1 = document.querySelector(".today-temp");
const tmp2 = document.querySelector(".date1-temp");
const tmp3 = document.querySelector(".date2-temp");
const tmp4 = document.querySelector(".date3-temp");
const tmp5 = document.querySelector(".date4-temp");
const tmp = [tmp1, tmp2, tmp3, tmp4, tmp5];

const d1 = document.querySelector(".date1");
const d2 = document.querySelector(".date2");
const d3 = document.querySelector(".date3");
const d4 = document.querySelector(".date4");
const da = [d1, d2, d3, d4];

let maximum = 0;
let minimum = 0;

async function getData() {
  const response1 = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1"
  );
  const data1 = await response1.json();

  const response2 = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1"
  );
  const data2 = await response2.json();
  let k = 1;

  for (let i = 0; i <= 39; i++) {
    let num = data2.list[i].dt_txt;
    let str = num.toString().split(" ");
    let dstr = str[0];
    let d1 = dstr.split("-");
    let rdate = d1[2];
    let taken = str[1];
    let t = taken.split(":");
    let ht = parseInt(t[0]);
    let today = new Date();
    let ttime = today.getHours();
    let td = today.toString().split(" ");
    let todaydate = td[2];
    h0.textContent = Math.floor(data1.main.temp - 273) + "°";
    if (rdate === todaydate) {
      if (ht >= 6 && ht < 12) {
        let ta = Math.floor(data2.list[i].main.temp - 273) + "°";
        mt.textContent = ta;
      } else if (ht >= 12 && ht < 18) {
        let tb = Math.floor(data2.list[i].main.temp - 273) + "°";
        at.textContent = tb;
      } else if (ht >= 18 && ht < 24) {
        let tc = Math.floor(data2.list[i].main.temp - 273) + "°";
        et.textContent = tc;
      } else if (ht >= 0 && ht < 6) {
        let td = Math.floor(data2.list[i].main.temp - 273) + "°";
        ot.textContent = td;
      }
      // hourly forecast
      if (k <= 4) {
        let kt = Math.floor(data2.list[i].main.temp - 273) + "°";
        if (k === 1) {
          h2.textContent = kt;
        } else if (k === 2) {
          h2.textContent = kt;
        } else if (k === 3) {
          h3.textContent = kt;
        } else if (k === 4) {
          h4.textContent = kt;
        }
        k++;
      }
      if (Number(ttime) >= 12 && Number(ttime) < 15) {
        tm1.textContent = "15:00";
      } else if (Number(ttime) >= 15 && Number(ttime) < 18) {
        tm1.textContent = "18:00";
      } else if (Number(ttime) >= 18 && Number(ttime) < 21) {
        tm1.textContent = "21:00";
      } else if (Number(ttime) >= 21 && Number(ttime) < 24) {
        tm1.textContent = "00:00";
      } else if (Number(ttime) >= 0 && Number(ttime) < 3) {
        tm1.textContent = "03:00";
      } else if (Number(ttime) >= 3 && Number(ttime) < 6) {
        tm1.textContent = "06:00";
      } else if (Number(ttime) >= 6 && Number(ttime) < 9) {
        tm1.textContent = "09:00";
      } else if (Number(ttime) >= 9 && Number(ttime) < 12) {
        tm1.textContent = "12:00";
      }
      let hour = tm1.textContent;
      let splithour = hour.split(":");
      let firstsplit = splithour[0];
      let numhour = Number(firstsplit);
      let attach = ":00";

      for (let z = 1; z < 4; z++) {
        let numberh = (numhour + 3).toString();
        tm[z].textContent = numberh + attach;
        if (numhour <= 24) {
          numhour += 3;
        } else {
          numhour = 3;
        }
      }
    }
  }
  // daily forecast
  for (let j = 0; j <= 4; j++) {
    for (let i = 0; i <= 39; i++) {
      let num = data2.list[i].dt_txt;
      let str = num.toString().split(" ");
      let dstr = str[0];
      let d1 = dstr.split("-");
      let rdate = d1[2];
      let taken = str[1];
      let t = taken.split(":");
      let ht = parseInt(t[0]);
      let today = new Date();
      let ttime = today.getHours();
      let td = today.toString().split(" ");
      let todaydate = td[2];
      if (Number(rdate) === Number(todaydate) + j) {
        maximum += data2.list[i].main.temp_max - 273;
        let avgmax = Math.floor(maximum / 8) + "°";
        minimum += data2.list[i].main.temp_min - 273;
        let avgmin = Math.floor(minimum / 8) + "°";
        tmp[j].textContent = avgmax + "/" + avgmin;
        if (j != 4) {
          let one = new Date(today);
          one.setDate(today.getDate() + j + 1);
          let daily = one.toString().split(" ");
          let dailyarr = [];
          dailyarr.push(daily[0]);
          dailyarr.push(daily[2]);
          let dailystr = dailyarr.toString().replace(",", " ");
          da[j].textContent = dailystr;
        }
      }
    }
  }
}
getData();
