const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 650;
canvas.height = 680;

const INITIAL_COLOR = "black";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width ,canvas.height)

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; 
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){ 
    painting = true;
}

function onMouseMove(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke()
    }
    
}

function handleChangeColor(event){
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color ;
    ctx.fillStyle = color;
}
function handleClickFill(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width ,canvas.height)
    }
}

function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleClickFill)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleChangeColor)) 

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input", handleRange)
}

function handleMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    } else{
        filling = true;
        mode.innerText = "paint "
    }
}

if(mode){
    mode.addEventListener("click", handleMode)
} 

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]"
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}