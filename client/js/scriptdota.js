//div en el que se cargan las imagenes de los pj
let divImgsAllPJs = document.getElementById("divImgAllPJ");     
//div en el que se dibuja el nombre pj al dom 
let divGeneralPJ = document.getElementById("divGeneralPJ");    
//en el que se carga la imagen del pj(más grande) despues del click
let divImgPJ = document.getElementById("divImgPJ");     
//span donde se dibuja la data del pj
let divStatsPJ = document.getElementById("divStatsPJ");  
//No esta en uso        
let prosInGame = document.getElementById("prosInGame");      
//div donde se dibujan los pros y los nomries usando el pj
let prosUsingInGame = document.getElementById("usingInGame");   

//------------------------------------------------------------------------

consultarDataGame(objDOTA => {

	renderImgPJ(objDOTA);

});

// raiz de img    EXAMPLE: https://api.opendota.com --> /apps/dota2/images/heroes/antimage_full.png?
let rutabase = "https://api.opendota.com";      



/*
  https://api.opendota.com/api/heroes
  https://api.opendota.com/api/heroStats  acá estan las imagenes

 
  https://api.opendota.com/api/proplayers

  https://api.opendota.com/api/live   encontrar la forma de implementarlo 

  
  https://api.opendota.com/api/proMatches  SE RELACIONA CON ID_TEAMS / RADIANT O DIRE Y SE SACA EL NOMBRE DEL EVENTO
  
  https://api.opendota.com/api/teams/   543897    /heroes   EL INT ES EL ID_TEAM

  https://api.opendota.com/api/teams
 
*/


// AGREGAR VALIDACIONES AJAX AUNQUE SE SABE QUE FUNCA

function consultarDataGame(objData) {

    var request = new XMLHttpRequest();    
    
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            let objDOTA = JSON.parse(request.responseText);

            // TRATAR DE IMPLEMENTAR MAP PARA QUE SOLO SE CARGUE LO QUE NECESITO, AUNQUE CREO NO HABRA DIFERENCIA...

            // let objDOT = objDOTA.map(function(item){
            //     return {
            //         id_hero: item
            //     }
            // });
            //console.log(objDOT);
            objData(objDOTA);       
            
        } 
    }

    request.open("GET","https://api.opendota.com/api/heroStats");
    request.send();

    console.log("Lista usuarios cargado como objeto(?");

}


function renderImgPJ(objData) {
    
    for (let i = 0; i < objData.length; i ++) {
        
        let renderPJ = document.createElement("img");

        renderPJ.setAttribute("class", "img_dota");
        renderPJ.setAttribute("src",  (rutabase + (objData[i].img)));

        divImgsAllPJs.appendChild(renderPJ);
     

        renderPJ.addEventListener("click", function(){

            let refId = i;
            
            verDatosPJ(objData, refId);

            findLiveHero(objLive => {
            
                finderProInGame(objLive, refId);
            
            })
        })

    }
    console.log("Querías Botones, ahí tenes!! Pero con imagenes");
}


