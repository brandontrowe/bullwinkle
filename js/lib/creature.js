const getRandomInt = require('./utils.js').getRandomInt
const boundary = require('./utils.js').boundary
const _defaults = require('lodash/fp/defaultsDeep')
const config = require('./config.js')
const Matter = require('matter-js')
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
const Events = Matter.Events
const Composites = Matter.Composites


const Creature = function(options) {
    const self = this

    let energyMax = getRandomInt(50, 200)
    let lifeIntervalID
    let decisionIntervalID

    const defaults = {
        stage: null,
        id: 'creature_' + getRandomInt(1000, 9999),
        state: 'awake',
        age: getRandomInt(0, 40),
        lifespan: getRandomInt(60, 100),
        location: {
            x: getRandomInt(0, config.stage.width),
            y: getRandomInt(0, config.stage.height)
        },
        strength: getRandomInt(0, 10),
        energy: {
            max: energyMax,
            min: 20,
            current: getRandomInt(0, energyMax)
        }
    }
    const settings = _defaults(defaults, options)

    /* Properties */
    /* ---------- */
    self.id = settings.id
    self.state = settings.state
    self.age = settings.age
    self.lifespan = settings.lifespan
    self.location = settings.location
    self.strength = settings.strength
    self.energy = settings.energy
    self.body = createBody()

    /* Methods */
    /* ------- */
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
        if (self.energy.current <= self.energy.min) {
            self.behavior.sleep()
        } else if (self.state === 'asleep') {
            if (self.energy.current < self.energy.max) {
                self.behavior.sleep()
            } else {
                self.behavior.wake()
            }
        } else {
            self.behavior.wander()
        }
    }
    self.death = function() {
        window.clearInterval(lifeIntervalID)
        window.clearInterval(decisionIntervalID)
        World.remove(settings.stage.engine.world, self.body)
    }
    self.lifeloop = function() {
        // lifespan logic here
        // TODO: add growth
        if(self.age >= self.lifespan) {
            self.death()
        } else {
            self.age += 0.1

        }
    }

    /* Events */
    /* ------ */
    self.onClick = options.onClick || function(e) { console.log(e) }


    function init() {
        initEvents()
        lifeIntervalID = window.setInterval(self.lifeloop, 1000)
        decisionIntervalID = window.setInterval(self.decisionloop, getRandomInt(200, 400))
    }

    function initEvents() {
        // TODO: implement MouseContraint
        //Events.on(self.body, 'click', function(e) {
        //    self.onClick(e, self)
        //})
    }

    function createBody() {
        let randShape = Math.round(getRandomInt(0, 2))
        let size = getRandomInt(1, 15)
        var particleOptions = {
            friction: 0.05,
            frictionStatic: 0.1,
            render: { visible: true }
        };
        //return Composites.softBody(250, 100, 5, 5, 0, 0, true, 18, particleOptions)
        switch (randShape) {
            case 0: return Bodies.circle(self.location.x, self.location.y, size)
            case 1: return Bodies.rectangle(self.location.x, self.location.y, size, size)
        }

    }

    init()

};


module.exports = Creature
