(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var getRandomInt = require('./utils.js').getRandomInt;
var boundary = require('./utils.js').boundary;
var settings = require('./config.js');

var Creature = function Creature(options) {
    var self = this;
    var lifeIntervalID = void 0;
    var decisionIntervalID = void 0;
    if (options == undefined) options = {};
    self.age = options.age || getRandomInt(0, 40);
    self.lifespan = options.lifespan || getRandomInt(60, 100);
    self.strength = options.strength || getRandomInt(0, 10);
    self.location = options.location || {
        x: getRandomInt(0, settings.stageWidth),
        y: getRandomInt(0, settings.stageHeight)
    };
    self.element = null;
    self.id = options.id || 'creature_' + getRandomInt(1000, 9999);
    self.body = options.body || function () {
        return '<div id="' + self.id + '" class="creature" style="left:' + self.location.x + 'px; top:' + self.location.y + 'px"><img src="img/bug.png" /></div>';
    };
    self.move = function (x, y) {
        self.element = self.element || document.querySelector('#' + self.id);
        self.element.setAttribute('style', 'left:' + x + 'px; top:' + y + 'px;');
        self.location.x = x;
        self.location.y = y;
    };
    self.behavior = {
        wander: function wander() {
            var x = self.location.x;
            var y = self.location.y;

            x = boundary(x += getRandomInt(-1, 2), 'x');
            y = boundary(y += getRandomInt(-1, 2), 'y');
            self.move(x, y);
        }
    };
    self.decisionloop = function () {
        // TODO: decision logic
        // for now, just wander
        self.behavior.wander();
    };
    self.birth = function () {
        settings.stage.innerHTML += self.body();
        lifeIntervalID = window.setInterval(self.lifeloop, 1000);
        decisionIntervalID = window.setInterval(self.decisionloop, 100);
    };
    self.death = function () {
        window.clearInterval(lifeIntervalID);
        document.querySelector('#' + self.id).remove();
    };
    self.lifeloop = function () {
        // life logic here
        // increment age
        if (self.age >= self.lifespan) {
            self.death();
        } else {
            self.age += 0.1;
        }
    };
};

module.exports = Creature;

},{"./config.js":2,"./utils.js":4}],2:[function(require,module,exports){
'use strict';

module.exports = {
    stage: document.getElementById('stage'),
    creatureCount: 100,
    stageWidth: 700,
    stageHeight: 600
};

},{}],3:[function(require,module,exports){
'use strict';

var Creature = require('./Creature.js');
var fs = require('fs');
var settings = require('./config.js');
var getRandomInt = require('./utils.js').getRandomInt;

function init() {
    setStage(function () {
        initEventListeners();
    });
}

function setStage(cb) {
    var creatures = [];
    var i = 0;
    var l = settings.creatureCount;

    for (; i < l; i += 1) {
        var creature = new Creature();
        creature.birth();
    }
    cb();
}

function initEventListeners() {
    var creatureElems = document.getElementsByClassName('creature');
    var i = 0;
    var l = creatureElems.length;
    for (; i < l; i += 1) {
        creatureElems[i].addEventListener('click', function (e) {
            e.preventDefault();
            loadStats(this.getAttribute('id'));
        });
    }
}

function loadStats(creature_id) {
    console.log();
    document.getElementById('monitor');
}

init();

},{"./Creature.js":1,"./config.js":2,"./utils.js":4,"fs":5}],4:[function(require,module,exports){
'use strict';

var settings = require('./config.js');
module.exports = {
    getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    boundary: function boundary(num, axis) {
        if (num < 0) return 0;
        if (axis == 'x' && num > settings.stageWidth) return settings.stageWidth;
        if (axis == 'y' && num > settings.stageHeight) return settings.stageHeight;
        return num;
    }
};

},{"./config.js":2}],5:[function(require,module,exports){

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcbGliXFxDcmVhdHVyZS5qcyIsImpzXFxsaWJcXGNvbmZpZy5qcyIsImpzXFxsaWJcXGluZGV4LmpzIiwianNcXGxpYlxcdXRpbHMuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLGVBQWUsUUFBUSxZQUFSLEVBQXNCLFlBQTNDO0FBQ0EsSUFBTSxXQUFXLFFBQVEsWUFBUixFQUFzQixRQUF2QztBQUNBLElBQU0sV0FBVyxRQUFRLGFBQVIsQ0FBakI7O0FBRUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFTLE9BQVQsRUFBa0I7QUFDN0IsUUFBTSxPQUFPLElBQWI7QUFDQSxRQUFJLHVCQUFKO0FBQ0EsUUFBSSwyQkFBSjtBQUNBLFFBQUcsV0FBVyxTQUFkLEVBQXlCLFVBQVUsRUFBVjtBQUN6QixTQUFLLEdBQUwsR0FBVyxRQUFRLEdBQVIsSUFBZSxhQUFhLENBQWIsRUFBZ0IsRUFBaEIsQ0FBMUI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBUSxRQUFSLElBQW9CLGFBQWEsRUFBYixFQUFpQixHQUFqQixDQUFwQztBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFRLFFBQVIsSUFBb0IsYUFBYSxDQUFiLEVBQWdCLEVBQWhCLENBQXBDO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFFBQVEsUUFBUixJQUFvQjtBQUNoQyxXQUFHLGFBQWEsQ0FBYixFQUFnQixTQUFTLFVBQXpCLENBRDZCO0FBRWhDLFdBQUcsYUFBYSxDQUFiLEVBQWdCLFNBQVMsV0FBekI7QUFGNkIsS0FBcEM7QUFJQSxTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBSyxFQUFMLEdBQVUsUUFBUSxFQUFSLElBQWMsY0FBYyxhQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBdEM7QUFDQSxTQUFLLElBQUwsR0FBWSxRQUFRLElB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ZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKS5nZXRSYW5kb21JbnRcclxuY29uc3QgYm91bmRhcnkgPSByZXF1aXJlKCcuL3V0aWxzLmpzJykuYm91bmRhcnlcclxuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuL2NvbmZpZy5qcycpXHJcblxyXG52YXIgQ3JlYXR1cmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGxldCBsaWZlSW50ZXJ2YWxJRDtcclxuICAgIGxldCBkZWNpc2lvbkludGVydmFsSUQ7XHJcbiAgICBpZihvcHRpb25zID09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9XHJcbiAgICBzZWxmLmFnZSA9IG9wdGlvbnMuYWdlIHx8IGdldFJhbmRvbUludCgwLCA0MClcclxuICAgIHNlbGYubGlmZXNwYW4gPSBvcHRpb25zLmxpZmVzcGFuIHx8IGdldFJhbmRvbUludCg2MCwgMTAwKVxyXG4gICAgc2VsZi5zdHJlbmd0aCA9IG9wdGlvbnMuc3RyZW5ndGggfHwgZ2V0UmFuZG9tSW50KDAsIDEwKVxyXG4gICAgc2VsZi5sb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwge1xyXG4gICAgICAgIHg6IGdldFJhbmRvbUludCgwLCBzZXR0aW5ncy5zdGFnZVdpZHRoKSxcclxuICAgICAgICB5OiBnZXRSYW5kb21JbnQoMCwgc2V0dGluZ3Muc3RhZ2VIZWlnaHQpXHJcbiAgICB9XHJcbiAgICBzZWxmLmVsZW1lbnQgPSBudWxsXHJcbiAgICBzZWxmLmlkID0gb3B0aW9ucy5pZCB8fCAnY3JlYXR1cmVfJyArIGdldFJhbmRvbUludCgxMDAwLCA5OTk5KVxyXG4gICAgc2VsZi5ib2R5ID0gb3B0aW9ucy5ib2R5IHx8IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuICc8ZGl2IGlkPVwiJyArIHNlbGYuaWQgKyAnXCIgY2xhc3M9XCJjcmVhdHVyZVwiIHN0eWxlPVwibGVmdDonICsgc2VsZi5sb2NhdGlvbi54ICsgJ3B4OyB0b3A6JyArIHNlbGYubG9jYXRpb24ueSArICdweFwiPjxpbWcgc3JjPVwiaW1nL2J1Zy5wbmdcIiAvPjwvZGl2PidcclxuICAgIH1cclxuICAgIHNlbGYubW92ZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICBzZWxmLmVsZW1lbnQgPSBzZWxmLmVsZW1lbnQgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBzZWxmLmlkKVxyXG4gICAgICAgIHNlbGYuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2xlZnQ6JysgeCArICdweDsgdG9wOicgKyB5ICsgJ3B4OycpXHJcbiAgICAgICAgc2VsZi5sb2NhdGlvbi54ID0geFxyXG4gICAgICAgIHNlbGYubG9jYXRpb24ueSA9IHlcclxuICAgIH1cclxuICAgIHNlbGYuYmVoYXZpb3IgPSB7XHJcbiAgICAgICAgd2FuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBzZWxmLmxvY2F0aW9uLnhcclxuICAgICAgICAgICAgbGV0IHkgPSBzZWxmLmxvY2F0aW9uLnlcclxuXHJcbiAgICAgICAgICAgIHggPSBib3VuZGFyeSggeCArPSBnZXRSYW5kb21JbnQoLTEsIDIpLCAneCcgKVxyXG4gICAgICAgICAgICB5ID0gYm91bmRhcnkoIHkgKz0gZ2V0UmFuZG9tSW50KC0xLCAyKSwgJ3knIClcclxuICAgICAgICAgICAgc2VsZi5tb3ZlKHgsIHkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VsZi5kZWNpc2lvbmxvb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBUT0RPOiBkZWNpc2lvbiBsb2dpY1xyXG4gICAgICAgIC8vIGZvciBub3csIGp1c3Qgd2FuZGVyXHJcbiAgICAgICAgc2VsZi5iZWhhdmlvci53YW5kZXIoKVxyXG4gICAgfVxyXG4gICAgc2VsZi5iaXJ0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldHRpbmdzLnN0YWdlLmlubmVySFRNTCArPSBzZWxmLmJvZHkoKVxyXG4gICAgICAgIGxpZmVJbnRlcnZhbElEID0gd2luZG93LnNldEludGVydmFsKHNlbGYubGlmZWxvb3AsIDEwMDApXHJcbiAgICAgICAgZGVjaXNpb25JbnRlcnZhbElEID0gd2luZG93LnNldEludGVydmFsKHNlbGYuZGVjaXNpb25sb29wLCAxMDApXHJcbiAgICB9XHJcbiAgICBzZWxmLmRlYXRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwobGlmZUludGVydmFsSUQpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBzZWxmLmlkKS5yZW1vdmUoKVxyXG4gICAgfVxyXG4gICAgc2VsZi5saWZlbG9vcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGxpZmUgbG9naWMgaGVyZVxyXG4gICAgICAgIC8vIGluY3JlbWVudCBhZ2VcclxuICAgICAgICBpZihzZWxmLmFnZSA+PSBzZWxmLmxpZmVzcGFuKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGVhdGgoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuYWdlICs9IDAuMVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3JlYXR1cmVcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzdGFnZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlJyksXHJcbiAgICBjcmVhdHVyZUNvdW50OiAxMDAsXHJcbiAgICBzdGFnZVdpZHRoOiA3MDAsXHJcbiAgICBzdGFnZUhlaWdodDogNjAwXHJcbn1cclxuIiwiY29uc3QgQ3JlYXR1cmUgPSByZXF1aXJlKCcuL0NyZWF0dXJlLmpzJylcclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXHJcbmNvbnN0IHNldHRpbmdzID0gcmVxdWlyZSgnLi9jb25maWcuanMnKVxyXG5jb25zdCBnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL3V0aWxzLmpzJykuZ2V0UmFuZG9tSW50XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgc2V0U3RhZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgICBpbml0RXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3RhZ2UoY2IpIHtcclxuICAgIGxldCBjcmVhdHVyZXMgPSBbXVxyXG4gICAgbGV0IGkgPSAwXHJcbiAgICBsZXQgbCA9IHNldHRpbmdzLmNyZWF0dXJlQ291bnRcclxuXHJcbiAgICBmb3IoIDsgaSA8IGw7IGkgKz0gMSApe1xyXG4gICAgICAgIGxldCBjcmVhdHVyZSA9IG5ldyBDcmVhdHVyZSgpXHJcbiAgICAgICAgY3JlYXR1cmUuYmlydGgoKVxyXG4gICAgfVxyXG4gICAgY2IoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB2YXIgY3JlYXR1cmVFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlJylcclxuICAgIGxldCBpID0gMFxyXG4gICAgbGV0IGwgPSBjcmVhdHVyZUVsZW1zLmxlbmd0aFxyXG4gICAgZm9yICggOyBpIDwgbDsgaSArPSAxICkge1xyXG4gICAgICAgIGNyZWF0dXJlRWxlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBsb2FkU3RhdHModGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRTdGF0cyhjcmVhdHVyZV9pZCkge1xyXG4gICAgY29uc29sZS5sb2coKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb25pdG9yJylcclxufVxyXG5cclxuaW5pdCgpO1xyXG4iLCJjb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vY29uZmlnLmpzJylcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBnZXRSYW5kb21JbnQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgbWluID0gTWF0aC5jZWlsKG1pbik7XHJcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICB9LFxyXG4gICAgYm91bmRhcnk6IGZ1bmN0aW9uKG51bSwgYXhpcykge1xyXG4gICAgICAgIGlmIChudW0gPCAwKSByZXR1cm4gMFxyXG4gICAgICAgIGlmIChheGlzID09ICd4JyAmJiBudW0gPiBzZXR0aW5ncy5zdGFnZVdpZHRoKSByZXR1cm4gc2V0dGluZ3Muc3RhZ2VXaWR0aFxyXG4gICAgICAgIGlmIChheGlzID09ICd5JyAmJiBudW0gPiBzZXR0aW5ncy5zdGFnZUhlaWdodCkgcmV0dXJuIHNldHRpbmdzLnN0YWdlSGVpZ2h0XHJcbiAgICAgICAgcmV0dXJuIG51bVxyXG4gICAgfVxyXG59XHJcbiIsIiJdfQ==
