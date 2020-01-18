const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

var heroesjson = fs.readFileSync("../client/data/spanish/heroes.json");

// Ubicación de recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// GET /
app.get('/', (req, res) => {
  // Devuelve archivo index.html
  let pathIndex = path.join(__dirname, '../client/index.html');
  res.sendFile(pathIndex);
});  

app.get("/heroes/:nombre", (req, res)=>{
  var paramName= req.params.nombre;
  let heroes= JSON.parse(heroesjson);
  let result = heroes.filter(heroe => heroe.name == paramName)
  
  res.send(result[0]);
});



// Inicio del servidor en puerto 5000
app.listen(5000, function () {
  console.log('Escuchando puerto 5000 con Express');
});