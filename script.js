const city = "kollam";
const token = "bd01206366680e2361b32e378d5408128ab4be90";
fetch(`https://api.waqi.info/feed/${city}/?token=${token}`)
  .then((response) => response.json())
  .then((data) => {
    const result = data.data;
    document.getElementById("city_name").textContent = `- ${result.city.name}`;
    document.getElementById("no2").textContent = result.iaqi.no2?.v ?? "--";
    document.getElementById("co").textContent = result.iaqi.co?.v ?? "--";
    document.getElementById("pm25").textContent = result.iaqi.pm25?.v ?? "--";
    document.getElementById("pm10").textContent = result.iaqi.pm10?.v ?? "--";
    document.getElementById("so2").textContent = result.iaqi.so2?.v ?? "--";
    document.getElementById("o3").textContent = result.iaqi.o3?.v ?? "--";
    document.getElementById("co_status").textContent = getstatus(
      "co",
      result.iaqi.co?.v ?? "--"
    );
    document.getElementById("no_status").textContent = getstatus(
      "no2",
      result.iaqi.no2?.v ?? "--"
    );
    document.getElementById("so_status").textContent = getstatus(
      "so2",
      result.iaqi.so2?.v ?? "--"
    );
    document.getElementById("pm25_status").textContent = getstatus(
      "pm25",
      result.iaqi.pm25?.v ?? "--"
    );
    document.getElementById("o3_status").textContent = getstatus(
      "o3",
      result.iaqi.o3?.v ?? "--"
    );
    document.getElementById("pm10_status").textContent = getstatus(
      "pm10",
      result.iaqi.pm10?.v ?? "--"
    );
    document.getElementById("pm25_mg").textContent =
      pm25Convert(result.iaqi.pm25?.v ?? "--") + " µg/m3";
    document.getElementById("pm10_mg").textContent =
      pm10Convert(result.iaqi.pm10?.v ?? "--") + " µg/m3";
    document.getElementById("no2_mg").textContent =
      no2Convert(result.iaqi.no2?.v ?? "--") + " µg/m3";
    document.getElementById("so2_mg").textContent =
      so2Convert(result.iaqi.so2?.v ?? "--") + " µg/m3";
    document.getElementById("o3_mg").textContent =
      o3Convert(result.iaqi.o3?.v ?? "--") + " µg/m3";
    document.getElementById("co_mg").textContent =
      coConvert(result.iaqi.co?.v ?? "--") + " mg/m³";
    strockFill(
      "pm25_don",
      result.iaqi.pm25?.v ?? 0,
      getstatus("pm25", result.iaqi.pm25?.v)
    );
    strockFill(
      "pm10_don",
      result.iaqi.pm10?.v ?? 0,
      getstatus("pm10", result.iaqi.pm10?.v)
    );
    strockFill(
      "co_don",
      result.iaqi.co?.v ?? 0,
      getstatus("co", result.iaqi.co?.v)
    );
    strockFill(
      "o3_don",
      result.iaqi.o3?.v ?? 0,
      getstatus("o3", result.iaqi.o3?.v)
    );
    strockFill(
      "so2_don",
      result.iaqi.so2?.v ?? 0,
      getstatus("so2", result.iaqi.so2?.v)
    );
    strockFill(
      "no_don",
      result.iaqi.no2?.v ?? 0,
      getstatus("no2", result.iaqi.no2?.v)
    );
    const primaryKey = toPrimaryPollutant(result.iaqi);
    const primaryValue = primaryName(primaryKey);
    document.getElementById("Primary_name").textContent = primaryValue;
    document.getElementById("primary_desc").textContent = primaryKey;
    const maxaqi = result.iaqi[primaryKey]?.v || 0;
    const maxStatus = getstatus(primaryKey, maxaqi);
    document.getElementById("aqi").textContent = maxaqi;
    document.getElementById("aqi_air").textContent = getstatus(
      primaryKey,
      maxaqi
    );
    document.getElementById("air_para").textContent = getstatus("para", maxaqi);
    strockFill("aqi_don", maxaqi, maxStatus);
  });
