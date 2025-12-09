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