export function weatherDetails(id, obj,data){ 
    const days = data.forecast.forecastday
    const d = days[id]
   
    const cardsContent = document.createElement('div')
    cardsContent.id = `${id}-card`
    cardsContent.style.display = 'none'
        
    let date = new Date(d.date)
    
    cardsContent.innerHTML = ` 
        <div class="today" id="${id}-cls">
            <h2 class="cards-date">${id === 0 ? (data.current.is_day === 1 ? 'Today': 'Tonight') : date.toLocaleString('en-US', {weekday: 'short'})+ ' ' + date.getDate()}</h2>
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
                    <img src= 'https:${id === 0 ? data.current.condition.icon : obj.dayIcon}' class="sun-img"/>
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
                            <span>${d.day.maxwind_kph}</span>
                            &nbsp;
                            <span>km/h</span>
                        </span>
                    </div>

                </div>

            </div>
            <p class="explanation">${id === 0 ? data.current.condition.text : obj.dayText}. ${obj.dayTemp >= 20 ? 'High ' + obj.dayTemp + '°C': 'Low ' + obj.dayTemp + '°C'}. Winds ${data.current.wind_dir} at ${d.day.maxwind_kph} km/h.</p>
        </div>
        <div class="day-section2 measurements day-${id}">
            <ul class="weather">
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
                        <span class="r2">${d.astro.sunrise}</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="sunset" class="set icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="m10.625 8.11 1.619-1.613.881.88L10 10.504 6.875 7.378l.881-.881 1.619 1.612V3.003h1.25v5.106Zm5.12.764-2.191 2.191.884.884 2.19-2.191-.883-.884ZM10 13.003a2.503 2.503 0 0 1 2.5 2.5h1.25a3.75 3.75 0 0 0-7.5 0H7.5a2.503 2.503 0 0 1 2.5-2.5Zm8.75 4.375H1.25v1.25h17.5v-1.25Zm-3.125-3.125h3.125v1.25h-3.125v-1.25ZM4.255 8.874l-.884.884 2.191 2.19.884-.883-2.191-2.191ZM1.25 14.253h3.125v1.25H1.25v-1.25Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Sunset</span>
                        <span class="r2">${d.astro.sunset}</span>
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
                            <span>${obj.nightDir} </span>
                            <span>${obj.nightWind}</span>
                            &nbsp;
                            <span>km/h</span>
                        </span>
                    </div>

                    
                </div>
                
            </div>
            <p class="explanation">${obj.nightText}. ${obj.nightTemp >= 20 ? 'High ' + obj.nightTemp + '°C': 'Low ' + obj.nightTemp + '°C'}. Winds ${obj.nightDir} at ${obj.nightWind} km/h.</p>
        </div>
        <div class="night-section2 measurements">
            <ul class="weather">
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
                        <span class="r2">${d.astro.moonrise}</span>
                    </div>
                </li>
                <li>
                    <svg width="24" name="moonset" class="set icons" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21">
                        <title>Moonset</title>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 6.125 10 9.25l3.125-3.125-.881-.881-1.619 1.612V1.75h-1.25v5.106L7.756 5.244l-.881.881Zm3.873 7.99A4.973 4.973 0 0 0 10 16.75H8.75a6.204 6.204 0 0 1 2.346-4.877A5.006 5.006 0 0 0 5 16.75H3.75A6.257 6.257 0 0 1 10 10.5c.965 0 1.916.224 2.779.657a.625.625 0 0 1 0 1.119 4.974 4.974 0 0 0-2.03 1.839ZM15 16.75h1.25a6.24 6.24 0 0 0-1.592-4.167l-.931.834A4.992 4.992 0 0 1 15 16.75ZM18.75 18v1.25H1.25V18h17.5Z" fill="currentColor"></path>
                    </svg>
                    <div class="details-table">
                        <span class="r1">Moonset</span>
                        <span class="r2">${d.astro.moonset}</span>
                    </div>
                </li>

                <li>
                    <span><svg height="22" width="19.2" name="phase-11" class="waxing icons" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><title>Moon Phase - Day 11</title><path d="M515.73 57.54q-132.662 0-226.697 135.326t-94.036 325.528 94.036 325.528T515.73 979.248q190.202 0 325.794-135.326t135.592-325.528-135.592-325.528T515.73 57.54zm1.065 956.87q-205.12 0-350.835-145.715T20.245 518.393 165.96 167.825 516.795 21.844q204.587 0 350.302 145.981t145.715 350.568-145.715 350.302-350.302 145.715z"></path></svg></span>
                    <span class="r1">${d.astro.moon_phase}</span>
                </li>

            </ul>
        </div>  
        </div>
    `  
    if(id === 0){
        cardsContent.style.display = 'block'
        document.querySelector('#cls-0').style.display = 'none'
        
        if(data.current.is_day === 0){
            const dayEl = cardsContent.querySelectorAll('.day-0')
            dayEl.forEach( day => {
                if(day) day.style.display = 'none'
            })
            cardsContent.querySelector('.day-night-parts').style.display = 'block'
        }
    }

    cardsContent.classList.add('cards-content')
    const targetItem = document.getElementById(`cls-${id}`)
    targetItem.insertAdjacentElement('afterend',cardsContent)
}