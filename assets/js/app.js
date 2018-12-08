"use strict"
var MarsRover = function (grid) {
  self = this;
  this.location;
  this.direction;
  this.grid = grid;
  this.positionControl = [];
  this.directions = ['N', 'E', 'S', 'W'];
  this.status = 'Success';
  var positions = [];

  /* ========================================
  =            Public functions            =
  ======================================== */
  this.addRover = function(location,direction){
    this.location = location;
    this.direction = direction;
  };

  this.sendCommand = function (commandsText) {
    var commands = commandsText.split('');
    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];
      if (command === 'M') {
        if (!move(command)){
          break;
        }
      } else if (command === 'L' || command === 'R') {
        process(command);
      }
    }

    var allResults = this.location + " " + this.direction;
    positions.push(allResults);
  };

  this.getFinalPositions = function () {
    positions.forEach(function(item) {
      document.write("<div>" + item + "</div>");
    });
  };


  /* =============================================
  =                Private functions            =
  ============================================= */
  var move = function (command) {
    var x = 0,
        y = 0;

    if (self.direction == 'N') {
      y++;
    } else if (self.direction == 'E') {
      x++;
    } else if (self.direction == 'S') {
      y--;
    } else if (self.direction == 'W') {
      x--;
    }
    var newLocation = [self.location[0] + x, self.location[1] + y];
    if (detectDirection(newLocation)) {
      return false;
    }
    self.location = newLocation;
    return true;
  };

  var detectDirection = function (newLocation) {
    for (var i = 1; i < self.positionControl.length; i++) {
      if (newLocation.toString() == self.positionControl[i].toString()) {
        self.status = 'Cannot move out of Grid';
        return true;
      }
    }
    return false;
  };

  var process = function (command) {
    var directionNumber = getDirectionNumber(self.direction);
    if (command == 'L') {
      directionNumber = (directionNumber + 3 - 1) % 4;
    } else {
      directionNumber = (directionNumber + 1) % 4;
    }
    self.direction = self.directions[directionNumber];
  };

  var getDirectionNumber = function (direction) {
    for (var index = 0; index < 4; index++) {
      if (self.directions[index] === direction) return index;
    }
  };
};

// Output Test
var marsRover = new MarsRover([5, 5]);
marsRover.addRover([1, 2],'N');
marsRover.sendCommand('LMLMLMLMM');
marsRover.addRover([3, 3],'E');
marsRover.sendCommand('MMRMMRMRRM');
marsRover.getFinalPositions();
