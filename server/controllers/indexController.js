const path = require("path");

function getIndexHero (req, res){
let pathIndex = path.join(__dirname, '../client/index.html');
res.sendFile(pathIndex);
}

module.exports ={
    getIndexHero : getIndexHero
}