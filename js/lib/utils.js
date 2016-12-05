const settings = require('./config.js')
const Matter = require('matter-js')

module.exports = {
    getRandom: function(min, max, round) {
        let rand
        round = round || true
        min = Math.ceil(min)
        max = Math.floor(max)
        rand = (Math.random() * (max - min)) + min
        if(round) rand = Math.round(rand)
        return rand
    },
    boundary: function(num, axis) {
        if (num < 0) return 0
        if (axis == 'x' && num > settings.stageWidth) return settings.stageWidth
        if (axis == 'y' && num > settings.stageHeight) return settings.stageHeight
        return num
    }
}
