     


// AGREGAR VALIDACIONES AJAX AUNQUE SE SABE QUE FUNCA

// function consultarDataGame(objData) {

//     var request = new XMLHttpRequest();    
    
//     request.onreadystatechange = function() {

//         if (this.readyState == 4 && this.status == 200) {

//             let objDOTA = JSON.parse(request.responseText);   
//             objData(objDOTA);     
                        
//         } 
//     }

//     request.open("GET","https://api.opendota.com/api/heroStats");
//     request.send();
 
// }

function consultarDataGame(callback){
    fetch("https://api.opendota.com/api/heroStats")
    .then(response => response.json())
    .then(response => callback(response))
}


// function consultarHistoryAndAbilities(objData2) {

//     var request = new XMLHttpRequest();    
    
//     request.onreadystatechange = function() {

//         if (this.readyState == 4 && this.status == 200) {

//             let objDOTA2 = JSON.parse(request.responseText);   
//             objData2(objDOTA2);    
                        
//         } 
//     }

//     request.open("GET","../data/spanish/heroes.json");
//     request.send();

// }

function consultarHistoryAndAbilities(callback,heroName){
    fetch(`http://localhost:5000/heroes/${heroName}`)
    .then(response => response.json())
    .then(response => callback(response))
}

///---------------------------ZONA DE PARTIDAS LIVE------------------------------------------

// 10/5 LA API RESPONDE MUY LENTO. VERIFICADO POR FUERA DEL SCRIP/ ES TEMP DE TORNEOS DEBE ESTAR SOBRECARGADA(?
// function findLiveHero(objLiveData) {

//     var request = new XMLHttpRequest();    
    
//     request.onreadystatechange = function() {

//         if (this.readyState == 4 && this.status == 200) {

//             let objLive = JSON.parse(request.responseText);
//             objLiveData(objLive);   
                       
//         } 
//     }

//     request.open("GET","https://api.opendota.com/api/live");
//     request.send();
    
// }

// function findLiveHero(callback){
//     fetch("https://api.opendota.com/api/live")
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(response){
//         callback(response)
//     })
// }

function findLiveHero(callback){
    fetch("https://api.opendota.com/api/live")
    .then(response => response.json())
    .then(response => callback(response))
}