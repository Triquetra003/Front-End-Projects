     
      //Defining All Variables And Constants

      const apiKey=config.YOUR_API_KEY;
      const apiKey2=config.YOUR_API_KEY_2;
      const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
      const searchApi="https://maps.googleapis.com/maps/api/js?key="+apiKey2+"&libraries=places&callback=initMap"
      var weatherIcon=document.getElementById('weather-icon')
      var temp=document.getElementById('temp');
      var city=document.getElementById('city');
      var humidity=document.getElementById('humidity');
      var feelsLike=document.getElementById('feels-like')
      var wind=document.getElementById('wind');
      var tempMin=document.getElementById('temp-min');
      var tempMax=document.getElementById('temp-max');
      var searchText=document.getElementById('search-text');
      var searchBtn=document.getElementById('search-icon');
      var dateArea=document.getElementById('date-area');
     
    
      //Adding API KEY and ASYNC Function
      
      async function checkWeather(cityName){
          const response = await fetch(apiUrl+cityName+`&appid=${apiKey}`);
          var data=await response.json();
          console.log(data);
  
          //DATA from api call 
  
          city.innerHTML='<i class="fa-solid fa-city" id="city-icon"></i>  '+data.name;
  
          temp.innerHTML=Math.round(data.main.temp)+'°C';
  
          humidity.innerHTML='<p style="text-decoration:underline">Humidity</p><i class="fa-solid fa-water" id="humidity-icon"></i>' +  ' '+'<span style="color:blue;">'+ data.main.humidity +'%'+'</span>'
  
          feelsLike.innerHTML='<p style="text-decoration:underline">Feels Like</p>'+'<i class="fa-solid fa-temperature-half" id="feels-like-icon"></i>'+ ' '+'<span style="color:blue;">'+Math.round(data.main.feels_like)+'°C'+'</span>'
  
          wind.innerHTML='<p style="text-decoration:underline">Wind Speed</p><i class="fa-solid fa-wind" id="wind-icon"></i>'+' '+'<span style="color:blue;">'+data.wind.speed+' Km/hr '+'</span>'
  
          tempMin.innerHTML='<p style="text-decoration:underline">Min Temp</p>'+'<i class="fa-solid fa-temperature-low" id="temp-min-icon"></i>'+' '+'<span style="color:blue;">'+Math.round(data.main.temp_min)+'°C'+'</span>'
  
          tempMax.innerHTML='<p style="text-decoration:underline">Max Temp</p>'+'<i class="fa-solid fa-temperature-high" id="temp-max-icon"></i>'+' '+'<span style="color:blue;">'+Math.round(data.main.temp_max)+'°C'+'</span>'
  
          //Weaher Icons from fontAwesome
  
          if(data.weather[0].main==='Clear'){
              weatherIcon.innerHTML='<i class="fa-regular fa-sun" style="color: #fbff29;"></i>'
          }
          else if(data.weather[0].main==='Haze'){
              weatherIcon.innerHTML='<i class="fa-solid fa-cloud-sun" style="color: #f0e193;"></i>';
          }
          else if(data.weather[0].main==='Clouds'){
              weatherIcon.innerHTML='<i class="fa-solid fa-cloud" style="color: #c2c9d6;"></i>';
          }
          else if(data.weather[0].main==='Rain'){
              weatherIcon.innerHTML='<i class="fa-solid fa-cloud-rain" style="color: #bdc6d6;"></i>';
          }
      }
  
      //Event of typo or unidentified city-search
  
      document.getElementById('search-icon').addEventListener('click',function(){
          checkWeather(searchText.value);
          document.getElementById('weather-info').style.display='block';
          if(city.value=='undefined'){
              document.getElementById('weather-info').innerText=data.message
          }
      })
  
      //Adding Keyboard Shortcut For Search 
  
      document.addEventListener('keydown', (event) => {
      if( event.key == "Enter") {
          checkWeather(searchText.value);
      document.getElementById('weather-info').style.display='block';
         }
      });
  
  
      //Date Function
  
      const date=new Date();
      var day=document.getElementById('day');
      var month=document.getElementById('month');
      var dated=document.getElementById('dated');
  
      day.innerText=date.getDay();
      month.innerText=date.getMonth();
      dated.innerText=date.getDate();
  
     
  
      function dateDisplay(){
  
               if(date.getDay()==0){day.innerText='Sunday'}
         else  if(date.getDay()==1){day.innerText='Monday'}
         else  if(date.getDay()==2){day.innerText='Tuesday'}
         else  if(date.getDay()==3){day.innerText='Wednesday'}
         else  if(date.getDay()==4){day.innerText='Thursday'}
         else  if(date.getDay()==5){day.innerText='Friday'}
         else  if(date.getDay()==6){day.innerText='Saturday'};
  
               if(date.getMonth()==0){month.innerText='Jan'}
          else if(date.getMonth()==1){month.innerText='Feb'}
          else if(date.getMonth()==2){month.innerText='Mar'}
          else if(date.getMonth()==3){month.innerText='Apr'}
          else if(date.getMonth()==4){month.innerText='May'}
          else if(date.getMonth()==5){month.innerText='Jun'}
          else if(date.getMonth()==6){month.innerText='Jul'}
          else if(date.getMonth()==7){month.innerText='Aug'}
          else if(date.getMonth()==8){month.innerText='Sep'}
          else if(date.getMonth()==9){month.innerText='Oct'}
          else if(date.getMonth()==10){month.innerText='Nov'}
          else if(date.getMonth()==11){month.innerText='Dec'}
  
      }
      
      dateDisplay();
      