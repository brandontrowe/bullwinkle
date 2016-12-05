const getRandom = require('./utils.js').getRandom
const boundary = require('./utils.js').boundary
const _defaults = require('lodash/fp/defaultsDeep')
const config = require('./config.js')
const Matter = require('matter-js')
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
window.Body = Body
const Events = Matter.Events
const Composites = Matter.Composites
const MouseConstraint = Matter.MouseConstraint


const Creature = function(options) {
    const self = this

    let energyMax = getRandom(50, 200)
    let lifeIntervalID
    let decisionIntervalID

    const defaults = {
        stage: null,
        id: 'creature_' + getRandom(1000, 9999, true),
        state: 'awake',
        age: getRandom(0, 40),
        lifespan: getRandom(60, 100),
        location: {
            x: getRandom(0, config.stage.width),
            y: getRandom(0, config.stage.height)
        },
        strength: getRandom(0, 10),
        speed: getRandom(0, 0, false),
        energy: {
            max: energyMax,
            min: 20,
            current: getRandom(0, energyMax)
        },
        vision: {
            hasVision: true,
            acuity: getRandom(0, 10)
        }
    }
    const settings = _defaults(defaults, options)
    console.log('settings', settings)

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
        Body.setVelocity(self.body, { x: getRandom(-settings.speed, settings.speed), y: getRandom(-settings.speed, settings.speed) }) // moves relative to current position
        //self.body.angle = self.body.angularVelocity

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

            x = boundary( x += getRandom(-4, 4), 'x' )
            y = boundary( y += getRandom(-4, 4), 'y' )
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
            self.age += 0.01
        }
    }

    /* Events */
    /* ------ */
    self.onClick = options.onClick || function(e) { console.log(e) }


    function init() {
        lifeIntervalID = window.setInterval(self.lifeloop, 1000)
        decisionIntervalID = window.setInterval(self.decisionloop, getRandom(200, 400))

        initEvents()
    }

    function initEvents() {
        // TODO: implement MouseContraint

        //Events.on(self.mouseConstraint, 'mousedown', function(e) {
        //     console.log(e)
        //})
    }

    function createBody() {
        let size = 20//getRandom(5, 15)
        // let parts = [
            return Bodies.rectangle(200, 200, size, size, {angle: 0.01}) //self.location.x, self.location.y,
        //     Bodies.polygon(self.location.x, self.location.y - size, 3, size - 4, {angle: -1})
        // ]
        //
        // return Body.create({
        //     parts: parts
        // });
    }

    init()

};


module.exports = Creature
