const settings = require('./config.js')
module.exports = {
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    boundary: function(num, axis) {
        if (num < 0) return 0
        if (axis == 'x' && num > settings.stageWidth) return settings.stageWidth
        if (axis == 'y' && num > settings.stageHeight) return settings.stageHeight
        return num
    }
}
