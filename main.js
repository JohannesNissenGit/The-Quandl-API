const API_KEY = 'Q1SBpsq-JtuF9zWsRAq_';
let setTime = 10000;

//https://www.quandl.com/api/v3/datasets/BITFINEX/BTCJPY?start_date=2021-05-09&end_date=2021-05-09&api_key=Q1SBpsq-JtuF9zWsRAq_

async function loadCourse() {
    let todayDate = new Date;
    todayDate.setDate( new Date().getDate() -1);
    let startDate = todayDate.toISOString().split('T')[0];
    let endDate = startDate ;
    let url =`https://www.quandl.com/api/v3/datasets/BITFINEX/BTCJPY?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
   console.log(responseAsJson['dataset']['data'][0]); 
    
    displayValues(responseAsJson);
}

function displayValues(dataArray) {

    let date = dataArray['dataset']['data'][0][0];
    let midCourse = dataArray['dataset']['data'][0][3];
    let currentCourse = dataArray['dataset']['data'][0][4];
    document.getElementById('currentValue').innerHTML = currentCourse;
    document.getElementById('currentDate').innerHTML = date;
    document.getElementById('midValue').innerHTML = midCourse;
}

function refreshData() {
     let reFreshRate = document.getElementById('refreshRate').value;
     setTime = 1000 * reFreshRate;
    setInterval(() => {
        loadCourse()
    }, setTime);
}