function verDatosPJ(objData, refId){

    divGeneralPJ.innerHTML = "";                            //se limpia la vista del elemento
    divImgPJ.innerHTML = "";
    divStatsPJ.innerHTML = "";

    let id_hero = objData[refId].id;                        // de momento sin uso 
    let namePJ = objData[refId].localized_name;             //nombre pj 
    let img = objData[refId].img;                           //link img
    let attr_base = objData[refId].primary_attr;            //atributo primario  
    let attack_type = objData[refId].attack_type;           //tipo de ataque
    let role = objData[refId].roles;                        //rol que desempeña 
    let icon = objData[refId].icon;                         //icono del pj    todavia sin usar
    // NO OLVIDAR IMPLEMENTAR LAS ESTATICAS DE LA CARPETA STUFF CON LA IMAGEN DEL LOS ATRIBUTOS    
    let base_str = objData[refId].base_str;                 //fuerza base
    let base_agi = objData[refId].base_agi;                 //agilidad base
    let base_int = objData[refId].base_int;                 //inteligencia base

    let str_gain = objData[refId].str_gain;                 //ganancia de fuerza
    let agi_gain = objData[refId].agi_gain;                 //ganancia de agilidad
    let int_gain = objData[refId].int_gain;                 //ganancia de inteligencia

    let attack_rate = objData[refId].attack_rate;           //tiempo de ataque
    let move_speed = objData[refId].move_speed;             //velocidad de moviento
         
    divGeneralPJ.appendChild(document.createTextNode(namePJ));

    switch (attr_base) {
        case "str":
            
            let logostr = document.createElement("img");
            logostr.setAttribute("class","logoAtri");    
            logostr.setAttribute("src", "../stuff/hero_str.png");
            divGeneralPJ.appendChild(logostr);
            
        break;

        case "agi":                    

            let logoagi = document.createElement("img");
            logoagi.setAttribute("class","logoAtri");    
            logoagi.setAttribute("src", "../stuff/hero_agi.png");
            divGeneralPJ.appendChild(logoagi);
                    
        break

        case "int":            
            
            let logoint = document.createElement("img");
            logoint.setAttribute("class","logoAtri");    
            logoint.setAttribute("src", "../stuff/hero_int.png");
            divGeneralPJ.appendChild(logoint);
                    
        break;
    }

        
    let render = document.createElement("img");
    render.setAttribute("class", "imgSize");
    render.setAttribute("src", (rutabase+img));
    divImgPJ.appendChild(render);   
 
    
    // se le asigna un background color de acuerdo al atributo primario
    switch (attr_base) {
        case "str":
            divStatsPJ.style.backgroundColor = "#f34336"; /// ALL SW(? CHANGE COLOR BACKGR POR TONOS ACORDES :V
            divStatsPJ.appendChild(document.createTextNode("Atributo Principal: Fuerza"));
            divStatsPJ.appendChild(document.createElement("br"));

        break;

        case "agi":
            divStatsPJ.style.backgroundColor = "green";
            divStatsPJ.appendChild(document.createTextNode("Atributo Principal: Agilidad"));
            divStatsPJ.appendChild(document.createElement("br"));

        break

        case "int":
            divStatsPJ.style.backgroundColor = "blue";
            divStatsPJ.appendChild(document.createTextNode("Atributo Principal: Inteligencia"));
            divStatsPJ.appendChild(document.createElement("br"));

        break;
    }

    // NOTA: NO ME FUNCO LA FORMA DE {} PARA CONCATENAR, DEBO SER NOOB....
    divStatsPJ.appendChild(document.createTextNode("Fuerza base: " + base_str + " + " + str_gain + " por level."));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Agilidad base: " + base_agi + " + " + agi_gain + " por level."));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Inteligencia base: " + base_int + " + " + int_gain + " por level."));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Tipo de ataque: " + attack_type));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Velocidad de ataque: " + attack_rate));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Velocidad de movimiento: " + move_speed));
    divStatsPJ.appendChild(document.createElement("br"));

    divStatsPJ.appendChild(document.createTextNode("Roles atribuidos: "));

    //recorre el objeto y dibuja los roles que se le atribuye al pj
    for (let i = 0; i < role.length; i++) {

        divStatsPJ.appendChild(document.createElement("br"));
        divStatsPJ.appendChild(document.createTextNode(role[i]));
        
    }
      
}

///---------------------------ZONA DE PARTIDAS LIVE------------------------------------------

// 10/5 LA API RESPONDE MUY LENTO. VERIFICADO POR FUERA DEL SCRIP/ ES TEMP DE TORNEOS DEBE ESTAR SOBRECARGADA(?
function findLiveHero(objLiveData) {

    var request = new XMLHttpRequest();    
    
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            let objLive = JSON.parse(request.responseText);
            
            objLiveData(objLive);       
           
        } 
    }

    request.open("GET","https://api.opendota.com/api/live");
    request.send();
    
}


//-------------------------- SECCION DE JUGADORES PROFESIONALES EN PARTIDA PUBLICAS---------------------------------------
///*  DATOS A MOSTRAR(por el momento): NOMBRE JUGADOR PRO (USAR ID-PRO PARA ENLAZAR OTRO AJAX) Y CUANTAS PERSONAS NO PRO LO ESTAN USANDO 

function finderProInGame(objLiveData, refId){

    prosUsingInGame.innerHTML = " ";                //se limpia el elemento

    usingInGame.appendChild(document.createTextNode("Pros en este momento: "))  ;  
    usingInGame.appendChild(document.createElement("br"));
    
    let normies = 0;
    //se recorre el objLiveData        
    for(i = 0; i < objLiveData.length; i ++){
 
        for(j = 0; j < objLiveData[i].players.length; j ++){
           
            if(objLiveData[i].players[j].hero_id == refId && objLiveData[i].players[j].is_pro == true){
                                
                // se rellena con la data de la partida (enlazar otro ajax), derechito al doom :v 
                // se deberia hacer otra funcion(imperativo p/ mejor control de los datos) que dibuje los datos al doom (? 
                usingInGame.appendChild(document.createTextNode((objLiveData[i].players[j].name)))  ;  
                usingInGame.appendChild(document.createElement("br"));
                         
            }        
            if(objLiveData[i].players[j].hero_id == refId && objLiveData[i].players[j].is_pro != true){
                        
               normies ++;
                //para encontrar el name necesitamos otro ajax y posterior una funcion que realice una verificacion por medio de ACCOUNT_ID
                // O EN SU DEFECTO UN CONTADOR Y MOSTRAR LA CANTIDAD DE PERSONAS QUE ESTAN JUGANDO ESE PJ EN ESE MOMENTO
                
            }               
        }                
    }

    usingInGame.appendChild(document.createTextNode("Jugadores usandolo: "+ normies ))  ;  
    usingInGame.appendChild(document.createElement("br"));

}

//-----------------------  IMPLEMENTAR PARTIDAS PROFESIONALES----------------------
//MISMO QUE LO ANTERIOR QUE RETORNE: TORNEO QUE SE ESTA JUGANDO, DATOS DEL TEAM COMPLETO, PARTIDAS JUGADAS, GANADAS Y PORCENTAJE DE VICTORIA


