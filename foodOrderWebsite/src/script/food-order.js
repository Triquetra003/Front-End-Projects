//weather
const apiKey='YOUR-API-KEY';
const apiUrl='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchApi="https://maps.googleapis.com/maps/api/js?key='YOUR-API-KEY'&libraries=places&callback=initMap"
var dateArea=document.getElementById('date-area');
var searchText=document.getElementById('search-text');
var searchBtn=document.getElementById('search-icon');
var weatherIcon=document.getElementById('weather-icon');
var temp=document.getElementById('temp');
var search=document.getElementById('search');

//detect-location
var result = document.getElementById("json-result");
const Http = new XMLHttpRequest();

const cityName=document.getElementById('city-name');
const submitBtn=document.getElementById('submit-btn')
const playGame=document.getElementById('play-game');
const winDisplay=document.getElementById('win-display');

//detect-location-function

function getLocation() {
    console.log("getLocation Called");
    var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"

    navigator.geolocation.getCurrentPosition(
        (position) => {
            bdcApi = bdcApi
                + "?latitude=" + position.coords.latitude
                + "&longitude=" + position.coords.longitude
                + "&localityLanguage=en";
            getApi(bdcApi);

        },
        (err) => { getApi(bdcApi); },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
}
function getApi(bdcApi) {
    Http.open("GET", bdcApi);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
           cityName.innerText=this.responseText;
           console.log(this.responseText[0].localityInfo[0].administrative[2].city)
        }
    };
}
//  getLocation()

function onSubmit(){
  submitBtn.style.backgroundColor='red';
  submitBtn.innerHTML='Order Placed';
  playGame.style.display='block';
}

//Play Game:

let currPlayer = 'X';
let endGame = false;
// Winning Positions in game
let winPos=[
[1,2,3],[4,5,6],[7,8,9],
[1,4,7],[2,5,8],[3,6,9],
[1,5,9],[3,5,7]
];

// for loop for max 9 moves in the game

for(let i=1;i<=9;i++){
document.getElementById(i.toString()).addEventListener('click',
//adding eventListners to every td
function(){

   if(this.innerHTML===''&& !endGame){
    //Display symbol of current player
    this.innerHTML=currPlayer;
    this.classList.add(currPlayer.toLowerCase());
    //Check if the player moved a winning position
    checkWin();
    //Switching players
    if (currPlayer === "X")
    {currPlayer = "O"
    winPlayer='X'}
    else{
    currPlayer = "X"
    winPlayer='O'}
   }
});
}


function checkWin() {
for (let i = 0; i < winPos.length; i++) {
if (
  document.getElementById(winPos[i][0]).innerHTML === currPlayer &&
  document.getElementById(winPos[i][1]).innerHTML === currPlayer &&
  document.getElementById(winPos[i][2]).innerHTML === currPlayer
) {
  document.getElementById(winPos[i][0]).classList.add("win");
  document.getElementById(winPos[i][1]).classList.add("win");
  document.getElementById(winPos[i][2]).classList.add("win"); 
  endGame = true;
  setTimeout(function() {
    winDisplay.innerHTML=winPlayer+' Wins!';
  }, 500);
}
else if(document.getElementById('1').innerHTML!==''&&document.getElementById('2').innerHTML!==''&&document.getElementById('3').innerHTML!==''&&document.getElementById('4').innerHTML!==''&&document.getElementById('5').innerHTML!==''&&document.getElementById('6').innerHTML!==''&&document.getElementById('7').innerHTML!==''&&document.getElementById('8').innerHTML!==''&&document.getElementById('9').innerHTML!==''&& !endGame){
    setTimeout(function() {
    winDisplay.innerHTML="It's A Tie!"
  }, 500);
}
}
}

//Reset

function reset() {
for (let i = 1; i <= 9; i++) {
  document.getElementById(i.toString()).innerHTML = "";
  document.getElementById(i.toString()).classList.remove("x");
  document.getElementById(i.toString()).classList.remove("o");
  document.getElementById(i.toString()).classList.remove("win");
  endGame = false;
}
winDisplay.innerHTML='';
}

//weather-function

async function checkWeather(cityName){
    const response = await fetch(apiUrl+cityName+`&appid=${apiKey}`);
    var data=await response.json();
    console.log(data);

    temp.innerHTML=Math.round(data.main.temp)+'°C';

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

document.getElementById('search-icon').addEventListener('click',function(){
    checkWeather(searchText.value);
    document.getElementById('weather-info').style.display='block';
    if(city.value=='undefined'){
        document.getElementById('weather-info').innerText=data.message
    }
})

//Search Autocomplete Google Api

function initMap(){
    autocomplete= new google.maps.places.Autocomplete((searchText))
    autocomplete.addListener('',)
}

//Adding Keyboard Shortcut For Weather-Search 

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



