let root = document;
let ball;
let radius = 200;
let interval = null;
let angle = 45;

draggables = root.querySelectorAll(".draggable");

draggables.forEach(initDrag);

function initDrag(item) {
  ball = item;
  ball.positions = [];
  interval = setInterval(updateOrbit, 50);
}
function updateOrbit() {
  let rect = ball.getBoundingClientRect();
  let centerX = document.body.offsetWidth / 2 - rect.width / 2;
  let centerY = document.body.offsetHeight / 2 - rect.height / 2;
  let hyp = radius;
  let opp = Math.sin((angle * Math.PI) / 180) * hyp;
  let adj = Math.cos((angle * Math.PI) / 180) * hyp;
  ball.style.left = centerX + opp + "px";
  ball.style.top = centerY - adj + "px";
  /*
  var p1 = {
    x: centerX,
    y: centerY
  };

  var p2 = {
    x: centerX + opp,
    y: centerY - adj
  };
  //console.log(p1, p2);
  // angle in degrees
  var xdist = p2.x - p1.x;
  var ydist = p2.y - p1.y;
  var angleDeg = 180 - Math.round((Math.atan2(xdist, ydist) * 180) / Math.PI);

  //console.log(angleDeg);

  ball.style.transform = "rotate(" + angleDeg + "deg)";*/
  angle += 2;
  if (angle >= 360) {
    angle - 360;
  }
  //  ball.style.transform = "rotate(" + angle + "deg)";
}
ball.onmousedown = function(event) {
  clearInterval(interval);
  let rect = ball.getBoundingClientRect();
  let shiftX = event.clientX - rect.left;
  let shiftY = event.clientY - rect.top;

  ball.style.position = "absolute";
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    //console.log("moveAt(" + pageX + "," + pageY + ")");

    let currentX = pageX - shiftX,
      currentY = pageY - shiftY;

    ball.style.left = currentX + "px";
    ball.style.top = currentY + "px";

    var p1 = {
      x: document.body.offsetWidth / 2 - rect.width / 2,
      y: document.body.offsetHeight / 2 - rect.height / 2
    };

    var p2 = {
      x: currentX,
      y: currentY
    };
    //console.log(p1, p2);
    // angle in degrees
    var xdist = p2.x - p1.x;
    var ydist = p2.y - p1.y;
    var angleDeg = 180 - Math.round((Math.atan2(xdist, ydist) * 180) / Math.PI);

    //console.log(angleDeg);

    ball.style.transform = "rotate(" + angleDeg + "deg)";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (4) drop the ball, remove unneeded handlers
  ball.onmouseleave = ball.onmouseup = function() {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
    ball.onmouseleave = null;
  };
};

ball.ondragstart = function() {
  return false;
};
