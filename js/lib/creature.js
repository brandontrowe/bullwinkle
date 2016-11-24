const getRandomInt = require('./utils.js').getRandomInt
const boundary = require('./utils.js').boundary
const settings = require('./config.js')

var Creature = function(options) {
    const self = this;
    let lifeIntervalID;
    let decisionIntervalID;
    if(options == undefined) options = {}
    self.age = options.age || getRandomInt(0, 40)
    self.lifespan = options.lifespan || getRandomInt(60, 100)
    self.strength = options.strength || getRandomInt(0, 10)
    self.location = options.location || {
        x: getRandomInt(0, settings.stageWidth),
        y: getRandomInt(0, settings.stageHeight)
    }
    self.element = null
    self.id = options.id || 'creature_' + getRandomInt(1000, 9999)
    self.body = options.body || function(){
        return '<div id="' + self.id + '" class="creature" style="left:' + self.location.x + 'px; top:' + self.location.y + 'px"><img src="img/bug.png" /></div>'
    }
    self.move = function(x, y) {
        self.element = self.element || document.querySelector('#' + self.id)
        self.element.setAttribute('style', 'left:'+ x + 'px; top:' + y + 'px;')
        self.location.x = x
        self.location.y = y
    }
    self.behavior = {
        wander: function() {
            let x = self.location.x
            let y = self.location.y

            x = boundary( x += getRandomInt(-1, 2), 'x' )
            y = boundary( y += getRandomInt(-1, 2), 'y' )
            self.move(x, y)
        }
    }
    self.decisionloop = function() {
        // TODO: decision logic
        // for now, just wander
        self.behavior.wander()
    }
    self.birth = function() {
        settings.stage.innerHTML += self.body()
        lifeIntervalID = window.setInterval(self.lifeloop, 1000)
        decisionIntervalID = window.setInterval(self.decisionloop, 100)
    }
    self.death = function() {
        window.clearInterval(lifeIntervalID)
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

};


module.exports = Creature
