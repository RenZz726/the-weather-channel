// radar-section

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
