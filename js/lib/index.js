const Creature = require('./Creature.js')
const fs = require('fs')
const settings = require('./config.js')
const getRandomInt = require('./utils.js').getRandomInt

function init() {
    setStage(function(){
        initEventListeners()
    })
}

function setStage(cb) {
    let creatures = []
    let i = 0
    let l = settings.creatureCount

    for( ; i < l; i += 1 ){
        let creature = new Creature()
        creature.birth()
    }
    cb()
}

function initEventListeners() {
    var creatureElems = document.getElementsByClassName('creature')
    let i = 0
    let l = creatureElems.length
    for ( ; i < l; i += 1 ) {
        creatureElems[i].addEventListener('click', function(e) {
            e.preventDefault()
            loadStats(this.getAttribute('id'))
        })
    }

}

function loadStats(creature_id) {
    console.log();
    document.getElementById('monitor')
}

init();
