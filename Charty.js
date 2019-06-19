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
    if (data.x === this.ctx.canvas.width) {
      this.ctx.canvas.width += 5;
      console.warn("The canvas was too small, it's made bigger...");
    } if (data.x > this.ctx.canvas.width) {
      this.ctx.canvas.width = data.x + 5;
      console.warn("The canvas was too small, it's made bigger...");
    }
    if (data.y === this.ctx.canvas.height) {
      this.ctx.canvas.height += 5;
      console.warn("The canvas was too small, it's made bigger...");
    } if (data.y > this.ctx.canvas.width) {
      this.ctx.canvas.height = data.y + 5;
      console.warn("The canvas was too small, it's made bigger...");
    }
  }

  // The functions which are going to draw the charts
  var drawLineChart = function() {
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
      drawDot(this.ctx, d1.x - 2, d1.y - 2, 5);
      drawDot(this.ctx, d2.x - 2, d2.y - 2, 5);
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
