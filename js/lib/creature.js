const getRandomInt = require('./utils.js').getRandomInt
const boundary = require('./utils.js').boundary
const settings = require('./config.js')
const Matter = require('matter-js')
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Events = Matter.Events;


var Creature = function(options) {
    const self = this;
    let lifeIntervalID;
    let decisionIntervalID;
    let energyMax = getRandomInt(50, 200)
    if(options == undefined) options = {}

    function init() {
        initEvents()
        lifeIntervalID = window.setInterval(self.lifeloop, 1000)
        decisionIntervalID = window.setInterval(self.decisionloop, getRandomInt(200, 400))
    }
    self.state = 'awake'
    self.age = options.age || getRandomInt(0, 40)
    self.lifespan = options.lifespan || getRandomInt(60, 100)
    self.strength = options.strength || getRandomInt(0, 10)
    self.location = options.location || {
        x: getRandomInt(0, settings.stageWidth),
        y: getRandomInt(0, settings.stageHeight)
    }
    self.energy = {
        max: energyMax,
        min: 20,
        current: getRandomInt(0, energyMax)
    }
    self.element = null
    self.id = options.id || 'creature_' + getRandomInt(1000, 9999)

    self.body = createBody()
    self.move = function(x, y) {
        Body.setVelocity(self.body, { x: getRandomInt(-1, 2), y: getRandomInt(-1, 2) }) // moves relative to current position
        self.energy.current -= 5
        self.location.x = x
        self.location.y = y
    }
    self.behavior = {
        sleep: function() {
            self.state = 'asleep'
            self.energy.current += 15
        },
        wake: function() {
            self.state = 'awake'
        },
        wander: function() {
            let x = self.location.x
            let y = self.location.y

            x = boundary( x += getRandomInt(-4, 4), 'x' )
            y = boundary( y += getRandomInt(-4, 4), 'y' )
            self.move(x, y)
        }
    }
    self.decisionloop = function() {
        // TODO: decision logic
        // if (self.energy.current <= self.energy.min) {
        //     self.behavior.sleep()
        // } else if (self.state === 'asleep') {
        //     if (self.energy.current < self.energy.max) {
        //         self.behavior.sleep()
        //     } else {
        //         self.behavior.wake()
        //     }
        // } else {
            self.behavior.wander()
        // }
    }
    self.death = function() {
        window.clearInterval(lifeIntervalID)
        window.clearInterval(decisionIntervalID)
        document.querySelector('#' + self.id).remove()
    }
    self.lifeloop = function() {
        // life logic here
        // increment age
        // if(self.age >= self.lifespan) {
        //     self.death()
        // } else {
        //     self.age += 0.1
        //
        // }
    }
    self.onClick = options.onClick || function(e) { console.log(e) }
    function initEvents() {
        // TODO: implement MouseContraint
        //Events.on(self.body, 'click', function(e) {
        //    self.onClick(e, self)
        //})
    }
    function createBody() {
        let randShape = Math.round(getRandomInt(0, 2))
        let size = getRandomInt(1, 15)
        switch (randShape) {
            case 0: return Bodies.circle(self.location.x, self.location.y, size)
            case 1: return Bodies.rectangle(self.location.x, self.location.y, size, size)
        }

    }

    init()

};


module.exports = Creature
