const getRandomInt = require('./utils.js').getRandomInt
const boundary = require('./utils.js').boundary
const settings = require('./config.js')
const velocity = require('velocity-animate')
const SAT = require('sat')

var Creature = function(options) {
    const self = this;
    let lifeIntervalID;
    let decisionIntervalID;
    if(options == undefined) options = {}
    self.state = 'awake'
    self.age = options.age || getRandomInt(0, 40)
    self.lifespan = options.lifespan || getRandomInt(60, 100)
    self.strength = options.strength || getRandomInt(0, 10)
    self.location = options.location || {
        x: getRandomInt(0, settings.stageWidth),
        y: getRandomInt(0, settings.stageHeight)
    }
    self.energy = {
        max: getRandomInt(50, 200),
        min: 20,
        current: 50
    }
    self.element = null
    self.id = options.id || 'creature_' + getRandomInt(1000, 9999)

    self.body = createBody()
    self.move = function(x, y) {
        velocity(self.body,
        {
            left: x,
            top: y
        },
        { duration: 199 });
        self.energy.current -= 5
        self.location.x = x
        self.location.y = y
    }
    self.behavior = {
        sleep: function() {
            self.state = 'asleep'
            self.energy.current += 15
            document.querySelector('#' + self.id).innerHTML = 'Z'
        },
        wake: function() {
            self.state = 'awake'
            document.querySelector('#' + self.id).innerHTML = 'O'
        },
        wander: function() {
            let x = self.location.x
            let y = self.location.y

            x = boundary( x += getRandomInt(-4, 5), 'x' )
            y = boundary( y += getRandomInt(-4, 5), 'y' )
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
    self.birth = function() {
        document.querySelector(settings.stage).appendChild(self.body)
        initEvents()
        lifeIntervalID = window.setInterval(self.lifeloop, 1000)
        decisionIntervalID = window.setInterval(self.decisionloop, getRandomInt(200, 400))
    }
    self.death = function() {
        window.clearInterval(lifeIntervalID)
        window.clearInterval(decisionIntervalID)
        document.querySelector('#' + self.id).remove()
    }
    self.lifeloop = function() {
        // life logic here
        // increment age
        if(self.age >= self.lifespan) {
            self.death()
        } else {
            self.age += 0.1

        }
    }
    self.onClick = options.onClick || function(e) { console.log(e) }
    function initEvents() {
        self.body.addEventListener('click', function(e) {
            self.onClick(e, self)
        })
    }
    function createBody() {
        let body = document.createElement('div')
        body.setAttribute('id', self.id)
        body.setAttribute('class', 'creature')
        body.setAttribute('style', 'left:' + self.location.x + 'px; top:' + self.location.y + 'px;')
        body.innerHTML = 'O'

        return body
    }

};


module.exports = Creature
