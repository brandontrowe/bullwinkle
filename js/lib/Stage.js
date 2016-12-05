const config = require('./config.js')
const getRandom = require('./utils.js').getRandom
const _defaults = require('lodash/fp/defaultsDeep')
const Matter = require('matter-js')
// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const MouseConstraint = Matter.MouseConstraint

const Stage = function(options) {
    const self = this
    const defaults = {
        elem: document.querySelector(config.stage.id),
        background: '#cccccc',
        gravity: {
            scale: 0,
            x: 0,
            y: 0
        }
    }
    const settings = _defaults(defaults, options)

    // create an engine
    self.engine = Engine.create()

    // create a renderer
    self.render = Render.create({
        options: {
            wireframes: false,
            width: config.stage.width,
            height: config.stage.height,
            background: settings.background,
            showAngleIndicator: true
        },
        canvas: settings.elem,
        engine: self.engine
    })

    // Set world options
    self.engine.world.gravity.scale = settings.gravity.scale
    self.engine.world.gravity.x = settings.gravity.x
    self.engine.world.gravity.y = settings.gravity.y
    self.engine.world.bounds = self.render.bounds

    self.updateMouseConstraint = function(bodies) {
        self.mouseConstraint = MouseConstraint.create(self.engine, {
            element:self.render.canvas,
            body: bodies
        })
        return self.mouseConstraint
    }

}

module.exports = Stage
