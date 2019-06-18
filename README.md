# ChartyJS
A JavaScript library for charts




# Usage:
<h3>Line chart: </h3>
You have to create a object, the object needs 2 parameters, "ctx" and "config".
The ctx is used to draw things on the canvas.
The config exists out of an array called "data" and a variable called "type", this is de chart type, in this case it's "line".
So how does that look in JavaScript? (This is also done in examples/line/)

```javascript
// Get the canvas, for this example I'm using a canvas with a size of 600 by 600 pixels
var canvas = document.getElementById("canvas");

// Get the ctx from the canvas
var ctx = canvas.getContext("2d");

// Config
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

var lineChart = new Charty(ctx, config);
```

The result will look like this:
![example](https://raw.githubusercontent.com/J0eppp/ChartyJS/master/examples/line/PictureOfChart.PNG)

<h3>Dot chart: </h3>
Documentation coming soon!


# Bugs:
<h1>Things don't fit on the canvas.</h1>
<p>If your canvas is 600 pixels wide, and you draw a dot with a x value of 600, it won't be visible. This is for all the charts. </p>
