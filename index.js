let root = document,
  ball,
  radius = 200,
  interval = null,
  angle = 45;

draggables = root.querySelectorAll(".draggable");

draggables.forEach(initDrag);

function initDrag(item) {
  ball = item;
  let rect = ball.getBoundingClientRect(),
    centerX = document.body.offsetWidth / 2 - rect.width / 2,
    centerY = document.body.offsetHeight / 4 - rect.height / 2;

  ball.style.left = centerX + "px";
  ball.style.top = centerY + "px";

  interval = setInterval(updateOrbit, 10);
}

function updateOrbit() {
  let rect = ball.getBoundingClientRect(),
    centerX = document.body.offsetWidth / 2 - rect.width / 2,
    centerY = document.body.offsetHeight / 2 - rect.height / 2,
    hyp = radius,
    opp = Math.sin((angle * Math.PI) / 180) * hyp,
    adj = Math.cos((angle * Math.PI) / 180) * hyp;

  ball.style.left = centerX + opp + "px";
  ball.style.top = centerY - adj + "px";

  ball.style.transform = "rotate(" + angleDeg + "deg)";

  angle += 2;
  if (angle >= 360) {
    angle - 360;
  }
}

ball.onmousedown = function(event) {
  clearInterval(interval);
  let rect = ball.getBoundingClientRect();

  ball.shiftX = event.clientX - rect.left;
  ball.shiftY = event.clientY - rect.top;

  ball.style.zIndex = 1000;

  function moveAt(pageX, pageY) {
    let currentX = pageX,
      currentY = pageY;

    ball.style.left = currentX + "px";
    ball.style.top = currentY + "px";

    var p1 = {
      x: document.body.offsetWidth / 2,
      y: document.body.offsetHeight / 2
    };

    var p2 = {
      x: currentX,
      y: currentY
    };

    // angle in degrees
    let xdist = p2.x - p1.x,
      ydist = p2.y - p1.y,
      angleDeg = 180 - Math.round((Math.atan2(xdist, ydist) * 180) / Math.PI);

    //console.log(angleDeg);
    ball.firstElementChild.style.transform = "rotate(" + angleDeg + "deg)";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (4) drop the ball, remove unneeded handlers
  ball.parentNode.onmouseup = ball.onmouseup = function() {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
    ball.onmouseleave = null;
  };
};

ball.ondragstart = function() {
  return false;
};
