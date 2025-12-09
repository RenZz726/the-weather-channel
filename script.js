import { weatherDetails } from "./weatherDetails.js"

const EachDayBar = document.querySelector('.eachDayBar')
const placeEl = document.querySelector('.place-js')

async function fetchUrl(){
    try{
        const key = 'f79a86fd3d6142df94534541250512'
        const location = 'Kozhikode'

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=14`
        const res = await fetch(url)
        const data = await res.json()
    
        const days = data.forecast.forecastday
        
        placeEl.textContent = `${data.location.name}, ${data.location.region}`
        document.querySelector('.location-js').textContent = data.location.name
        document.querySelector('.time-js').textContent = `${data.current.last_updated.split(' ')[1]} IST`

        days.forEach((d, index) => {
            let date = new Date(d.date)
            const hours = d.hour
            
            const dayIcon = hours[15].condition.icon
            const dayText = hours[15].condition.text

            const nightIcon = hours[21].condition.icon
            const nightText = hours[21].condition.text

            let nightTempArr = [], nightHumidArr = [], nightRain = [], nightWind = [], nightUv = [], freq = {}, nightDir 
            hours.forEach((h) =>{
                if(!h.is_day){
                    nightTempArr.push(h.temp_c)
                    nightHumidArr.push(h.humidity)
                    nightRain.push(h.chance_of_rain)
                    nightWind.push(h.wind_kph)
                    nightUv.push(h.uv)
                    
                    if(!freq[h.wind_dir])freq[h.wind_dir] = 1
                    else freq[h.wind_dir]++   
                }
            })
            Object.keys(freq).reduce((a,b) => freq[a] > freq[b] ? nightDir =  a: nightDir = b, '')
            const avg = arr=> Math.round(arr.reduce((a,b)=> a+b,0)/arr.length)
            
            const  obj = {
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
                nightText: nightText
            }

            const li = document.createElement('li')

            li.classList.add('eachDay')
            li.id = `cls-${index}`
            li.dataset.id = index

            li.innerHTML = `
            
                <div class="eachDay">
                    <h2 class="date">${li.id === 'cls-0' ? (data.current.is_day === 1 ? 'Today' : 'Tonight') : date.toLocaleString('en-US', {weekday: 'short'}) + ' ' + date.getDate()}</h2>
                    <div class="eachDay-img">   
                        <img src ='https:${li.id === 'cls-0' ? data.current.condition.icon : dayIcon}' class="sun-img each-sun"/>
                        <span class="eachDay-txt">${li.id === 'cls-0' ? data.current.condition.text : dayText}</span>
                    </div>

                    <div class="degrees">
                        <span class="day-deg">${li.id === 'cls-0' ? (data.current.is_day ? obj.dayTemp+'°' : '--'): obj.dayTemp+'°'}</span>
                        <span>/<span class="night-deg">${obj.nightTemp}<span>°</span></span></span>
                    </div>

                    <div class="humid">
                        <span>
                            <svg width="18" name="rain-drop" class="eachDay-rain-drop" aria-label="Chance of Rain" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.025 16.35A5.633 5.633 0 0 0 10 18a5.633 5.633 0 0 0 5.625-5.625 6.29 6.29 0 0 0-.952-3.13L10.53 2.649a.65.65 0 0 0-1.06 0L5.31 9.278c-.578.932-.9 2-.934 3.097a5.632 5.632 0 0 0 1.65 3.976Zm.361-6.44L10 4.155l3.595 5.723c.475.75.744 1.61.78 2.497a4.375 4.375 0 1 1-8.75 0 4.986 4.986 0 0 1 .761-2.465ZM10 14.25v1.25a3.29 3.29 0 0 0 3.125-3.125h-1.25A2.06 2.06 0 0 1 10 14.25Z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <span class="percent percent-js">${d.day.daily_chance_of_rain}%</span>
                    </div>
                </div>
                <span class="plus">
                    <svg width="18" name="add" class="plus-img" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path d="M10.625 9.875V5.5h-1.25v4.375H5v1.25h4.375V15.5h1.25v-4.375H15v-1.25h-4.375Z" fill="currentColor"></path>
                    </svg>
                </span>
            `
            
            EachDayBar.appendChild(li)
            weatherDetails(index, obj,data)
        })

        document.querySelectorAll('[id^="cls-"]').forEach(eachItem => {
            eachItem.addEventListener('click', (e)=> {
                
                const idNum = e.currentTarget.id.split('-')[1]
                
                const todayItem = document.getElementById(`${idNum}-cls`)
                const card = document.getElementById(`${idNum}-card`)

                eachItem.style.display = 'none'
                todayItem.style.display = 'flex'
                card.style.display = 'block'
            
            })
        })
        document.addEventListener('click', e => {
            const todayItem = e.target.closest('[id$="-cls"]')
            if(!todayItem) return 

            const idNum = todayItem.id.split('-')[0]
            const eachItem = document.getElementById(`cls-${idNum}`)

            todayItem.style.display = 'none'
            eachItem.style.display = 'flex'

            const card = document.getElementById(`${idNum}-card`)
            card.style.display = 'none'
        })
    }
    catch{
        placeEl.textContent = 'Location not Found'
        console.error('Error in Fetching data')
    }
}
fetchUrl()