const Creature = require('./Creature.js')
const Stage = require('./Stage.js')
const config = require('./config.js')
const _defaults = require('lodash/fp/defaultsDeep')
const Matter = require('matter-js')
// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Events = Matter.Events
const MouseConstraint = Matter.MouseConstraint

const Game = function(options) {
    const self = this
    const defaults = {

    }
    const settings = _defaults(defaults, options)

    self.stage = new Stage()

    // create creatures
    self.creatures = []
    let i = 0
    let l = config.creatureCount

    for( ; i < l; i += 1 ){
        const creature = new Creature({
            stage: self.stage,
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
        self.creatures.push(creature.body)
    }

    // add all of the bodies to the world
    World.add(self.stage.engine.world, self.creatures);

    // Add all of the bodies to the mouseConstraint
    self.stage.mouseConstraint = self.stage.updateMouseConstraint(self.creatures)
    console.log(self.stage.mouseConstraint)
    Events.on(self.stage.mouseConstraint, 'mousedown', function(event) {
        console.log(event)
    })

    // run the engine
    Engine.run(self.stage.engine)

    // run the renderer
    Render.run(self.stage.render)

}

module.exports = Game
