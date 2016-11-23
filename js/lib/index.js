const Creature = require('./creature.js')
const fs = require('fs')
const settings = require('./config.js')
console.log(settings)

function init() {
    gatherCreatures(function(creatures){

        looseCreatures(creatures);
    });
}

function gatherCreatures(cb) {
    let creatures = []
    let i = 0
    let l = settings.creatureCount

    for( ; i < l; i += 1 ){
        creatures.push(new Creature())
    }
    cb(creatures)
}

function looseCreatures(creatures) {
    let i = 0
    let l = creatures.length
    for ( ; i < l; i += 1 ) {
        stage.innerHTML += creatures[i].body
        console.log(creatures[i].body)
    }
}

init();
