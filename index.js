const wrapper = document.querySelector(".canvas-wrapper");
const canvas = document.querySelector("#funn-canvas");
const ctx = canvas.getContext("2d");
let painting = false;
let lastX = 0;
let lastY = 0;
let lineThickness = 1;

const width = (canvas.width = wrapper.offsetWidth);
const height = (canvas.height = 600);
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, width, height);

// Instructions -----
// Button on click
let brushColor = "#2f2d2e";
function funnBtn(color) {
  switch (color) {
    case 1:
      brushColor = " #c84630";
      break;
    case 2:
      brushColor = "#99c24d";
      break;
    case 3:
      brushColor = "#048ba8";
      break;
    case 4:
      brushColor = " #f18f01";
      break;
    case 5:
      brushColor = " #ffe66d";
      break;
    case 6:
      brushColor = " #2f2d2e";
      break;
    case 7:
      brushColor = " #ffffff";
      break;

    default:
      brushColor = "#2f2d2e";
      break;
  }
}

// Title
ctx.beginPath();
ctx.strokeStyle = "#2f2d2e";
ctx.moveTo(10, 10); // p
ctx.lineTo(10, 50);
ctx.moveTo(10, 10);
ctx.lineTo(30, 10);
ctx.lineTo(30, 30);
ctx.lineTo(10, 30);
ctx.moveTo(40, 20); // a
ctx.lineTo(60, 20);
ctx.lineTo(60, 50);
ctx.lineTo(40, 50);
ctx.lineTo(40, 30);
ctx.lineTo(60, 30);
ctx.moveTo(70, 20); // i
ctx.lineTo(70, 50);
ctx.moveTo(80, 50); // n
ctx.lineTo(80, 20);
ctx.lineTo(100, 20);
ctx.lineTo(100, 50);
ctx.moveTo(110, 20); // t
ctx.lineTo(110, 50);
ctx.lineTo(130, 50);
ctx.moveTo(110, 30);
ctx.lineTo(120, 30);

ctx.moveTo(150, 50); // m
ctx.lineTo(150, 20);
ctx.lineTo(170, 20);
ctx.lineTo(170, 50);
ctx.moveTo(160, 20);
ctx.lineTo(160, 50);
ctx.moveTo(180, 30); // e
ctx.lineTo(200, 30);
ctx.lineTo(200, 20);
ctx.lineTo(180, 20);
ctx.lineTo(180, 50);
ctx.lineTo(200, 50);
ctx.moveTo(210, 10); // !
ctx.lineTo(210, 43);
ctx.moveTo(210, 48);
ctx.lineTo(210, 50);
ctx.stroke();
// -------------

canvas.onmousedown = function (e) {
  painting = true;
  ctx.fillStyle = brushColor;
  lastX = e.pageX - this.offsetLeft;
  lastY = e.pageY - this.offsetTop;
};

canvas.onmouseup = function (e) {
  painting = false;
};

canvas.onmousemove = function (e) {
  if (painting) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;

    // find all points between
    let x1 = mouseX,
      x2 = lastX,
      y1 = mouseY,
      y2 = lastY;

    let steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    if (steep) {
      let x = x1;
      x1 = y1;
      y1 = x;

      let y = y2;
      y2 = x2;
      x2 = y;
    }
    if (x1 > x2) {
      let x = x1;
      x1 = x2;
      x2 = x;

      let y = y1;
      y1 = y2;
      y2 = y;
    }

    let dx = x2 - x1,
      dy = Math.abs(y2 - y1),
      error = 0,
      de = dy / dx,
      yStep = -1,
      y = y1;

    if (y1 < y2) {
      yStep = 1;
    }

    lineThickness =
      5 - Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 10;
    if (lineThickness < 1) {
      lineThickness = 1;
    }

    for (let x = x1; x < x2; x++) {
      if (steep) {
        ctx.fillRect(y, x, lineThickness, lineThickness);
      } else {
        ctx.fillRect(x, y, lineThickness, lineThickness);
      }

      error += de;
      if (error >= 0.5) {
        y += yStep;
        error -= 1.0;
      }
    }

    lastX = mouseX;
    lastY = mouseY;
  }
};
