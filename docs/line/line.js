var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var config = {
  type: "line",
  data: [
    {x: 0, y: 150},
    {x: 250, y: 200},
    {x: 300, y: 200},
    {x: 400, y: 200},
    {x: 500, y: 400},
    {x: 600, y: 300}
  ],
  settings: {
    resize: true,
    lineWidth: 2,
    dotSize: 8
  }
}

var chart = new Charty(ctx, config);
