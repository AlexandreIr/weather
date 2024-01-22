const allIn = document.querySelector('#all');
const checkGroup = document.querySelectorAll('.c-group');
const results = document.querySelectorAll('.result');
let aux;


document.querySelector('.busca').addEventListener('submit', async (ev)=>{
    ev.preventDefault();

    let inputValue = document.getElementById('searchInput').value;
    if(inputValue != ''){
        clearInfo();
        showMessage("Carregando...");
        let json;
        if(aux!=undefined && aux.name==document.querySelector('#searchInput').value) json=aux;
        else{
            let url =  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=75949a193301897af3ba9243f9709856&units=metric&lang=pt_br`
            let results = await fetch(url);
            json= await results.json();
            aux=json;
        }
        
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

        
    if(allIn.checked==true){
        document.querySelector('.resultado').style.display='grid';
        for(let r of results){
            r.style.display='block';
        }
    } else {
        document.querySelector('.resultado').style.display='grid';
        checkGroup.forEach(c => {
            if(c.checked==false){
                for(let r of results){
                    if(r.classList.contains(`${c.id}Div`)){
                        r.style.display='none';
                    }
                }
            } else {
                for(let r of results){
                    if(r.classList.contains(`${c.id}Div`)){
                        r.style.display='block';
                    }
                }
            }
        });
    }
    
    

    document.querySelector('.resultado button').addEventListener('click', ()=>{
        document.querySelector('.resultado').style.display='none';
        document.querySelector('.params').style.display='grid';
        // checkGroup.forEach(c => {
        //     if(c.checked==false){
        //         for(let r of results){
        //             if(r.classList.contains(`${c.id}Div`)){
        //                 r.style.display='none';
        //             }
        //         }
        //     }
        // });
        document.querySelector('.resultado').style.display='grid';
    })
    
}

const clearInfo = () => {
    showMessage('');
    document.querySelector('.resultado').style.display='none';
}

const showMessage = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
    document.querySelector('.params').style.display='none';
}

function allInfo() {
    if(allIn.checked==true){
        checkGroup.forEach(g =>g.checked=true);
    }
    else{
        checkGroup.forEach(g =>g.checked=false);
    }
}

function allOut(){
    let count = 0;
    checkGroup.forEach(c=>{
        c.addEventListener('click', (e)=>{
            if(e.target.checked==false){
                allIn.checked=false;
            }
        });
        if(c.checked==true) count++;
    })
    if(count==checkGroup.length) allIn.checked=true;
}
allOut();

checkGroup.forEach(ck => ck.addEventListener('click', allOut))

allIn.addEventListener('click', allInfo)


