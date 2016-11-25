const Creature = require('./Creature.js')
const fs = require('fs')
const settings = require('./config.js')
const getRandomInt = require('./utils.js').getRandomInt

function init() {
    setStage(function(){})
}

function setStage(cb) {
    let creatures = []
    let i = 0
    let l = settings.creatureCount

    for( ; i < l; i += 1 ){
        let monitor = document.querySelector('#monitor')
        let creature = new Creature({
            onClick: function(e, creature) {
                monitor.innerHTML = '<ul>'
                for(let prop in creature) {
                    if( creature.hasOwnProperty( prop ) ) {
                        monitor.innerHTML += '<li>creature.' + prop + ' = ' + creature[prop] + '</li>';
                    }
                }
                monitor.innerHTML += '</ul>'
            }
        })
        creature.birth()
    }
    cb()
}

init();
