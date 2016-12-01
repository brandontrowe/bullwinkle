const config = require('./config.js')
const getRandomInt = require('./utils.js').getRandomInt
const _defaults = require('lodash/fp/defaultsDeep')
const Matter = require('matter-js')
// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies

const Stage = function(options) {
    const self = this
    const defaults = {
        elem: document.querySelector(config.stage.id),
        background: '#cccccc'
    }
    const settings = _defaults(defaults, options)

    // create an engine
    self.engine = Engine.create();
    // create a renderer
    self.render = Render.create({
        options: {
            width: config.stage.width,
            height: config.stage.height,
            background: settings.background
        },
        canvas: settings.elem,
        engine: self.engine
    });

    // Set world options
    self.engine.world.gravity.scale = 0;
    self.engine.world.gravity.y = 0;
    self.engine.world.gravity.x = 0;
    self.engine.world.bounds = self.render.bounds

}

module.exports = Stage
