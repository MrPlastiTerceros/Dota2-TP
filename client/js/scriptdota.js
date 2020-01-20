//div en el que se cargan las imagenes de los pj
let divImgsAllPJs = document.getElementById("divImgAllPJ");     
let divGeneralPJ = document.getElementById("divGeneralPJ");    
let divImgPJ = document.getElementById("divImgPJ");     
let divhistoryPJ = document.getElementById("divHistoryPJ");
let divAbilitiesPJ = document.getElementById("divAbilitiesPJ");
let divStatsPJ = document.getElementById("divStatsPJ");  
let divTalentsPJ = document.getElementById("divTalentsPJ");      
let prosUsingInGame = document.getElementById("usingInGame");   

//------------------------------------------------------------------------

consultarDataGame(objDOTA => {

	renderImgPJ(objDOTA);

});

// raiz de img    EXAMPLE: https://api.opendota.com --> /apps/dota2/images/heroes/antimage_full.png?
let rutabase = "https://api.opendota.com";      

// AGREGAR VALIDACIONES AJAX AUNQUE SE SABE QUE FU

function renderImgPJ(objData) {
    
    for (let i = 0; i < objData.length; i ++) {
        
        let renderPJ = document.createElement("img");

        renderPJ.setAttribute("class", "img_dota");
        renderPJ.setAttribute("id", objData[i].localized_name);
        renderPJ.setAttribute("src",  (rutabase + (objData[i].img)));

        divImgsAllPJs.appendChild(renderPJ);
     
        renderPJ.addEventListener("click", function(){
            let refId = i;
            verDatosPJ(objData, refId);
            consultarHistoryAndAbilities(verHistoryPJ,objData[i].localized_name);
            findLiveHero(objLive => finderProInGame(objLive, refId));
        })
    }
}    

function verHistoryPJ(objData2){

    divHistoryPJ.innerHTML = "";            //se limpia la vista del elemento
    if (objData2.bio == undefined) {

        divHistoryPJ.appendChild(document.createTextNode("Historia no dispinible"))  ;  
        divHistoryPJ.appendChild(document.createElement("br"));

    }else{ 
            
        divHistoryPJ.appendChild(document.createTextNode(objData2.bio))  ;  
        divHistoryPJ.appendChild(document.createElement("br"));

    }  
    let flag1 = objData2.abilities;
    let flag2 = objData2.talents;   
    verAbilities(flag1);
    verTalents(flag2);        
    
}

function verAbilities(flag1){

    divAbilitiesPJ.innerHTML = "";          //se limpia los elementos en la tabla
    
    let tabla   = document.createElement("table");
    let tblBody = document.createElement("tbody");
    
    //flag1 hace referencia a la posicion objData2.abilities que se lo pasa la funcion anterior
    for(let j = 0; j < flag1.length ; j ++){
        
        //posiciona las habilidades y sus caracteristicas en un intento de tabla
        let fila = document.createElement("tr");
        
        let imgAbilities = document.createElement("img");
        imgAbilities.setAttribute("class","abilitieSize"); 
        //declara la ruta del png de la habilidad   
        imgAbilities.setAttribute("src", "../stuff/abilities/"+flag1[j].tag+".png");
                
        let name = document.createTextNode(flag1[j].name);               
        let description = document.createTextNode(flag1[j].description);
        let cooldown = document.createTextNode("Cooldown(s): "+flag1[j].cooldown);
        let manacost = document.createTextNode("ManaCost: "+flag1[j].manacost);
        //indagar la forma de reemplazar los undefined sin que se repitan indiscriminadamente(podría hacer bocha de if´s o un if que verifique cada dato pero no es estetico(?))                   
        var columna1 = document.createElement("td");                                        
        columna1.appendChild(imgAbilities);
        var columna2 = document.createElement("td");                                        
        columna2.appendChild(name );
        var columna3 = document.createElement("td");                                        
        columna3.appendChild(description);
        var columna4 = document.createElement("td");                                                    
        columna4.appendChild(cooldown);
        var columna5 = document.createElement("td");                                        
        columna5.appendChild(manacost);
                  
        // todo esto me quemo la cabeza pero la tabla aparece... 
        fila.appendChild(columna1);
        fila.appendChild(columna2);
        fila.appendChild(columna3);
        fila.appendChild(columna4);
        fila.appendChild(columna5);
        
        tblBody.appendChild(fila);
       
    }    
    
    tabla.appendChild(tblBody);
        
    divAbilitiesPJ.appendChild(tabla);
    console.log("not again, commit is important");

}

