const hourPlace = document.querySelector('.hourplace')
const ist = document.querySelector('.ist')
const hoursummary = document.querySelector('.hoursummary')
const hourdayPartDetails = document.querySelector('.hourdayPartDetails')

const API_KEY = 'e687396580364dc882344618250512'
const LOCATION = 'palakkad'

const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3`

fetch(url)
.then(res => res.json())
.then(data =>{
  //location
     const loc = data.location
  //header location,IST
     hourPlace.textContent = `${loc.name}, ${loc.region}, ${loc.country}`
     ist.textContent = `${loc.localtime.split(' ')[1]}`
      let minutes;
      let hr;
      
    let days = data.forecast.forecastday
    for(let day of days){
      //dataList
      const HourDate = document.createElement('div')
       const hours = day.hour
       let formattedDate = new Date(day.date).toLocaleDateString('en-US',{
        weekday:'long',
        day:'numeric',
        month:'long'
        })
        HourDate.classList.add('hourdate')
        hoursummary.appendChild(HourDate)

        let items = formattedDate.split(' ');
        formattedDate = `${items[0]} ${items[2]} ${items[1]}`
        formattedDate = formattedDate.replace(',','')
        //date
        HourDate.textContent = formattedDate
        let listId;
        hours.forEach((hrs,index) =>{
        let fullHrs = hrs.time 
        let dateObj = new Date(fullHrs)
        let apiHour = Number(fullHrs.split(' ')[1].split(':')[0]);
        let hourDate = fullHrs.split(' ')[0]
        let todayDate = loc.localtime.split(' ')[0]
        
        if(hourDate === todayDate){
         let currentHr = Number(loc.localtime.split(' ')[1].split(':')[0])
         let  currentMin = Number(loc.localtime.split(' ')[1].split(':')[1])
        //  console.log(currentHr,currentMin)
         if(currentMin <= 30){
           currentMin = 30
         }else{
          currentHr += 1
          currentMin = 30
          // console.log(hr, minutes)
         }
         if(currentHr === 24) currentHr = 0
         if(apiHour < currentHr) return;
         hr = apiHour
         minutes = 30      
     }else{
      hr = apiHour
      minutes  = 30
     }
          const div = document.createElement('div')
          let weatherIcon =  'https:' + hrs.condition.icon
          div.id = `class-${new Date(day.date).getDate()}:${index}`
          // console.log(fullHrs.split(' ')[1].split(':')[0])
       div.innerHTML = `
        <div class="hourtime">${String(hr).padStart(2,'0')}:${minutes}</div>
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
          <svg width = '18' class='houradd' name="add"  fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
          <title>Add</title>
          <path d="M10.625 9.875V5.5h-1.25v4.375H5v1.25h4.375V15.5h1.25v-4.375H15v-1.25h-4.375Z" fill="currentColor"></path>
        </svg>
        <svg width = '18' name="subtract" class='hoursubtract' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
          <title>Subtract</title>
          <path d="M15 9.875H5v1.25h10v-1.25Z" fill="currentColor"></path>
        </svg>
        </span>
     `
      div.classList.add('hoursummaryContent')
       hoursummary.appendChild(div)
     // card
       const ul = document.createElement('ul')
       ul.id = `card-${new Date(day.date).getDate()}:${index}`
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
       `
      ul.classList.add(`hourdata`);     
       ul.classList.add('hourdayPartDetails')
      const listItem = document.getElementById(`class-${new Date(day.date).getDate()}:${index}`)
      listItem.insertAdjacentElement('afterend',ul)
        })  
    }
        document.querySelectorAll('[id^="class-"]').forEach(el =>{
          let add = el.querySelector('.houradd')
          let sub = el.querySelector('.hoursubtract')
          el.addEventListener('click',(e)=>{

          document.querySelectorAll('[id^="class-"]').forEach(item =>{
            if(item !== el){
              item.classList.remove('active')
            }
          })
          let dateId = e.currentTarget.id.split('-')[1]
          add.style.display = add.style.display === 'none'?'block':'none'
          sub.style.display = sub.style.display === 'block'?'none':'block'
           el.classList.toggle('active')
          const ul = document.getElementById(`card-${dateId}`)   
          ul.style.display = ul.style.display === 'flex' ? 'none':'flex'

    })
}) 
const firstItem = document.querySelector('[id^="card-"]')
const firstList = document.querySelector('[id^="class-"]')
if(firstItem){
  firstItem.style.display = 'flex'
  firstList.querySelector('.hoursubtract').style.display = 'block'
  firstList.querySelector('.houradd').style.display = 'none'
}
})
.catch(err => console.log(err));