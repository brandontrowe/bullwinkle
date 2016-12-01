const Creature = require('./Creature.js')
const Stage = require('./Stage.js')
const fs = require('fs')
const config = require('./config.js')
const getRandomInt = require('./utils.js').getRandomInt
const Matter = require('matter-js')
// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World

const stage = new Stage()

// create creatures
let creatures = []
let i = 0
let l = config.creatureCount

for( ; i < l; i += 1 ){
    const creature = new Creature({
        stage: stage,
        //location: {
        //    x: config.stage.width / 2,
        //    y: config.stage.height / 2
        //},
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
    creatures.push(creature.body)
}

// add all of the bodies to the world
World.add(stage.engine.world, creatures);

// run the engine
Engine.run(stage.engine);

// run the renderer
Render.run(stage.render);
