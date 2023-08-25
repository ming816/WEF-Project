function setup() {
   
  }
  
function draw() {
    
  }


function setup() {
    createCanvas(400, 400);
  }

function draw() {
    background(220);
    // Draw a rectangle
    rect(50, 50, 100, 100);
  }

  // Add an event listener to update the frame rate setting
document.getElementById("frameRateSetting").addEventListener("change", function() {
      // Get the value of the input element
      var frameRateValue = document.getElementById("frameRateSetting").value;
      // Update the frame rate of the sketch
      frameRate(frameRateValue);
});