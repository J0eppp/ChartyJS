// ChartyJS 0.0.0
// Written by Joep van Dijk
// Github: https://github.com/J0eppp
//
//
//
//
//


function Charty(ctx, config) {
  // Constructor
  this.ctx = ctx;
  this.config = config;



  // Setting the (0, 0) coordinate to the left-bottom corner
  this.ctx.canvas.style.transform = "scale(1, -1)";
  this.ctx.canvas.style.border = "1px solid #333";



  // Function to draw a dot on the canvas
  function drawDot(ctx, x, y, size) {
    ctx.fillRect(x, y, size, size);
    ctx.stroke();
  }




  // Check if the points are in the canvas
  var checkPoint = function(data) {
    let x = data.x;
    let y = data.y;
    let width = this.ctx.canvas.width;
    let height = this.ctx.canvas.height;

    var canvasIsTooSmall = function(resize) {
      if (resize === true) {
        console.warn(`The canvas was too small.... it's made bigger... the new size is: (${width}, ${height})`);
      } else {
        console.warn("The canvas is too small... the size isn't changed because 'config.settings.resize' === false");
      }
    }

    
    if (this.config.settings && this.config.settings.resize === true) {
      if (x === width) {
        this.ctx.canvas.width += 5;
        canvasIsTooSmall();
      } if (x > width) {
        this.ctx.canvas.width = data.x + 5;
        canvasIsTooSmall();
      }
      if (y === height) {
        this.ctx.canvas.height += 5;
        canvasIsTooSmall();
      } if (y > width) {
        this.ctx.canvas.height = data.y + 5;
        canvasIsTooSmall();
      }
    } else {
      if (x === width || y === height || x > width || y > height) {
        canvasIsTooSmall();
      }
    }
  }



  // The functions which are going to draw the charts
  var drawLineChart = function() {
    // Checking if the point is in the canvas
    for (var i = 0; i < this.config.data.length; i++) {
      if (i === this.config.data.length - 1) {
        var data = this.config.data[i];
      } else {
        var data = this.config.data[i + 1];
      }
      checkPoint(data);
    }
    for (var i = 0; i < this.config.data.length; i += 2) {
      if (i === this.config.data.length - 1) {
        var d1 = this.config.data[i - 1];
        var d2 = this.config.data[i];
      } else {
        var d1 = this.config.data[i];
        var d2 = this.config.data[i + 1];
      }
      if (d2.x === this.ctx.canvas.width) {
        this.ctx.canvas.width += 5;
      } if (d2.x > this.ctx.canvas.width) {
        this.ctx.canvas.width = d2.x + 5;
      }
      if (this.config.settings && this.config.settings.dotSize) {
        var dotSize = this.config.settings.dotSize;
      } else {
        var dotSize = 7;
      }
      drawDot(this.ctx, d1.x - dotSize / 2, d1.y - dotSize / 2, dotSize);
      drawDot(this.ctx, d2.x - dotSize / 2, d2.y - dotSize / 2, dotSize);
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




  var drawDotChart = function() {
    for (var i = 0; i < this.config.data.length; i++) {
      if (i === this.config.data.length - 1) {
        var data = this.config.data[i];
      } else {
        var data = this.config.data[i + 1];
      }
      checkPoint(data);
    }
    for (var i = 0; i < this.config.data.length; i++) {
      var data = this.config.data[i];
      console.log(data);
      drawDot(this.ctx, data.x, data.y, 5);
    }
  }




  // Check for the chart type
  switch (this.config.type.toLowerCase()) {
    case "line":
      drawLineChart();
      break;
    case "dot":
      drawDotChart();
      break;
    default:
      console.error("The given charttype doesn't exist or isn't supported (yet?)!");
  }
};
