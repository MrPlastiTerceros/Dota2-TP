let divImgsAllPJs = document.getElementById("divImgAllPJ");   //se cargan las imagenes de los pj
let divGeneralPJ = document.getElementById("divGeneralPJ");    // se dibuja el nombre pj al dom 

let divImgPJ = document.getElementById("divImgPJ");
let divStatsPJ = document.getElementById("divStatsPJ");

let prosInGame = document.getElementById("prosInGame");
let prosUsingInGame = document.getElementById("usingInGame");


//---------------------------ARMAR / RUTEAR DIVS DE DATA Y DEMASES------------------

consultarDataGame(objDOTA => {

	renderImgPJ(objDOTA);

});

let rutabase = "https://api.opendota.com";      
// RAIZ DE IMG    EXAMPLE: https://api.opendota.com --> /apps/dota2/images/heroes/antimage_full.png?


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

function consultarDataGame(cbGeneralDataGame) {

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
            cbGeneralDataGame(objDOTA);       
            
        } 
    }

    request.open("GET","https://api.opendota.com/api/heroStats");
    request.send();

    console.log("Lista usuarios cargado como objeto(?");

}


function renderImgPJ(cbGeneralDataGame) {
    
    for (let i = 0; i < cbGeneralDataGame.length; i ++) {
        
        let renderPJ = document.createElement("img");

        renderPJ.setAttribute("class", "img_dota");
        renderPJ.setAttribute("src",  (rutabase + (cbGeneralDataGame[i].img)));

        divImgsAllPJs.appendChild(renderPJ);
     

        renderPJ.addEventListener("click", function(){

            let refId = i;
            
            verDatosPJ(cbGeneralDataGame, refId);

            findLiveHero(objLive => {
            
                finderProInGame(objLive, refId);
            
            })
        })

    }
    console.log("Querías Botones, ahí tenes!! Pero con imagenes");
}


function verDatosPJ(cbGeneralDataGame, refId){

    divGeneralPJ.innerHTML = "";                                    //LIMPIA VISTA
    divImgPJ.innerHTML = "";
    divStatsPJ.innerHTML = "";

    let id_hero = cbGeneralDataGame[refId].id;
    let namePJ = cbGeneralDataGame[refId].localized_name;           //NOMBRE PJ 

    let img = cbGeneralDataGame[refId].img;                         //LINK IMG

    let attr_base = cbGeneralDataGame[refId].primary_attr;          //ATRIBUTO PJ
    
    let attack_type = cbGeneralDataGame[refId].attack_type;         //TIPO DE ATAQUE
    let role = cbGeneralDataGame[refId].roles;                      //ROL QUE DESEMPEÑA 

    let icon = cbGeneralDataGame[refId].icon;                       //ICONO PJ MIN    PARA ILUSTRAR(?

    // NO OLVIDAR IMPLEMENTAR LAS ESTATICAS DE LA CARPETA STUFF CON LA IMAGEN DEL LOS ATRIBUTOS
    
    let base_str = cbGeneralDataGame[refId].base_str;               //BASE STR
    let base_agi = cbGeneralDataGame[refId].base_agi;               //BASE AGI
    let base_int = cbGeneralDataGame[refId].base_int;               //BASE INT

    let str_gain = cbGeneralDataGame[refId].str_gain;               //STR GAIN
    let agi_gain = cbGeneralDataGame[refId].agi_gain;               //AGI GAIN
    let int_gain = cbGeneralDataGame[refId].int_gain;               //INT GAIN


    let attack_rate = cbGeneralDataGame[refId].attack_rate;         //TIEMPO DE ATAQUE
    let move_speed = cbGeneralDataGame[refId].move_speed;           //VEL MOV BASE
         

    divGeneralPJ.appendChild(document.createTextNode(namePJ));
    
    let render = document.createElement("img");
    render.setAttribute("class", "imgSize");
    render.setAttribute("src", (rutabase+img));
    divImgPJ.appendChild(render);   
    
    // PISA EL COLOR
    switch (attr_base) {
        case "str":
            divStatsPJ.style.backgroundColor = "red"; /// ALL SW(? CHANGE COLOR BACKGR POR TONOS ACORDES :V
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

    for (let i = 0; i < role.length; i++) {

        divStatsPJ.appendChild(document.createElement("br"));
        divStatsPJ.appendChild(document.createTextNode(role[i]));
        console.log(role[i]);
        
    }

    console.log("INFORMACION LISTA PARA DIBUJAR EN EL DOM", refId,  namePJ, "id hero"+ id_hero);
    
}

///---------------------------ZONA DE PARTIDAS LIVE------------------------------------------


// 10/5 LA API RESPONDE MUY LENTO. VERIFICADO POR FUERA DEL SCRIP/ ES TEMP DE TORNEOS DEBE ESTAR SOBRECARGADA(?
function findLiveHero(cbLive) {

    var request = new XMLHttpRequest();    
    
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            let objLive = JSON.parse(request.responseText);
            console.log(objLive);
            cbLive(objLive);       
           
        } 
    }

    request.open("GET","https://api.opendota.com/api/live");
    request.send();

    console.log("Lista LIVE OK!!, ");

}


//-------------------------- SECCION DE JUGADORES PROFESIONALES EN PARTIDA PUBLICAS---------------------------------------
///*  DATOS A MOSTRAR(por el momento): NOMBRE JUGADOR PRO (USAR ID-PRO PARA ENLAZAR OTRO AJAX) Y CUANTAS PERSONAS NO PRO LO ESTAN USANDO 

function finderProInGame(cbLive, refId){

    prosUsingInGame.innerHTML = " ";

    usingInGame.appendChild(document.createTextNode("Pros en este momento: "))  ;  
    usingInGame.appendChild(document.createElement("br"));
    
    let normies = 0;
    
        
    for(i = 0; i < cbLive.length; i ++){
 
        for(j = 0; j < cbLive[i].players.length; j ++){
           
            if(cbLive[i].players[j].hero_id == refId && cbLive[i].players[j].is_pro == true){
                                
                // SE RELLENA CON LA DATA DE LA PARTIDA (enlazar otro ajax) DERECHO AL DOM
                // SE DEBERIA HACER OTRA FUNCION(imperativo p/ mejor control de los datos) QUE DIBUJE LOS DATOS AL DOOMM (? 
                usingInGame.appendChild(document.createTextNode((cbLive[i].players[j].name)))  ;  
                usingInGame.appendChild(document.createElement("br"));
                         
            }        
            if(cbLive[i].players[j].hero_id == refId && cbLive[i].players[j].is_pro != true){
                        
               normies ++;
                // PARA ENCONTRAR EL NAME NECESITAMOS OTRO AJAX Y POSTERIOR UNA FUNCION QUE HAGA UNA VERIFICACION POR MEDIO DE ACCOUNT_ID
                // O EN SU DEFECTO UN CONTADOR Y MOSTRAR LA CANTIDAD DE PERSONAS QUE ESTAN JUGANDO ESE PJ EN ESE MOMENTO
                // S  A  M  E
            }               
        }                
    }

    usingInGame.appendChild(document.createTextNode("Jugadores usandolo: "+ normies ))  ;  
    usingInGame.appendChild(document.createElement("br"));
    
    console.log( "En partida: ", normies);


}

//-----------------------  IMPLEMENTAR PARTIDAS PROFESIONALES----------------------
// LO MISMO QUE LO ANTERIOR QUE RETORNE: TORNEO QUE SE ESTA JUGANDO, DATOS DEL TEAM COMPLETO, PARTIDAS JUGADAS, GANADAS Y PORCENTAJE DE VICTORIA




