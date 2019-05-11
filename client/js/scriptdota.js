let divImgsAllPJs = document.getElementById("divImgAllPJ");   //se cargan las imagenes de los pj
let divGeneralPJ = document.getElementById("divGeneralPJ");    // se dibuja el nombre pj al dom 

let divImgPJ = document.getElementById("divImgPJ");
let divStatsPJ = document.getElementById("divStatsPJ");

let prosInGame = document.getElementById("prosInGame");
let prosUsingInGame = document.getElementById("usingInGame");



/*
var divImgsAllPJs = document.getElementById("divImgPJ");
var divContenedorListaPosts = document.getElementById("divContDatos");

var divImgsAllPJs = document.getElementById("divImgPJ");
var divContenedorListaPosts = document.getElementById("divContDatos");
*/
//---------------------------ARMAR / RUTEAR DIVS DE DATA Y DEMASES------------------

consultarDataGame(objDOTA => {

	renderImgPJ(objDOTA);

});

let rutabase = "https://api.opendota.com";
/*
  https://api.opendota.com/api/heroes
  https://api.opendota.com/api/heroStats  acá estan las imagenes

  example: https://api.opendota.com  ---->  /apps/dota2/images/heroes/antimage_full.png?

  https://api.opendota.com/api/proplayers

  https://api.opendota.com/api/live   encontrar la forma de implementarlo 

  
  https://api.opendota.com/api/proMatches        SE RELACIONA CON    ID_TEAMS    QUE     RADIANT O DIRE  Y SE SACA EL NOMBRE DEL EVENTO
  
  https://api.opendota.com/api/teams/   543897    /heroes   EL INT ES EL ID_TEAM

  https://api.opendota.com/api/teams

 
*/



function consultarDataGame(cbGeneralDataGame) {

    var request = new XMLHttpRequest();    
    
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            let objDOTA = JSON.parse(request.responseText);
            let objDOT = objDOTA.map(function(item){
                return {
                    id_hero: item

                }

            });
            console.log(objDOT);
            cbGeneralDataGame(objDOTA);       
            
        } 
    }

    request.open("GET","https://api.opendota.com/api/heroStats");
    request.send();

    console.log("Lista usuarios cargado como objeto(?");

}

// A PARTIR DE ACA TOMAR EJEMPLO

// arrPosts = arrRes.map(function(item)){//recibo un cb que recibe solo el primer parametro
//     return{
//         id: item id, 
//         titulo: item title, 
//         contenido: item.body;
//     }
// }

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
            
                finderProInGame(objLive);
            
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

    // NO OLVIDAR IMPLEMENTAR LAS IMAGENES ESTATICAS DE LA CARPETA STUFF CON LA IMAGEN DEL LOS ATRIBUTOS
    
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
    

    switch (attr_base) {
        case "str":
            divStatsPJ.style.backgroundColor = "red"; /// TODO(? CHANGE COLOR BACKGR POR TONOS LINDOS :V
            
        break;
        case "agi":
            divStatsPJ.style.backgroundColor = "green";
        
        break
        case "int":
            divStatsPJ.style.backgroundColor = "blue";
        
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

    console.log("INFORMACION LISTA PARA DIBUJAR EN EL DOM", refId, (rutabase+img), namePJ, id_hero);
    
}

///---------------------------ZONA DE PARTIDAS LIVE------------------------------------------

function findLiveHero(cbLive) {

    var request = new XMLHttpRequest();    
    
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            let objLive = JSON.parse(request.responseText);

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
        
    let cantidad = 0;

    usingInGame.appendChild(document.createTextNode("Pro Players: "))  ;  
    usingInGame.appendChild(document.createElement("br"));
    
    for(i = 0; i < cbLive.length; i ++){
 
        for(j = 0; j < cbLive[i].players.length; j ++){

            if(cbLive[i].players[j].hero_id == refId && cbLive[i].players[j].is_pro == true){
                                  
                // SE RELLENA CON LA DATA DE LA PARTIDA (enlazar otro ajax) DERECHO AL DOM
                // SE DEBERIA HACER OTRA FUNCION QUE DIBUJE LOS DATOS AL DOOOOOOOOMM (?  talves cuando se enlacen más datos.
                usingInGame.appendChild(document.createTextNode((cbLive[i].players[j].name)))  ;  
                usingInGame.appendChild(document.createElement("br"));
         
            }        
            if(cbLive[i].players[j].hero_id == refId && cbLive[i].players[j].is_pro != true){
                        
               cantidad ++;
                // PARA ENCONTRAR EL NAME NECESITAMOS OTRO AJAX Y POSTERIOR UNA FUNCION QUE HAGA UNA VERIFICACION POR MEDIO DE ACCOUNT_ID
                // O EN SU DEFECTO UN CONTADOR Y MOSTRAR LA CANTIDAD DE PERSONAS QUE ESTAN JUGANDO ESE PJ EN ESE MOMENTO
                // S  A  M  E
            }               
        }                
    }

    usingInGame.appendChild(document.createTextNode("Jugadores usandolo: " + cantidad))  ;  
    usingInGame.appendChild(document.createElement("br"));
    console.log( "En partida: ", cantidad);


}

//-----------------------  IMPLEMENTAR PARTIDAS PROFESIONALES----------------------
// LO MISMO QUE LO ANTERIOR QUE RETORNE: TORNEO QUE SE ESTA JUGANDO, DATOS DEL TEAM COMPLETO, PARTIDAS JUGADAS, GANADAS Y PORCENTAJE DE VICTORIA