function getstatus(type, value) {
  if (value === "--" || value === 0) return "--";
  switch (type) {
    case "pm25":
      if (value <= 30) return "Good";
      if (value <= 60) return "Satisfactory";
      if (value <= 90) return "Moderate";
      if (value <= 120) return "Poor";
      return "Very poor";
    case "pm10":
      if (value <= 50) return "Good";
      if (value <= 100) return "Satisfactory";
      if (value <= 250) return "Moderate";
      if (value <= 350) return "Poor";
      return "Very poor";
    case "co":
      if (value <= 1.0) return "Good";
      if (value <= 2.0) return "Satisfactory";
      if (value <= 10) return "Moderate";
      if (value <= 17) return "Poor";
      return "Very poor";
    case "o3":
      if (value <= 50) return "Good";
      if (value <= 100) return "Satisfactory";
      if (value <= 168) return "Moderate";
      if (value <= 208) return "Poor";
      return "Very poor";
    case "so2":
      if (value <= 40) return "Good";
      if (value <= 80) return "Satisfactory";
      if (value <= 380) return "Moderate";
      if (value <= 800) return "Poor";
      return "Very poor";
    case "no2":
      if (value <= 40) return "Good";
      if (value <= 80) return "Satisfactory";
      if (value <= 180) return "Moderate";
      if (value <= 280) return "Poor";
      return "Very poor";
    case "aqi":
      if (value <= 50) return "Good";
      if (value <= 100) return "Satisfactory";
      if (value <= 200) return "Moderate";
      if (value <= 300) return "Poor";
      if (value <= 400) return "Very Poor";
      if (value <= 500) return "Severe";
    case "para":
      if (value <= 50)
        return "Air quality is considered satisfactory,and air pollution poses little or no risk.People can enjoy outsoor activities without any heath concerns.";
      if (value <= 100)
        return "May cause minor breathing discomfort to sensitive people.Most individuals can carry on with their daily outdoor activities without issues";
      if (value <= 200)
        return "May cause breathing discomfort to people with lung disease such as asthma,and discomfort to people with heart disease,children,and older adults";
      if (value <= 300)
        return "May cause respiratory illness for people with prolonged exposure.People with heart or lung diseases,the elderly,and children should avoid prolonged outdoor exposure.";
      if (value <= 400)
        return "May cause respiratory illness for people with prolonged exposure.Effect may be more pronounces in people with lung or heart diseases.";
      if (value <= 500)
        return "May cause serious respiratory effect even on healthy people.Everyone should avaoid all physical outdoor activites.Perople with existing health conditions should remain indoors.";
    default:
      return "--";
  }
}
function pm25Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 12],
    [51, 100, 12.1, 35.4],
    [101, 150, 35.5, 55.4],
    [151, 200, 55.5, 150.4],
    [201, 300, 150.5, 250.4],
    [301, 400, 250.5, 350.4],
    [401, 500, 350.5, 500.4],
  ];
  return convert(aqi, r);
}
function pm10Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 54],
    [51, 100, 55, 154],
    [101, 150, 155, 254],
    [151, 200, 255, 354],
    [201, 300, 355, 424],
    [301, 400, 425, 504],
    [401, 500, 505, 604],
  ];
  return convert(aqi, r);
}
function no2Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 40],
    [51, 100, 41, 80],
    [101, 150, 81, 180],
    [151, 200, 181, 280],
    [201, 300, 281, 400],
    [301, 400, 401, 600],
    [401, 500, 601, 1000],
  ];
  return convert(aqi, r);
}
function so2Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 40],
    [51, 100, 41, 80],
    [101, 150, 81, 380],
    [151, 200, 381, 800],
    [201, 300, 801, 1600],
  ];
  return convert(aqi, r);
}
function o3Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 50],
    [51, 100, 51, 100],
    [101, 150, 101, 168],
    [151, 200, 169, 208],
    [201, 300, 209, 748],
  ];
  return convert(aqi, r);
}
function coConvert(aqi) {
  if (aqi === "--") return "--";
  const r = [
    [0, 50, 0, 1.0],
    [51, 100, 1.1, 2.0],
    [101, 150, 2.1, 10],
    [151, 200, 10.1, 17],
    [201, 300, 17.1, 34],
  ];
  return convert(aqi, r);
}
function convert(aqi, range) {
  for (let [al, ah, cl, ch] of range) {
    if (aqi >= al && aqi <= ah) {
      const val = ((aqi - al) / (ah - al)) * (ch - cl) + cl;
      return val.toFixed(2);
    }
  }
  return "--";
}
function strockFill(cirId, aqi, status, max = 500) {
  const circle = document.getElementById(cirId);
  if (!circle || aqi === "--") return;
  const total = 305;
  const percent = Math.min(aqi / max, 1);
  const offset = total * (1 - percent);
  circle.style.strokeDashoffset = offset;
  if (status === "Good") circle.style.stroke = "#01C966";
  else if (status === "Satisfactory") circle.style.stroke = "#6AE261";
  else if (status === "Moderate") circle.style.stroke = "#FBFF26";
  else if (status === "Poor") circle.style.stroke = "#FF0000";
  else circle.style.stroke = "#F70004";
}
// primary pollutant
function toPrimaryPollutant(iaqi) {
  const pollutant = ["pm25", "pm10", "no2", "so2", "co", "o3"];
  let primary = "";
  let maxVal = -1;
  for (let key of pollutant) {
    const val = iaqi[key]?.v;
    if (val !== undefined && val > maxVal) {
      maxVal = val;
      primary = key;
    }
  }
  return primary;
}
function primaryName(name) {
  const names = {
    pm25: "PM2.5 (Fine Particulate Matter)",
    pm10: "PM10 (Coarse Particulate Matter)",
    no2: "NO₂ (Nitrogen Dioxide)",
    so2: "SO₂ (Sulphur Dioxide)",
    co: "CO (Carbon Monoxide)",
    o3: "O₃ (Ozone)",
  };
  return names[name] || "Unknown";
}
let infoBtn = document.querySelectorAll(".air_info_pop");
let popupContainer = document.querySelectorAll(".air_popup");
let air_info = document.querySelectorAll(".air_info_pop");
let closeBtn = document.querySelectorAll(".air_close_btn");
let allergyPopup = document.querySelector('.allergy_popup')
let allergyBtn = document.querySelector('.allergybtnDis')
let allergyCloseBtn = document.querySelector('.allergy_close_btn')
infoBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    popupContainer[index].style.display = "block";
    infoBtn[index].style.border = "2px solid #1B4DE4";
  });
});
allergyBtn.addEventListener('click',()=>{
      allergyPopup.style.display = 'block'
      allergyBtn.style.border = "2px solid #1B4DE4";
})
allergyCloseBtn.addEventListener('click',()=>{
  allergyPopup.style.display = 'none'
  allergyBtn.style.border = "none";

})
closeBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    popupContainer[index].style.display = "none";
    infoBtn[index].style.border = "none";
  });
});
window.addEventListener("scroll", () => {
  popupContainer.forEach((cont, index) => {
    cont.style.display = "none";
    infoBtn[index].style.border = "none";
  });
});

