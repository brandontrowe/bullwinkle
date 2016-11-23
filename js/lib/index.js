const Creature = require('./creature.js')
const fs = require('fs')
const settings = require('./config.js')
console.log(settings)

function init() {
    gatherCreatures(function(creatures){

        console.log(creatures[0].element)

    });
}

function setStage(cb) {
    let creatures = []
    let i = 0
    let l = settings.creatureCount

    for( ; i < l; i += 1 ){
        let creature = new Creature()
        stage.innerHTML += creature.body;
        create.setElement(stage.getElementById(creature.id)
        creatures.push(creature)
    }
    cb(creatures)
}

init();
