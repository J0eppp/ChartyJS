function Charty(ctx, config) {
  // Constructor
  this.ctx = ctx;
  this.config = config;

  // Setting the (0, 0) coordinate to the left-bottom corner
  this.ctx.canvas.style.transform = "scale(1, -1)";

  // The functions which are going to draw the charts
  var drawLineChart = function() {
    for (var i = 0; i < this.config.data.length; i += 2) {
      if (i === this.config.data.length - 1) {
        var d1 = this.config.data[i - 1];
        var d2 = this.config.data[i];
      } else {
        var d1 = this.config.data[i];
        var d2 = this.config.data[i + 1];
      }
      this.ctx.fillRect(d2.x - 2, d2.y - 2, 5, 5);
      this.ctx.fillRect(d1.x - 2, d1.y - 2, 5, 5);
      this.ctx.moveTo(d1.x, d1.y);
      this.ctx.lineTo(d2.x, d2.y);
      this.ctx.stroke();
    }
  };

  // Check for the chart type
  switch (this.config.type.toLowerCase()) {
    case "line":
      drawLineChart();
      break;
    default:
      console.error("The given charttype doesn't exist or isn't supported (yet?)!");
  }
};
