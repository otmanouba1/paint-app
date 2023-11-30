const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const tools = document.querySelectorAll(".tool");
const fullColor = document.querySelector("#fill-color");
const brushSize = document.querySelector("#size-of-brush");
const colorBtns = document.querySelectorAll(".color .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const saveCanvas = document.querySelector(".save-img");
// global variable
let method = "brush";
let draw = false;
let pervCorX;
let pervCorY;
let brushWidth = 5;
let oneDraw;
let color = "rgb(0, 0, 0)";

//canvas width and height
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// confirm mouse down and change  the color and size of brush and ships
const mousedown = (event) => {
  draw = true;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  pervCorX = event.offsetX;
  pervCorY = event.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  oneDraw = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// witch shape and width is clicked
tools.forEach((toolsBtn) => {
  toolsBtn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    toolsBtn.classList.add("active");
    method = toolsBtn.id;
    // console.log(method);
  });
});

// confirmation of stooping drawing
const mouseup = () => {
  draw = false;
};

// drawing rectangle circle triangle
const rectangle = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  const width = pervCorX - event.offsetX;
  const height = pervCorY - event.offsetY;
  if (fullColor.checked) return ctx.fillRect(x, y, width, height);

  ctx.strokeRect(x, y, width, height);
};
const circle = (event) => {
  ctx.beginPath();
  console.log("hihi");
  const width = pervCorX - event.offsetX;
  const height = pervCorY - event.offsetY;

  let radius = Math.sqrt(width ** 2 + height ** 2);
  ctx.arc(pervCorX, pervCorY, radius, 0, 2 * Math.PI);
  if (fullColor.checked) return ctx.fill();
  ctx.stroke();
};
const triangle = (event) => {
  ctx.beginPath();
  ctx.moveTo(pervCorX, pervCorY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.lineTo(pervCorX * 2 - event.offsetX, event.offsetY);
  ctx.closePath();
  fullColor.checked ? ctx.fill() : ctx.stroke();
};

//checking what ship to draw
const startDrawing = (event) => {
  if (!draw) return;
  ctx.putImageData(oneDraw, 0, 0);

  if (method == "brush" || method == "eraser") {
    ctx.strokeStyle = method == "eraser" ? "#fff" : color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else if (method == "rectangle") {
    rectangle(event);
  } else if (method == "circle") {
    circle(event);
  } else if (method == "triangle") {
    triangle(event);
  }
};
colorBtns.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    btn.classList.add("selected");
    color = window.getComputedStyle(btn).backgroundColor;
  });
});
//changing color of ships  and brush
colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});
// checking if mouse down in canvas and give brush size
brushSize.addEventListener("change", () => (brushWidth = brushSize.value));
canvas.addEventListener("mousemove", startDrawing);
canvas.addEventListener("mousedown", mousedown);
canvas.addEventListener("mouseup", mouseup);
//save and clear canvas
clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveCanvas.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "canvas_image.png";
  a.click();
});

// picture editor
const editeH1 = document.querySelector(".editeH1");

editeH1.addEventListener("click", () => {
  console.log("hohohoho");
});
