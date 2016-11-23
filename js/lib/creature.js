var Creature = function(type) {
    this.id = Math.floor(Math.random() * 10000000)
    this.type = type
    this.body = '<div id="' + this.id + '">O</div>'
};

Creature.prototype.move = function(x, y) {
    
}
Creature.prototype.say = function(msg) {
    console.log(msg);
}

module.exports = Creature;
