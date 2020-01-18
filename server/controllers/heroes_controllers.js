const express = reequiere("express");
const app= express();
const path = require("path");
// const fetch = require ("node-fetch");
const fs = require("fs");

var heroes = fs.readFileSync("../client/data/spanish/heroes.json");

/// ubicación de recursos estaticos
app.use(express.static(path.join(__dirname, "../client")));

///GET
app.get("/", (req, res) =>{
    //devuelve archivo index
    let pathIndex = patch.join(__dirname, "../client/index.html");
    res.sendFile(pathIndex);
});

app.get("/heroes", (req, res)=>{
    console.log("se hizo la consulta")
    let heroes= JSON.parse(heroesjson);
    let result = heroes.filter(heroe => heroe.name == "Tinker")
    console.log(result);

    res.send(result);
});

//Inicio del servidor
app.listen(5000, function(){
    console.log("Escuchando puerto 5000 con Express");
});
