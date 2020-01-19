const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");//cada uno de los controladores
const IndexController = require("./controllers/indexController");
const HeroController = require("./controllers/heroesControllers");

// Ubicación de recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// GET /
app.get('/', IndexController.getIndexHero);  

app.get("/heroes/:nombre", HeroController.getHistoryHero);

// Inicio del servidor en puerto 5000
app.listen(5000, function () {
  console.log('Escuchando puerto 5000 con Express');
});