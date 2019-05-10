const express = require('express');
const app = express();
const path = require("path");


// Ubicación de recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// GET /
app.get('/', (req, res) => {
  // Devuelve archivo index.html
  let pathIndex = path.join(__dirname, '../client/index.html');
  res.sendFile(pathIndex);
});  


// Inicio del servidor en puerto 5000
app.listen(5000, function () {
  console.log('Escuchando puerto 5000 con Express');
});