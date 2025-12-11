const airbtn=document.querySelector(".air-button");
const ttip=document.querySelector(".tooltip");
const tttext=document.querySelector(".tooltiptext");
const headdrop=document.querySelector(".head-drop");
const tabs = document.querySelector(".tabs");
const blankp=document.querySelector(".path-blank");
headdrop.addEventListener("click",()=>{
    tabs.classList.toggle("hide");
    americas.style.border="none";
    americas.style.borderBottom="1px solid rgb(218, 218, 218)";
    me.style.border="none";
    me.style.borderBottom="1px solid rgb(218, 218, 218)";
    afr.style.border="none";
    afr.style.borderBottom="1px solid rgb(218, 218, 218)";
    ap.style.border="none";
    ap.style.borderBottom="1px solid rgb(218, 218, 218)";
    eur.style.border="none";
    eur.style.borderBottom="1px solid rgb(218, 218, 218)";
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
  americas.style.border="1px solid #f3cb17ff";
  countries1.classList.toggle("hide");
  add1.classList.toggle("hide");
  minus1.classList.toggle("hide");
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border="none";
  me.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border="none";
  afr.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border="none";
  ap.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border="none";
  eur.style.borderBottom="1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
me.addEventListener("click", () => {
  countries2.classList.toggle("hide");
  add2.classList.toggle("hide");
  minus2.classList.toggle("hide");
  me.style.border="1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border="none";
  americas.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border="none";
  afr.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border="none";
  ap.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border="none";
  eur.style.borderBottom="1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
afr.addEventListener("click", () => {
  countries3.classList.toggle("hide");
  add3.classList.toggle("hide");
  minus3.classList.toggle("hide");
  afr.style.border="1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border="none";
  americas.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border="none";
  me.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border="none";
  ap.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border="none";
  eur.style.borderBottom="1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
ap.addEventListener("click", () => {
  countries4.classList.toggle("hide");
  add4.classList.toggle("hide");
  minus4.classList.toggle("hide");
  ap.style.border="1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border="none";
  americas.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border="none";
  me.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border="none";
  afr.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries5.classList.add("hide");
  add5.classList.remove("hide");
  minus5.classList.add("hide");
  eur.style.border="none";
  eur.style.borderBottom="1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
eur.addEventListener("click", () => {
  countries5.classList.toggle("hide");
  add5.classList.toggle("hide");
  minus5.classList.toggle("hide");
  eur.style.border="1px solid #f3cb17ff";
  countries1.classList.add("hide");
  add1.classList.remove("hide");
  minus1.classList.add("hide");
  americas.style.border="none";
  americas.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries2.classList.add("hide");
  add2.classList.remove("hide");
  minus2.classList.add("hide");
  me.style.border="none";
  me.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries3.classList.add("hide");
  add3.classList.remove("hide");
  minus3.classList.add("hide");
  afr.style.border="none";
  afr.style.borderBottom="1px solid rgb(218, 218, 218)";
  countries4.classList.add("hide");
  add4.classList.remove("hide");
  minus4.classList.add("hide");
  ap.style.border="none";
  ap.style.borderBottom="1px solid rgb(218, 218, 218)";
  ttip.classList.toggle("hide");
});
ttip.addEventListener("click",()=>{
    airbtn.style.border="2px solid blue";
    tttext.classList.toggle("ttvisible");
})
const closedbtn=document.querySelector(".closedbtn");
const main=document.querySelector(".main-body");
main.addEventListener("click",(event)=>{
        console.log(event.target)
        if(event.target !== airbtn ){
            airbtn.style.border="none";
        }
}, true);

const loc=document.querySelector(".location span");
const temp=document.querySelector(".thermo-value");
const w=document.querySelector(".wind-value");
const hum=document.querySelector(".humid-value");
const dew=document.querySelector(".dew-value");
const pres=document.querySelector(".pressure-value");
const uv=document.querySelector(".uv-value");
const vis=document.querySelector(".visible-value");
const moon=document.querySelector(".moon-value");
const t2=document.querySelector(".t2");
const feel=document.querySelector(".temp span")
const wd=document.querySelector(".weather-descp");
const rise=document.querySelector(".rise span");
const set=document.querySelector(".set span");
const time=document.querySelector(".time span");

async function fetchData(){
  const response1=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1");
  const data1=await response1.json();
  w.textContent=data1.wind.speed + "km/h"
  hum.textContent=data1.main.humidity + "%";
  pres.textContent=data1.main.pressure + "mb";
  vis.textContent=data1.visibility + "km";
  let m1=Math.floor((data1.main.temp_max)-273)+"°";
  let m2=Math.floor((data1.main.temp_min)-273)+"°";
  let tm1m2=m1+"/"+m2;
  temp.textContent=tm1m2;
  t2.textContent=Math.floor(data1.main.feels_like-273)+"°";
  feel.textContent=Math.floor(data1.main.feels_like-273)+"°";
  loc.textContent=data1.name;
  wd.textContent=`Weather Today in ${data1.name}`;
  const now=new Date();
  let today=now.toString().split(" ");
  time.textContent=`As of ${today[4]} IST`;
  const a=new Date(data1.sys.sunrise);
  let s1=a.toString().split(" ");
  rise.textContent=s1[4].slice(0,s1.length-4);
  const b=new Date(data1.sys.sunset);
  let s2=b.toString().split(" ");
  set.textContent=s2[4].slice(0,s2.length-4);
}
fetchData();

const mt=document.querySelector(".morning-temp");
const at=document.querySelector(".afternoon-temp");
const et=document.querySelector(".evening-temp");
const ot=document.querySelector(".overnight-temp");

const h0=document.querySelector(".now-temp");
const h1=document.querySelector(".hour1-temp");
const h2=document.querySelector(".hour2-temp");
const h3=document.querySelector(".hour3-temp");
const h4=document.querySelector(".hour4-temp");

const tm1=document.querySelector(".hour1-time");
const tm2=document.querySelector(".hour2-time");
const tm3=document.querySelector(".hour3-time");
const tm4=document.querySelector(".hour4-time");
const tm=[tm1,tm2,tm3,tm4];

const tmp1=document.querySelector(".today-temp");
const tmp2=document.querySelector(".date1-temp");
const tmp3=document.querySelector(".date2-temp");
const tmp4=document.querySelector(".date3-temp");
const tmp5=document.querySelector(".date4-temp");
const tmp=[tmp1,tmp2,tmp3,tmp4,tmp5];

const d1=document.querySelector(".date1");
const d2=document.querySelector(".date2");
const d3=document.querySelector(".date3");
const d4=document.querySelector(".date4");
const da=[d1,d2,d3,d4];

let maximum=0;
let minimum=0;

async function getData(){
  const response1=await fetch("https://api.openweathermap.org/data/2.5/weather?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1");
  const data1=await response1.json();

  const response2=await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=11.6&lon=76.26&appid=53557a370d9be13f0e8c7466e7f33ee1");
  const data2=await response2.json();
    let k=1;

  for(let i=0;i<=39;i++){
        let num=data2.list[i].dt_txt;
       let str=num.toString().split(" ");
       let dstr=str[0];
       let d1=dstr.split("-");
       let rdate=d1[2];
       let taken=str[1];
       let t=taken.split(":");
       let ht=parseInt(t[0]);
       let today=new Date();
       let ttime=today.getHours();
       let td=today.toString().split(" ");
       let todaydate=td[2];
       h0.textContent=Math.floor(data1.main.temp-273)+"°";
      if(rdate===todaydate){
        if(ht>=6 && ht < 12){
          let ta=Math.floor(data2.list[i].main.temp-273) + "°";
          mt.textContent=ta;
        }
            else if(ht>=12 && ht< 18){
          let tb=Math.floor(data2.list[i].main.temp-273) + "°";
          at.textContent=tb;
        }
        else if(ht>=18 && ht< 24){
          let tc=Math.floor(data2.list[i].main.temp-273) + "°";
          et.textContent=tc;
        }
        else if(ht>=0 && ht< 6){
          let td=Math.floor(data2.list[i].main.temp-273) + "°";
          ot.textContent=td;
        }
         // hourly forecast
          if(k<=4){
            let kt=Math.floor(data2.list[i].main.temp-273)+"°";
            if(k===1){
              h2.textContent=kt;
            }
            else if(k===2){
              h2.textContent=kt;
            }
            else if(k===3){
              h3.textContent=kt;
            }
            else if(k===4){
              h4.textContent=kt;
            }
            k++;
          }
          if(Number(ttime)>=12 && Number(ttime)<15){
            tm1.textContent="15:00"
          }
          else if(Number(ttime)>=15 && Number(ttime)<18){
          tm1.textContent="18:00"
        }
        else if(Number(ttime)>=18 && Number(ttime)<21){
          tm1.textContent="21:00";
        } 
        else if(Number(ttime)>=21 && Number(ttime)<24){
          tm1.textContent="00:00";
        } 
        else if(Number(ttime)>=0 && Number(ttime)<3){
          tm1.textContent="03:00";
        } 
        else if(Number(ttime)>=3 && Number(ttime)<6){
          tm1.textContent="06:00";
        }
        else if(Number(ttime)>=6 && Number(ttime)<9){
          tm1.textContent="09:00";
        } 
        else if(Number(ttime)>=9 && Number(ttime)<12){
          tm1.textContent="12:00";
        } 
        let hour=(tm1.textContent);
          let splithour=hour.split(":");
          let firstsplit=splithour[0];
          let numhour=Number(firstsplit);
          let attach=":00"

        for(let z=1;z<4;z++){
        let numberh=(numhour+3).toString();
        tm[z].textContent=(numberh+attach);
          if(numhour<=24){
           numhour+=3;
        }
        else{
          numhour=3;
        }
       }
      }
}
               // daily forecast
        for(let j=0;j<=4;j++){
          for(let i=0;i<=39;i++){
             let num=data2.list[i].dt_txt;
              let str=num.toString().split(" ");
              let dstr=str[0];
              let d1=dstr.split("-");
              let rdate=d1[2];
              let taken=str[1];
              let t=taken.split(":");
              let ht=parseInt(t[0]);
              let today=new Date();
              let ttime=today.getHours();
              let td=today.toString().split(" ");
              let todaydate=td[2];
              if(Number(rdate)===Number(todaydate)+j){
              maximum+=data2.list[i].main.temp_max-273;
              let avgmax=Math.floor(maximum/8)+ "°";
              minimum+=data2.list[i].main.temp_min-273;
              let avgmin=Math.floor(minimum/8)+ "°";
              tmp[j].textContent=avgmax+"/"+avgmin;
              if(j!=4){
                let one=new Date(today);
              one.setDate(today.getDate()+j+1);
              let daily=one.toString().split(" ");
              let dailyarr=[];
              dailyarr.push(daily[0]);
              dailyarr.push(daily[2]);
              let dailystr=dailyarr.toString().replace(","," ");
              da[j].textContent=dailystr;
              }
      }
        }
      }
}
getData()