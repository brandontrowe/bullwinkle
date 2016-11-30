const Creature = require('./Creature.js')
const fs = require('fs')
const settings = require('./config.js')
const getRandomInt = require('./utils.js').getRandomInt




const Matter = require('matter-js')
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
// create stage element
var stage = document.querySelector(settings.stage);
// create a renderer
var render = Render.create({
    options: {
        width: settings.stageWidth,
        height: settings.stageHeight,
        background: '#cccccc'
    },
    canvas: stage,
    engine: engine
});

// create creatures
let creatures = []
let i = 0
let l = settings.creatureCount

for( ; i < l; i += 1 ){
    var creature = new Creature({
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

// Set world options
engine.world.gravity.scale = 0;
engine.world.gravity.y = 0;
engine.world.gravity.x = 0;
engine.world.bounds = render.bounds

// add all of the bodies to the world
World.add(engine.world, creatures);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);



function init() {
    //setStage(function(){})
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
