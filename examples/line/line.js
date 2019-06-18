var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var config = {
  type: "line",
  data: [
    {x: 0, y: 150},
    {x: 250, y: 200},
    {x: 250, y: 200},
    {x: 500, y: 400},
    {x: 600, y: 300}
  ]
}

window.onload = function() {
  var chart = new Charty(ctx, config);
}
