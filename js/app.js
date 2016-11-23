(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    stage: document.getElementById('stage'),
    creatureCount: 20
};

},{}],2:[function(require,module,exports){
'use strict';

var Creature = function Creature(type) {
    this.id = Math.floor(Math.random() * 10000000);
    this.type = type;
    this.body = '<div id="' + this.id + '">O</div>';
};

Creature.prototype.move = function (x, y) {};
Creature.prototype.say = function (msg) {
    console.log(msg);
};

module.exports = Creature;

},{}],3:[function(require,module,exports){
'use strict';

var Creature = require('./creature.js');
var fs = require('fs');
var settings = require('./config.js');
console.log(settings);

function init() {
    gatherCreatures(function (creatures) {

        looseCreatures(creatures);
    });
}

function gatherCreatures(cb) {
    var creatures = [];
    var i = 0;
    var l = settings.creatureCount;

    for (; i < l; i += 1) {
        creatures.push(new Creature());
    }
    cb(creatures);
}

function looseCreatures(creatures) {
    var i = 0;
    var l = creatures.length;
    for (; i < l; i += 1) {
        stage.innerHTML += creatures[i].body;
        console.log(creatures[i].body);
    }
}

init();

},{"./config.js":1,"./creature.js":2,"fs":4}],4:[function(require,module,exports){

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcbGliXFxjb25maWcuanMiLCJqc1xcbGliXFxjcmVhdHVyZS5qcyIsImpzXFxsaWJcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FETTtBQUViLG1CQUFlO0FBRkYsQ0FBakI7Ozs7O0FDQUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFTLElBQVQsRUFBZTtBQUMxQixTQUFLLEVBQUwsR0FBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsUUFBM0IsQ0FBVjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxjQUFjLEtBQUssRUFBbkIsR0FBd0IsV0FBcEM7QUFDSCxDQUpEOztBQU1BLFNBQVMsU0FBVCxDQUFtQixJQUFuQixHQUEwQixVQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FFeEMsQ0FGRDtBQUdBLFNBQVMsU0FBVCxDQUFtQixHQUFuQixHQUF5QixVQUFTLEdBQVQsRUFBYztBQUNuQyxZQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0gsQ0FGRDs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsUUFBakI7Ozs7O0FDYkEsSUFBTSxXQUFXLFFBQVEsZUFBUixDQUFqQjtBQUNBLElBQU0sS0FBSyxRQUFRLElBQVIsQ0FBWDtBQUNBLElBQU0sV0FBVyxRQUFRLGFBQVIsQ0FBakI7QUFDQSxRQUFRLEdBQVIsQ0FBWSxRQUFaOztBQUVBLFNBQVMsSUFBVCxHQUFnQjtBQUNaLG9CQUFnQixVQUFTLFNBQVQsRUFBbUI7O0FBRS9CLHVCQUFlLFNBQWY7QUFDSCxLQUhEO0FBSUg7O0FBRUQsU0FBUyxlQUFULENBQXlCLEVBQXpCLEVBQTZCO0FBQ3pCLFFBQUksWUFBWSxFQUFoQjtBQUNBLFFBQUksSUFBSSxDQUFSO0FBQ0EsUUFBSSxJQUFJLFNBQVMsYUFBakI7O0FBRUEsV0FBTyxJQUFJLENBQVgsRUFBYyxLQUFLLENBQW5CLEVBQXNCO0FBQ2xCLGtCQUFVLElBQVYsQ0FBZSxJQUFJLFFBQUosRUFBZjtBQUNIO0FBQ0QsT0FBRyxTQUFIO0FBQ0g7O0FBRUQsU0FBUyxjQUFULENBQXdCLFNBQXhCLEVBQW1DO0FBQy9CLFFBQUksSUFBSSxDQUFSO0FBQ0EsUUFBSSxJQUFJLFVBQVUsTUFBbEI7QUFDQSxXQUFRLElBQUksQ0FBWixFQUFlLEtBQUssQ0FBcEIsRUFBd0I7QUFDcEIsY0FBTSxTQUFOLElBQW1CLFVBQVUsQ0FBVixFQUFhLElBQWhDO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLFVBQVUsQ0FBVixFQUFhLElBQXpCO0FBQ0g7QUFDSjs7QUFFRDs7O0FDaENBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgc3RhZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFnZScpLFxyXG4gICAgY3JlYXR1cmVDb3VudDogMjBcclxufVxyXG4iLCJ2YXIgQ3JlYXR1cmUgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDApXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlXHJcbiAgICB0aGlzLmJvZHkgPSAnPGRpdiBpZD1cIicgKyB0aGlzLmlkICsgJ1wiPk88L2Rpdj4nXHJcbn07XHJcblxyXG5DcmVhdHVyZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIFxyXG59XHJcbkNyZWF0dXJlLnByb3RvdHlwZS5zYXkgPSBmdW5jdGlvbihtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3JlYXR1cmU7XHJcbiIsImNvbnN0IENyZWF0dXJlID0gcmVxdWlyZSgnLi9jcmVhdHVyZS5qcycpXHJcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxyXG5jb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vY29uZmlnLmpzJylcclxuY29uc29sZS5sb2coc2V0dGluZ3MpXHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgZ2F0aGVyQ3JlYXR1cmVzKGZ1bmN0aW9uKGNyZWF0dXJlcyl7XHJcblxyXG4gICAgICAgIGxvb3NlQ3JlYXR1cmVzKGNyZWF0dXJlcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2F0aGVyQ3JlYXR1cmVzKGNiKSB7XHJcbiAgICBsZXQgY3JlYXR1cmVzID0gW11cclxuICAgIGxldCBpID0gMFxyXG4gICAgbGV0IGwgPSBzZXR0aW5ncy5jcmVhdHVyZUNvdW50XHJcblxyXG4gICAgZm9yKCA7IGkgPCBsOyBpICs9IDEgKXtcclxuICAgICAgICBjcmVhdHVyZXMucHVzaChuZXcgQ3JlYXR1cmUoKSlcclxuICAgIH1cclxuICAgIGNiKGNyZWF0dXJlcylcclxufVxyXG5cclxuZnVuY3Rpb24gbG9vc2VDcmVhdHVyZXMoY3JlYXR1cmVzKSB7XHJcbiAgICBsZXQgaSA9IDBcclxuICAgIGxldCBsID0gY3JlYXR1cmVzLmxlbmd0aFxyXG4gICAgZm9yICggOyBpIDwgbDsgaSArPSAxICkge1xyXG4gICAgICAgIHN0YWdlLmlubmVySFRNTCArPSBjcmVhdHVyZXNbaV0uYm9keVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNyZWF0dXJlc1tpXS5ib2R5KVxyXG4gICAgfVxyXG59XHJcblxyXG5pbml0KCk7XHJcbiIsIiJdfQ==
