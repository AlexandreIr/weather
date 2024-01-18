document.querySelector('.busca').addEventListener('submit', async (ev)=>{
    ev.preventDefault();

    let inputValue = document.getElementById('searchInput').value;
    if(inputValue != ''){
        clearInfo();
        showMessage("Carregando...");
        let url =  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=75949a193301897af3ba9243f9709856&units=metric&lang=pt_br`
        let results = await fetch(url);
        let json = await results.json();
        console.log(json);
        if(json.cod==200){
            showInfo({
                name:json.name, 
                country: json.sys.country,
                temp: json.main.temp, 
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                sens: json.main.feels_like,
                humi: json.main.humidity
            })
        } else {
            clearInfo();
            showMessage('Cidade não encontrada');
        }
    
    } else {
        clearInfo();
    }
})

const showInfo = (json) => {
    showMessage('');

    document.querySelector('.titulo').innerHTML=`${json.name},${json.country}`;

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.tempInfo').innerHTML=`${json.temp.toFixed(0)}ºC`;

    document.querySelector('.sensInfo').innerHTML=`${json.sens.toFixed(0)}ºC`;
    

    document.querySelector('.ventoInfo').innerHTML=`${json.windSpeed}KM/H`;
    document.querySelector('.ventoPonto').style.transform=`rotate(${json.windAngle-90}deg)`;

    document.querySelector('.umidadeInfo').innerHTML=`${json.humi}g/m³`;

    document.querySelector('.resultado').style.display='block';
}

const clearInfo = () => {
    showMessage('');
    document.querySelector('.resultado').style.display='none';
}

const showMessage = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
}