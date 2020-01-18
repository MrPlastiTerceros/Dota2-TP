
function consultarDataGame(callback){
    fetch("https://api.opendota.com/api/heroStats")
    .then(response => response.json())
    .then(response => callback(response))
}

function consultarHistoryAndAbilities(callback,heroName){
    fetch(`http://localhost:5000/heroes/${heroName}`)
    .then(response => response.json())
    .then(response => callback(response))
}

function findLiveHero(callback){
    fetch("https://api.opendota.com/api/live")
    .then(response => response.json())
    .then(response => callback(response))
}