var Creature = function(type) {
    this.id = Math.floor(Math.random() * 10000000)
    this.type = type
    this.body = '<div id="' + this.id + '">O</div>'
    this.element = undefined
};
Creature.prototype.setElement = function(elem) {
    this.element = elem
}
Creature.prototype.move = function(x, y) {

}
Creature.prototype.behavior = function() {

}

module.exports = Creature;