function verTalents(flag2){
    divTalentsPJ.innerHTML = "";        //limpia el div 
    
    let talent= document.createTextNode("Talentos a elección:");
    divTalentsPJ.appendChild(talent);
    //recorre el objeto en talentos    
    for (let a = 0; a < flag2.length; a ++) {
        //toma el "nombre" del talento para mostralo 
        let ability = document.createTextNode(flag2[a].name);
        divTalentsPJ.appendChild(document.createElement("br"))      
        divTalentsPJ.appendChild(ability);
        
    }
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

            
    let render = document.createElement("img");
    render.setAttribute("class", "imgSize");
    render.setAttribute("src", (rutabase+img));
    divImgPJ.appendChild(render);   
 
    
    // se le asigna un background color de acuerdo al atributo primario y le agrega el icono del atributo al lado del nombre
    switch (attr_base) {
        case "str":
            let logostr = document.createElement("img");
            logostr.setAttribute("class","logoAtri");    
            logostr.setAttribute("src", "../stuff/hero_str.png");
            divGeneralPJ.appendChild(logostr);

            divStatsPJ.style.backgroundColor = "#D3423D"; 
            divStatsPJ.appendChild(document.createTextNode("Atributo Principal: Fuerza"));
            divStatsPJ.appendChild(document.createElement("br"));

        break;

        case "agi":
            let logoagi = document.createElement("img");
            logoagi.setAttribute("class","logoAtri");    
            logoagi.setAttribute("src", "../stuff/hero_agi.png");
            divGeneralPJ.appendChild(logoagi);

            divStatsPJ.style.backgroundColor = "#49B881";
            divStatsPJ.appendChild(document.createTextNode("Atributo Principal: Agilidad"));
            divStatsPJ.appendChild(document.createElement("br"));

        break

        case "int":
            let logoint = document.createElement("img");
            logoint.setAttribute("class","logoAtri");    
            logoint.setAttribute("src", "../stuff/hero_int.png");
            divGeneralPJ.appendChild(logoint);

            divStatsPJ.style.backgroundColor = "#3776A0";
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


//-------------------------- SECCION DE JUGADORES PROFESIONALES EN PARTIDA PUBLICAS---------------------------------------
///*  DATOS A MOSTRAR(por el momento): NOMBRE JUGADOR PRO (USAR ID-PRO PARA ENLAZAR OTRO AJAX) Y CUANTAS PERSONAS NO PRO LO ESTAN USANDO 

function finderProInGame(objLiveData, refId){

    prosUsingInGame.innerHTML = " ";                //se limpia el elemento

    usingInGame.appendChild(document.createTextNode("Pros en este momento: "))  ;  
    usingInGame.appendChild(document.createElement("br"));
    //variable como referencia de cantidad de jugadores
    let normies = 0;
    //se recorre el objLiveData        
    for(i = 0; i < objLiveData.length; i ++){
 
        for(j = 0; j < objLiveData[i].players.length; j ++){
           
            if(objLiveData[i].players[j].hero_id === refId && objLiveData[i].players[j].is_pro === true && objLiveData[i].players[j].team_name != undefined){
                                
                // se rellena con la data de la partida (enlazar otro ajax), derechito al doom :v 
                // se deberia hacer otra funcion(imperativo p/ mejor control de los datos) que dibuje los datos al doom (? 
                let pro = document.createTextNode((objLiveData[i].players[j].name) + " que pertenece al team: " + objLiveData[i].players[j].team_name);
                usingInGame.appendChild(pro);  
                usingInGame.appendChild(document.createElement("br"));
                         
            }        
            if(objLiveData[i].players[j].hero_id == refId && objLiveData[i].players[j].is_pro != true){
               //contador de jugadores usando ese PJ         
               normies ++;                            
                
            }               
        }                
    }

    usingInGame.appendChild(document.createTextNode("Jugadores usandolo: "+ normies ))  ;  
    usingInGame.appendChild(document.createElement("br"));

}

//-----------------------  IMPLEMENTAR PARTIDAS PROFESIONALES----------------------
//MISMO QUE LO ANTERIOR QUE RETORNE: TORNEO QUE SE ESTA JUGANDO, DATOS DEL TEAM COMPLETO, PARTIDAS JUGADAS, GANADAS Y PORCENTAJE DE VICTORIA

//Notas: la estetica quedo de lado, el json de objDOTA2 esta muy desprolijo, y lamento no haber "echo" commits cuando debía..