// primary poluttant
const mainBody = document.querySelector(".main-without-footer");
const adBlock = document.querySelector(".adv1");
const footerSection = document.querySelectorAll(".footer");

const todayButton = document.querySelector(".today-with-content");
const hourlySection = document.querySelector(".hourhourly");
const hourlyButton = document.querySelector(".hourly-with-content");

const tenDayButton = document.querySelector(".day-with-content");
const tenDaySection = document.querySelector(".ten-day");

const monthlySection = document.querySelector(".monthly");
const monthlyButton = document.querySelector(".monthly-with-content");

const radarButton = document.querySelector(".radar-with-content");
const radarSection = document.querySelector(".radar");

const allergySection = document.querySelector(".allergy-tracker");
const allergyButton = document.querySelector(".allergy-with-contents");

const airQualitySection = document.querySelector("section.air-quality-index");
const airQualityBtn = document.querySelector(".air-quality-with-contents");

const toRadar = document.querySelectorAll(".to-radar");

hourlySection.classList.add("hide");
tenDaySection.classList.add("hide");
monthlySection.classList.add("hide");
radarSection.classList.add("hide");
allergySection.classList.add("hide");
airQualitySection.classList.add("hide");
let bgclr="rgba(243, 239, 239, 1)"

todayButton.addEventListener("click", () => {
  todayButton.style.backgroundColor=bgclr;
  console.log(todayButton)
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.remove("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.remove("hide");
});

hourlyButton.addEventListener("click", () => {
  hourlyButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  monthlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  radarSection.classList.add("hide");
  hourlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

tenDayButton.addEventListener("click", () => {
  tenDayButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  tenDaySection.classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

monthlyButton.addEventListener("click", () => {
  monthlyButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  radarSection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});
function toRadarSection() {
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  footerSection[1].classList.add("hide");
  radarSection.classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
}

radarButton.addEventListener("click", () => {
  radarButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  toRadarSection();
});

toRadar[0].addEventListener("click", () => {
  toRadarSection();
});

toRadar[1].addEventListener("click", () => {
  toRadarSection();
});

toRadar[2].addEventListener("click", () => {
  toRadarSection();
});

allergyButton.addEventListener("click", () => {
  allergyButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  airQualitySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  airQualitySection.classList.add("hide");
  allergySection.classList.remove("hide");
  signinsection.classList.add("hide");
  
});

airQualityBtn.addEventListener("click", () => {
  airQualityBtn.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  allergySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  airQualitySection.classList.remove("hide");
  signinsection.classList.add("hide");
});

// side-pop-section
const ti = document.querySelector(".ticon");
const hi = document.querySelector(".hicon");
const di = document.querySelector(".dicon");
const mi = document.querySelector(".micon");
const ri = document.querySelector(".ricon");
const ai = document.querySelector(".all");
const aqi = document.querySelector(".aq");

ti.addEventListener("click", () => {
  ti.style.backgroundColor=bgclr;
  hi.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  mainBody.classList.remove("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
});

hi.addEventListener("click", () => {
  hi.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  hourlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
});

di.addEventListener("click", () => {
  di.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  hi.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  tenDaySection.classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

mi.addEventListener("click", () => {
  mi.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  hi.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  radarSection.classList.add("hide");
  monthlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
});

ri.addEventListener("click", () => {
  ri.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  hi.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  footerSection[1].classList.add("hide");
  radarSection.classList.remove("hide");
});

ai.addEventListener("click", () => {
  ai.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  hi.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  aqi.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  airQualitySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  airQualitySection.classList.add("hide");
  allergySection.classList.remove("hide");
});

aqi.addEventListener("click", () => {
  aqi.style.backgroundColor=bgclr;
  ti.style.backgroundColor="transparent";
  hi.style.backgroundColor="transparent";
  di.style.backgroundColor="transparent";
  mi.style.backgroundColor="transparent";
  ri.style.backgroundColor="transparent";
  ai.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  allergySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  airQualitySection.classList.remove("hide");
});

const n48h1=document.querySelector(".next-48-hours1");
const n48h2=document.querySelector(".next-48-hours2");
const tdays=document.querySelector(".next-10-days");
const detailbtn=document.querySelector(".details");

n48h1.addEventListener("click", () => {
  hourlyButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  monthlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  radarSection.classList.add("hide");
  hourlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

n48h2.addEventListener("click", () => {
  hourlyButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  monthlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  radarSection.classList.add("hide");
  hourlySection.classList.remove("hide");
  footerSection[1].classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

tdays.addEventListener("click", () => {
  tenDayButton.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  airQualityBtn.style.backgroundColor="transparent";
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  tenDaySection.classList.remove("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.add("hide");
  adBlock.classList.add("hide");
});

detailbtn.addEventListener("click",()=>{
  airQualityBtn.style.backgroundColor=bgclr;
  todayButton.style.backgroundColor="transparent";
  hourlyButton.style.backgroundColor="transparent";
  tenDayButton.style.backgroundColor="transparent";
  monthlyButton.style.backgroundColor="transparent";
  radarButton.style.backgroundColor="transparent";
  allergyButton.style.backgroundColor="transparent";
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  radarSection.classList.add("hide");
  allergySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  airQualitySection.classList.remove("hide");
  signinsection.classList.add("hide");
})

//hourly-10day

const hourlyTenDay = document.querySelector('.hourTenDayBtn')

hourlyTenDay.addEventListener('click',()=>{
   tenDayButton.style.backgroundColor=bgclr;
   hourlyButton.style.backgroundColor='transparent'
   hourlySection.classList.add('hide')
   tenDaySection.classList.remove('hide')
})



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
    zoomed = map.fitBounds(circle.getBounds());
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
                        <p class="hourtempValue">${hrs.wind_dir} ${Math.round(
          hrs.wind_kph
        )}</p>
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
headdrop.addEventListener("click", (e) => {
  e.stopPropagation();
  headdrop.style.border="2px solid blue";
  tabs.classList.toggle("hide");
  spop.classList.add("hide");
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

window.addEventListener("click",(event)=>{
  if(!headdrop.contains(event.target) && !tabs.contains(event.target)){
    headdrop.style.border="none";
    tabs.classList.add("hide");
  }
})


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

const menubtn = document.querySelector(".menu");
const cbtn = document.querySelector(".clsbtn");
const spop = document.querySelector(".side-pop");
const sso = document.querySelector(".side-side-opaque");
menubtn.addEventListener("click", () => {
  menubtn.style.backgroundColor=bgclr;
  spop.classList.remove("hide");
  tabs.classList.add("hide");
  sso.classList.remove("hide");
});
cbtn.addEventListener("click", () => {
  cbtn.style.backgroundColor=bgclr;
  spop.classList.add("hide");
  sso.classList.add("hide");
});
// 10DayPageScript
function weatherDetails(id, obj, data) {
  const days = data.forecast.forecastday;
  const d = days[id];
  const sunset = d.astro.sunset.split(" ")[0];
  const moonrise = d.astro.moonset.split(" ")[0];

  const cardsContent = document.createElement("div");
  cardsContent.id = `${id}-card`;
  cardsContent.style.display = "none";

  let date = new Date(d.date);

  cardsContent.innerHTML = ` 
        <div class="todayTen" id="${id}-cls">
            <h2 class="cards-date">${
              id === 0
                ? data.current.is_day === 1
                  ? "Today"
                  : "Tonight"
                : date.toLocaleString("en-US", { weekday: "short" }) +
                  " " +
                  date.getDate()
            }</h2>
            <svg width="24" name="subtract" class="subtract-img" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                <path d="M15 9.875H5v1.25h10v-1.25Z" fill="currentColor"></path>
            </svg>
        </div>
        <div class="day-night-parts">
        <div class="day-section1 day-${id}">
            <h2 class="part-title">Day</h2>
            <div class="brief">
                <div class="temp-bar">
                    <span class="temp">${obj.dayTemp}°</span>
                </div>

                <div class="sun">
                    <img src= 'https:${
                      id === 0 ? data.current.condition.icon : obj.dayIcon
                    }' class="sun-img"/>
                </div>

                <div class="humidity-wind">
                    <div class="humidity">
                        <svg name="precip-rain" class="rain-drop-img" aria-label="Chance of Rain" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
                        </svg>
                        <span class="rain">${d.day.daily_chance_of_rain}%</span>
                    </div>

                    <div class="wind">
                        <svg width="42" name="wind" class="wind-img" aria-label="Wind" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875h8.125A3.125 3.125 0 1 0 10 6.75h1.25a1.875 1.875 0 1 1 1.875 1.875H5v1.25Zm7.166 7.209a3.125 3.125 0 1 0 2.209-5.334H2.5V13h11.875a1.875 1.875 0 1 1-1.875 1.875h-1.25c0 .829.33 1.623.916 2.209Z" fill="currentColor"></path>
                        </svg>
                        <span class="windSpeed">
                            <span>${data.current.wind_dir} </span>
                            <span>${Math.round(d.day.maxwind_kph)} </span>
                            <span>km/h</span>
                        </span>
                    </div>

                </div>

            </div>
            <p class="explanation">${
              id === 0 ? data.current.condition.text : obj.dayText
            }. ${
    obj.dayTemp >= 20
      ? "High " + obj.dayTemp + "°C"
      : "Low " + obj.dayTemp + "°C"
  }. Winds ${data.current.wind_dir} at ${d.day.maxwind_kph} km/h.</p>
        </div>
        <div class="day-section2 measurements day-${id}">
            <ul class="weatherDay">
                <li>
                    <svg width="24" name="humidity" class="drop icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path d="M14.673 9.246 10.53 2.648a.65.65 0 0 0-1.06 0l-4.16 6.63c-.578.932-.9 2-.934 3.097a5.625 5.625 0 1 0 11.25 0 6.29 6.29 0 0 0-.952-3.13ZM10 16.75a4.38 4.38 0 0 1-4.375-4.375 4.986 4.986 0 0 1 .761-2.465l.585-.93 6.296 6.296A4.359 4.359 0 0 1 10 16.75Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Humidity</span>
                        <span class="r2">${d.day.avghumidity}%</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="uv" class="uv icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path d="m10 4.195 1.09 1.833.49.822.92-.257 1.95-.544L13.908 8l-.257.92.822.49 1.833 1.09-1.833 1.09-.822.489.257.921.544 1.95-1.95-.543-.922-.257-.489.822L10 16.805l-1.09-1.833-.49-.822-.92.257-1.95.544L6.093 13l.257-.921-.822-.489-1.833-1.09 1.833-1.09.822-.49L6.093 8l-.544-1.95 1.951.543.921.257.49-.822L10 4.195Zm0-2.445L7.835 5.389 3.75 4.25l1.139 4.085L1.25 10.5l3.639 2.164L3.75 16.75l4.085-1.139L10 19.25l2.165-3.639 4.085 1.139-1.139-4.086L18.75 10.5l-3.639-2.165L16.25 4.25l-4.085 1.139L10 1.75Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">UV Index</span>
                        <span class="r2">${d.day.uv} of 11</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="sunrise" class="rise icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 6.125 10 3l3.125 3.125-.881.881-1.619-1.612v4.481h-1.25V5.394L7.756 7.006l-.881-.881Zm8.87 2.746-2.191 2.191.884.884 2.19-2.191-.883-.884ZM10 13a2.503 2.503 0 0 1 2.5 2.5h1.25a3.75 3.75 0 0 0-7.5 0H7.5A2.503 2.503 0 0 1 10 13Zm8.75 4.375H1.25v1.25h17.5v-1.25Zm-3.125-3.125h3.125v1.25h-3.125v-1.25ZM4.255 8.871l-.884.884 2.191 2.191.884-.884-2.191-2.19ZM1.25 14.25h3.125v1.25H1.25v-1.25Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Sunrise</span>
                        <span class="r2">${d.astro.sunrise.split(" ")[0]}</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="sunset" class="set icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="m10.625 8.11 1.619-1.613.881.88L10 10.504 6.875 7.378l.881-.881 1.619 1.612V3.003h1.25v5.106Zm5.12.764-2.191 2.191.884.884 2.19-2.191-.883-.884ZM10 13.003a2.503 2.503 0 0 1 2.5 2.5h1.25a3.75 3.75 0 0 0-7.5 0H7.5a2.503 2.503 0 0 1 2.5-2.5Zm8.75 4.375H1.25v1.25h17.5v-1.25Zm-3.125-3.125h3.125v1.25h-3.125v-1.25ZM4.255 8.874l-.884.884 2.191 2.19.884-.883-2.191-2.191ZM1.25 14.253h3.125v1.25H1.25v-1.25Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Sunset</span>
                        <span class="r2">${
                          d.astro.sunset.split(" ")[1] === "PM"
                            ? Number(sunset.split(":")[0]) +
                              12 +
                              ":" +
                              sunset.split(":")[1]
                            : d.astro.sunset.split(" ")[0]
                        }</span>
                    </div>
                </li>
            </ul>
        </div>
            
        <div class="night-section1">
            <h2 class="part-title">Night</h2>
            <div class="brief">
                <div class="temp-bar">
                    <span class="temp">${obj.nightTemp}<span>°</span></span>
                </div>

                <div class="moon">
                    <img src = 'https:${obj.nightIcon}' class='moon-img'/>
                </div>

                <div class="humidity-wind">
                    <div class="humidity">
                        <svg name="precip-rain" class="rain-drop-img" aria-label="Chance of Rain" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
                        </svg>
                        <span class="rain">${obj.nightRain}%</span>
                    </div>

                    <div class="wind">
                        <svg width="42" name="wind" class="wind-img" aria-label="Wind" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.875h8.125A3.125 3.125 0 1 0 10 6.75h1.25a1.875 1.875 0 1 1 1.875 1.875H5v1.25Zm7.166 7.209a3.125 3.125 0 1 0 2.209-5.334H2.5V13h11.875a1.875 1.875 0 1 1-1.875 1.875h-1.25c0 .829.33 1.623.916 2.209Z" fill="currentColor"></path>
                        </svg>
                        <span class="windSpeed">
                            <span>${obj.nightDir}</span>
                            <span>${obj.nightWind} </span>
                            <span>km/h</span>
                        </span>
                    </div>

                    
                </div>
                
            </div>
            <p class="explanation">${obj.nightText}. ${
    obj.nightTemp >= 20
      ? "High " + obj.nightTemp + "°C"
      : "Low " + obj.nightTemp + "°C"
  }. Winds ${obj.nightDir} at ${obj.nightWind} km/h.</p>
        </div>
        <div class="night-section2 measurements">
            <ul class="weatherDay">
                <li>
                    <svg width="24" name="humidity" class="drop icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path d="M14.673 9.246 10.53 2.648a.65.65 0 0 0-1.06 0l-4.16 6.63c-.578.932-.9 2-.934 3.097a5.625 5.625 0 1 0 11.25 0 6.29 6.29 0 0 0-.952-3.13ZM10 16.75a4.38 4.38 0 0 1-4.375-4.375 4.986 4.986 0 0 1 .761-2.465l.585-.93 6.296 6.296A4.359 4.359 0 0 1 10 16.75Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Humidity</span>
                        <span class="r2">${obj.nightHumidity}%</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="uv" class="uv icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>UV index</title>
                        <path d="m10 4.195 1.09 1.833.49.822.92-.257 1.95-.544L13.908 8l-.257.92.822.49 1.833 1.09-1.833 1.09-.822.489.257.921.544 1.95-1.95-.543-.922-.257-.489.822L10 16.805l-1.09-1.833-.49-.822-.92.257-1.95.544L6.093 13l.257-.921-.822-.489-1.833-1.09 1.833-1.09.822-.49L6.093 8l-.544-1.95 1.951.543.921.257.49-.822L10 4.195Zm0-2.445L7.835 5.389 3.75 4.25l1.139 4.085L1.25 10.5l3.639 2.164L3.75 16.75l4.085-1.139L10 19.25l2.165-3.639 4.085 1.139-1.139-4.086L18.75 10.5l-3.639-2.165L16.25 4.25l-4.085 1.139L10 1.75Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">UV Index</span>
                        <span class="r2">${obj.nightUv} of 11</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="moonrise" class="rise icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Moonrise</title>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 4.875 10 1.75l3.125 3.125-.881.881-1.619-1.612V9.25h-1.25V4.144L7.756 5.756l-.881-.881Zm3.873 9.24A4.973 4.973 0 0 0 10 16.75H8.75a6.204 6.204 0 0 1 2.346-4.877A5.006 5.006 0 0 0 5 16.75H3.75A6.257 6.257 0 0 1 10 10.5c.965 0 1.916.224 2.779.657a.625.625 0 0 1 0 1.119 4.974 4.974 0 0 0-2.03 1.839ZM15 16.75h1.25a6.24 6.24 0 0 0-1.592-4.167l-.931.834A4.992 4.992 0 0 1 15 16.75ZM18.75 18v1.25H1.25V18h17.5Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Moonrise</span>
                        <span class="r2">${
                          d.astro.moonrise.split(" ")[0]
                        }</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="moonset" class="set icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Moonset</title>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 6.125 10 9.25l3.125-3.125-.881-.881-1.619 1.612V1.75h-1.25v5.106L7.756 5.244l-.881.881Zm3.873 7.99A4.973 4.973 0 0 0 10 16.75H8.75a6.204 6.204 0 0 1 2.346-4.877A5.006 5.006 0 0 0 5 16.75H3.75A6.257 6.257 0 0 1 10 10.5c.965 0 1.916.224 2.779.657a.625.625 0 0 1 0 1.119 4.974 4.974 0 0 0-2.03 1.839ZM15 16.75h1.25a6.24 6.24 0 0 0-1.592-4.167l-.931.834A4.992 4.992 0 0 1 15 16.75ZM18.75 18v1.25H1.25V18h17.5Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Moonset</span>
                        <span class="r2">${
                          d.astro.moonset.split(" ")[1] === "PM"
                            ? Number(moonrise.split(":")[0]) +
                              12 +
                              ":" +
                              moonrise.split(":")[1]
                            : d.astro.moonrise.split(" ")[0]
                        }</span>
                    </div>
                </li>

                <li>
                    <span><svg height="22" width="19.2" name="phase-11" class="waxing icons" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><title>Moon Phase - Day 11</title><path d="M515.73 57.54q-132.662 0-226.697 135.326t-94.036 325.528 94.036 325.528T515.73 979.248q190.202 0 325.794-135.326t135.592-325.528-135.592-325.528T515.73 57.54zm1.065 956.87q-205.12 0-350.835-145.715T20.245 518.393 165.96 167.825 516.795 21.844q204.587 0 350.302 145.981t145.715 350.568-145.715 350.302-350.302 145.715z"></path></svg></span>
                    <span class="r1">${d.astro.moon_phase}</span>
                </li>

            </ul>
        </div>  
        </div>
    `;
  if (id === 0) {
    cardsContent.style.display = "block";
    document.querySelector("#cls-0").style.display = "none";

    if (data.current.is_day === 0) {
      const dayEl = cardsContent.querySelectorAll(".day-0");
      dayEl.forEach((day) => {
        if (day) day.style.display = "none";
      });
      cardsContent.querySelector(".day-night-parts").style.display = "block";
    }
  }
  cardsContent.classList.add("cards-content");
  const targetItem = document.getElementById(`cls-${id}`);
  targetItem.insertAdjacentElement("afterend", cardsContent);
}

const EachDayBar = document.querySelector(".eachDayBar");
const placeEl = document.querySelector(".place-js");

async function fetchUrl() {
  try {
    const key = "f79a86fd3d6142df94534541250512";
    const location = "Kozhikode";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=14`;
    const res = await fetch(url);
    const data = await res.json();

    const days = data.forecast.forecastday;

    placeEl.textContent = `${data.location.name}, ${data.location.region}`;
    document.querySelector(".location-js").textContent = data.location.name;
    document.querySelector(".time-js").textContent = `${
      data.current.last_updated.split(" ")[1]
    } IST`;

    days.forEach((d, index) => {
      let date = new Date(d.date);
      const hours = d.hour;

      const dayIcon = hours[15].condition.icon;
      const dayText = hours[15].condition.text;

      const nightIcon = hours[21].condition.icon;
      const nightText = hours[21].condition.text;

      let nightTempArr = [],
        nightHumidArr = [],
        nightRain = [],
        nightWind = [],
        nightUv = [],
        freq = {},
        nightDir;
      hours.forEach((h) => {
        if (!h.is_day) {
          nightTempArr.push(h.temp_c);
          nightHumidArr.push(h.humidity);
          nightRain.push(h.chance_of_rain);
          nightWind.push(h.wind_kph);
          nightUv.push(h.uv);

          if (!freq[h.wind_dir]) freq[h.wind_dir] = 1;
          else freq[h.wind_dir]++;
        }
      });
      Object.keys(freq).reduce(
        (a, b) => (freq[a] > freq[b] ? (nightDir = a) : (nightDir = b)),
        ""
      );
      const avg = (arr) =>
        Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

      const obj = {
        dayTemp: Math.round(d.day.avgtemp_c),
        nightTemp: avg(nightTempArr),
        nightHumidity: avg(nightHumidArr),
        nightRain: avg(nightRain),
        nightWind: avg(nightWind),
        nightUv: avg(nightUv),
        nightDir: nightDir,
        dayIcon: dayIcon,
        dayText: dayText,
        nightIcon: nightIcon,
        nightText: nightText,
      };

      const li = document.createElement("li");

      li.classList.add("eachDay");
      li.id = `cls-${index}`;
      li.dataset.id = index;

      li.innerHTML = `
            
                <div class="eachDay">
                    <h2 class="date">${
                      li.id === "cls-0"
                        ? data.current.is_day === 1
                          ? "Today"
                          : "Tonight"
                        : date.toLocaleString("en-US", { weekday: "short" }) +
                          " " +
                          date.getDate()
                    }</h2>
                    <div class="eachDay-img">   
                        <img src ='https:${
                          li.id === "cls-0"
                            ? data.current.condition.icon
                            : dayIcon
                        }' class="sun-img each-sun"/>
                        <span class="eachDay-txt">${
                          li.id === "cls-0"
                            ? data.current.condition.text
                            : dayText
                        }</span>
                    </div>

                    <div class="degrees">
                        <span class="day-deg">${
                          li.id === "cls-0"
                            ? data.current.is_day
                              ? obj.dayTemp + "°"
                              : "--"
                            : obj.dayTemp + "°"
                        }</span>
                        <span>/<span class="night-deg">${
                          obj.nightTemp
                        }<span>°</span></span></span>
                    </div>

                    <div class="humid">
                        <span>
                            <svg width="18" name="rain-drop" class="eachDay-rain-drop" aria-label="Chance of Rain" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <span class="percent percent-js">${
                          d.day.daily_chance_of_rain
                        }%</span>
                    </div>
                </div>
                <span class="plus">
                    <svg width="18" name="add" class="plus-img" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path d="M10.625 9.875V5.5h-1.25v4.375H5v1.25h4.375V15.5h1.25v-4.375H15v-1.25h-4.375Z" fill="currentColor"></path>
                    </svg>
                </span>
            `;

      EachDayBar.appendChild(li);
      weatherDetails(index, obj, data);
    });

    document.querySelectorAll('[id^="cls-"]').forEach((eachItem) => {
      eachItem.addEventListener("click", (e) => {
        const idNum = e.currentTarget.id.split("-")[1];

        const todayItem = document.getElementById(`${idNum}-cls`);
        const card = document.getElementById(`${idNum}-card`);

        eachItem.style.display = "none";
        todayItem.style.display = "flex";
        card.style.display = "block";
      });
    });
    document.addEventListener("click", (e) => {
      const todayItem = e.target.closest('[id$="-cls"]');
      if (!todayItem) return;

      const idNum = todayItem.id.split("-")[0];
      const eachItem = document.getElementById(`cls-${idNum}`);

      todayItem.style.display = "none";
      eachItem.style.display = "flex";

      const card = document.getElementById(`${idNum}-card`);
      card.style.display = "none";
    });
  } catch {
    placeEl.textContent = "Location not Found";
    console.error("Error in Fetching data");
  }
}
fetchUrl();

//add signin section
const signinsection = document.querySelector(".sign-in");
const signinbutton = document.querySelector(".signin");

function toSignInSection() {
  adBlock.classList.add("hide");
  mainBody.classList.add("hide");
  hourlySection.classList.add("hide");
  tenDaySection.classList.add("hide");
  monthlySection.classList.add("hide");
  footerSection[1].classList.remove("hide");
  radarSection.classList.add("hide");
  allergySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  airQualitySection.classList.add("hide");
  signinsection.classList.remove("hide");
}

signinbutton.addEventListener("click", () => {
  toSignInSection();
});

