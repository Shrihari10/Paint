let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.onopen = function () {
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.65;
}

window.onresize = function () {
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.65;
}

window.onload = function () {
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.65;

}

let painting = false;
let brushSize = 5;
let color = "black";
let startX, startY, currentX, currentY;
let shape = "free";
let imageData;

let draw = function(event) {

    if(!painting) 
        return;
    else{
        currentX = event.offsetX;
        currentY = event.offsetY;
        if(shape == "free" ){
        ctx.lineCap = "round";
        ctx.lineWidth = brushSize;
        ctx.strokeStyle = color;
        ctx.lineTo(currentX,currentY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(currentX,currentY);
        }
        else if(shape == "rectangle"){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            ctx.lineWidth = brushSize;
            ctx.strokeStyle = color;
            ctx.putImageData(imageData,0,0);
            ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
            
        }
        else if(shape == "circle"){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            ctx.lineWidth = brushSize;
            ctx.strokeStyle = color;
            ctx.putImageData(imageData,0,0);
            ctx.arc(startX,startY,Math.hypot(currentX-startX, currentY-startY),0,Math.PI*2);
            ctx.stroke();
        }
        else if(shape == "erase"){
            ctx.lineCap = "round";
            ctx.lineWidth = brushSize;
            ctx.strokeStyle = "white";
            ctx.lineTo(currentX,currentY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(currentX,currentY);
        }
    }
}

let start = function(event) {
    painting = true;
    startX = event.offsetX;
    startY = event.offsetY;
    imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    draw(event);
}

let end = function() {
    painting = false;
    ctx.beginPath();
}

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mousemove", draw);

document.getElementById("pencil").addEventListener("click",()=>{
    shape = "free";
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", draw);
});
document.getElementById("rectangle").addEventListener("click",()=>{
    shape = "rectangle";
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", draw);
});
document.getElementById("circle").addEventListener("click",()=>{
    shape = "circle";
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", draw);
});

document.getElementById("erase").addEventListener("click", () => {
    shape = "erase";
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", draw);
});

document.getElementById("clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("color").addEventListener("input", () => {
    color = document.getElementById("color").value;
});

document.getElementById("thickness").addEventListener("input", () => {
    brushSize = document.getElementById("thickness").value;
});