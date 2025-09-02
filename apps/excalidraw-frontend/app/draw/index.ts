type Shapes = {
    type : "rectangle";
    x : number,
    y : number,
    width : number
    height : number

} | {
    type : "circle";
    x : number,
    y : number,
    radius : number

}

export default function initDraw(canvas : HTMLCanvasElement){

    const ctx = canvas.getContext("2d");

    if (ctx == undefined){
        return;
    }

    ctx.fillStyle ="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let startX = 0;
    let startY = 0;
    let height = 0;
    let width = 0;
    let clicked = false;
    let existingShapes : Shapes[] = [];

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.offsetX;
        startY = e.offsetY;
    })

    canvas.addEventListener("mousemove", (e) => {
        if(clicked){
            width = e.offsetX - startX;
            height= e.offsetY- startY;
            showAllShapes(ctx,canvas,existingShapes);
            ctx.strokeStyle ="rgba(255,255,255)"
            ctx.strokeRect(startX,startY,width,height);
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        existingShapes.push({
            type : "rectangle",
            x : startX,
            y : startY,
            width : width,
            height: height
        })
        
    })


}

function showAllShapes(ctx : CanvasRenderingContext2D, canvas : HTMLCanvasElement , existingShapes : Shapes[]){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    existingShapes.map((value : Shapes) => {
        if (value.type == "rectangle"){
            ctx.strokeStyle ="rgba(255,255,255)"
            ctx.strokeRect(value.x,value.y,value.width,value.height);
            }
        }
    )
    
}
