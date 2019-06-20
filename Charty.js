// ChartyJS 0.0.0
// Written by Joep van Dijk
// Github: https://github.com/J0eppp
// Github repository: https://github.com/J0eppp/ChartyJS

function Charty(ctx, config) {
  // Constructor
  this.ctx = ctx;
  this.config = config;

  // Setting the (0, 0) coordinate to the left-bottom corner
  this.ctx.canvas.style.transform = "scale(1, -1)";
  this.ctx.canvas.style.border = "1px solid #333";



  // Check for the chart type
  switch (this.config.type.toLowerCase()) {
    case "line":
      this.drawLineChart();
      break;
    case "dot":
      this.drawDotChart();
      break;
    default:
      console.error("The given charttype doesn't exist or isn't supported (yet?)!");
  }
};




// Prototype functions

// Function to draw a dot on the canvas
Charty.prototype.drawDot = function(ctx, x, y, size) {
  ctx.fillRect(x, y, size, size);
  ctx.stroke();
}


// Check if the points are in the canvas
Charty.prototype.checkPoint = function(data) {
  let x = data.x;
  let y = data.y;
  let width = this.ctx.canvas.width;
  let height = this.ctx.canvas.height;

  var canvasIsTooSmall = function(resize) {
    if (resize === true) {
      console.warn(`The canvas was too small.... it's made bigger... the new size is: (${this.ctx.canvas.width}, ${this.ctx.canvas.height})`);
    } else {
      console.warn("The canvas is too small... the size isn't changed because 'config.settings.resize' === false");
    }
  }

  try {
    if (this.config.settings.resize === true) {
      if (x === width) {
        this.ctx.canvas.width += 5;
        canvasIsTooSmall(true);
      } if (x > width) {
        this.ctx.canvas.width = data.x + 5;
        canvasIsTooSmall(true);
      }
      if (y === height) {
        this.ctx.canvas.height += 5;
        canvasIsTooSmall(true);
      } if (y > width) {
        this.ctx.canvas.height = data.y + 5;
        canvasIsTooSmall(true);
      }
    } else {
      if (x === width || y === height || x > width || y > height) {
        canvasIsTooSmall(false);
      }
    }
  } catch (e) {
    if (x === width || y === height || x > width || y > height) {
      canvasIsTooSmall(false);
    }
  } finally {

  }


  // if (this.config.settings && this.config.settings.resize === true) {
  //   if (x === width) {
  //     this.ctx.canvas.width += 5;
  //     canvasIsTooSmall();
  //   } if (x > width) {
  //     this.ctx.canvas.width = data.x + 5;
  //     canvasIsTooSmall();
  //   }
  //   if (y === height) {
  //     this.ctx.canvas.height += 5;
  //     canvasIsTooSmall();
  //   } if (y > width) {
  //     this.ctx.canvas.height = data.y + 5;
  //     canvasIsTooSmall();
  //   }
  // } else {
  //   if (x === width || y === height || x > width || y > height) {
  //     canvasIsTooSmall();
  //   }
  // }
}


Charty.prototype.drawLineChart = function() {
  // Checking if the point is in the canvas
  for (var i = 0; i < this.config.data.length; i++) {
    if (i === this.config.data.length - 1) {
      var data = this.config.data[i];
    } else {
      var data = this.config.data[i + 1];
    }
    this.checkPoint(data);
  }

  // The real drawing stuff begins here
  for (var i = 0; i < this.config.data.length; i++) {
    console.log(i, this.config.data[i]);
    if (i === this.config.data.length - 1) {
      var d1 = this.config.data[i - 1];
      var d2 = this.config.data[i];
    } else {
      var d1 = this.config.data[i];
      var d2 = this.config.data[i + 1];
    }
    // Checking if `d2` is outside the canvas (d2 has always the highest x value)
    this.checkPoint(d2);

    // Checking the dotSize
    if (this.config.settings && this.config.settings.dotSize) {
      var dotSize = this.config.settings.dotSize;
    } else {
      var dotSize = 7; // The default dotSize
    }
    // Drawing the dot
    this.drawDot(this.ctx, d1.x - dotSize / 2, d1.y - dotSize / 2, dotSize);
    this.drawDot(this.ctx, d2.x - dotSize / 2, d2.y - dotSize / 2, dotSize);
    // Checking the lineWidth
    if (this.config.settings && this.config.settings.lineWidth) {
      this.ctx.lineWidth = this.config.settings.lineWidth;
    } else {
      this.ctx.lineWidth = 1;
    }
    this.ctx.moveTo(d1.x, d1.y);
    this.ctx.lineTo(d2.x, d2.y);
    this.ctx.stroke();
  }
};



Charty.prototype.drawDotChart = function() {
  for (var i = 0; i < this.config.data.length; i++) {
    if (i === this.config.data.length - 1) {
      var data = this.config.data[i];
    } else {
      var data = this.config.data[i + 1];
    }
    this.checkPoint(data);
  }
  for (var i = 0; i < this.config.data.length; i++) {
    var data = this.config.data[i];
    console.log(data);
    this.drawDot(this.ctx, data.x, data.y, 5);
  }
};
