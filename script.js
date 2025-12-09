const city = "thrissur";
const token = "bd01206366680e2361b32e378d5408128ab4be90";
fetch(`https://api.waqi.info/feed/${city}/?token=${token}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const result = data.data;
    document.getElementById("city_name").textContent = `- ${result.city.name}`
    document.getElementById("no2").textContent = result.iaqi.no2?.v ?? "--";
    document.getElementById("co").textContent = result.iaqi.co?.v ?? "--";
    document.getElementById("pm25").textContent = result.iaqi.pm25?.v ?? "--";
    document.getElementById("pm10").textContent = result.iaqi.pm10?.v ?? "--";
    document.getElementById("aqi").textContent = result.aqi ?? "--";
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
    document.getElementById("aqi_air").textContent = getstatus(
      "aqi",
      result.aqi ?? "--"
    );
    document.getElementById("air_para").textContent = getstatus(
      "para",
      result.aqi ?? "--"
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


      strockFill("aqi_don",result.aqi??0,getstatus("aqi",result.aqi))
      strockFill("pm25_don",result.iaqi.pm25?.v??0,getstatus("pm25",result.iaqi.pm25?.v))
      strockFill("pm10_don",result.iaqi.pm10?.v??0,getstatus("pm10",result.iaqi.pm10?.v))
      strockFill("co_don",result.iaqi.co?.v??0,getstatus("co",result.iaqi.co?.v))
      strockFill("o3_don",result.iaqi.o3?.v??0,getstatus("o3",result.iaqi.o3?.v))
      strockFill("so2_don",result.iaqi.so2?.v??0,getstatus("so2",result.iaqi.so2?.v))
      strockFill("no_don",result.iaqi.no2?.v??0,getstatus("no2",result.iaqi.no2?.v))
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
  const r = [[0, 50, 0, 12],[51, 100, 12.1, 35.4],[101, 150, 35.5, 55.4],[151, 200, 55.5, 150.4],[201, 300, 150.5, 250.4],[301, 400, 250.5, 350.4],[401, 500, 350.5, 500.4],];
  return convert(aqi, r);
}
function pm10Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [[0, 50, 0, 54],[51, 100, 55, 154],[101, 150, 155, 254],[151, 200, 255, 354],[201, 300, 355, 424],[301, 400, 425, 504],[401, 500, 505, 604],];
  return convert(aqi, r);
}
function no2Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [[0, 50, 0, 40],[51, 100, 41, 80],[101, 150, 81, 180],[151, 200, 181, 280],[201, 300, 281, 400],[301, 400, 401, 600],[401, 500, 601, 1000], ];
  return convert(aqi, r);
}
function so2Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [[0, 50, 0, 40],[51, 100, 41, 80],[101, 150, 81, 380],[151, 200, 381, 800],[201, 300, 801, 1600],];
  return convert(aqi, r);
}
function o3Convert(aqi) {
  if (aqi === "--") return "--";
  const r = [[0, 50, 0, 50],[51, 100, 51, 100],[101, 150, 101, 168],[151, 200, 169, 208],[201, 300, 209, 748], ];
  return convert(aqi, r);
}
function coConvert(aqi) {
  if (aqi === "--") return "--";
  const r = [[0, 50, 0, 1.0],[51, 100, 1.1, 2.0],[101, 150, 2.1, 10],[151, 200, 10.1, 17],[201, 300, 17.1, 34],];
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
// Donut

function strockFill(cirId,aqi,status,max=500){
    const circle=document.getElementById(cirId)
    if(!circle||aqi==="--") return
    const total=305
    const percent=Math.min(aqi/max,1)
    const offset=total*(1-percent)
    circle.style.strokeDashoffset=offset

    if(status==="Good") circle.style.stroke="green"
    else if(status==="Satisfactory") circle.style.stroke="yellow"
    else if(status==="Moderate") circle.style.stroke="orange"
    else if(status==="Poor") circle.style.stroke="#cc5500"
    else circle.style.stroke="red"
}
// primary poluttant
