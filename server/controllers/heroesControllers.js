const fs = require("fs");

var heroesjson = fs.readFileSync("../client/data/spanish/heroes.json");

function getHistoryHero (req, res){
    var paramName= req.params.nombre;
    let heroes= JSON.parse(heroesjson);
    let result = heroes.filter(heroe => heroe.name == paramName)
    
    res.send(result[0]);
}

module.exports ={
    getHistoryHero : getHistoryHero
}