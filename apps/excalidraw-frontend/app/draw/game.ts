import { getShapes } from "./http";


type Shape = {
    type : "Circle"
    centerX : number,
    centerY : number,
    radius : number,
    sangle: number,
    eangle : number
}|
{
    type : "Rectangle"
    startX : number,
    startY : number,
    width : number,
    height: number
}|
{
    type : "Pencil"
    startX : number,
    startY : number,
    width : number,
    height: number
}

export default class Game{

    private Canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private roomId: number;
    private ShapesData : Shape[];
    private clicked : boolean;
    private startX : number;
    private startY : number;
    private centerX : number;
    private centerY : number;
    private width : number;
    private height : number;
    private selectedShape : string;
    private socket : WebSocket;

    constructor(Canvas : HTMLCanvasElement , roomId : number , ws : WebSocket){
        this.Canvas = Canvas;
        this.roomId = roomId;
        this.ShapesData = [];
        this.clicked = false;
        this.startX = 0;
        this.startY = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.width = 0;
        this.height = 0;
        this.selectedShape = "Rectangle";
        this.socket = ws;
        this.socketMessage();
        this.ctx = Canvas.getContext('2d')!;
        this.initMouseHandlers();
        this.init();

    }


    setSelectedShape = (shape : string) => {
        this.selectedShape = shape
    }


    socketMessage = () => {

        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data.toString());
            this.ShapesData.push(message);
            this.clearandUpdateCanvas();
        }
            

        }

    init = async () => {
        await this.getShapesData();
        this.clearandUpdateCanvas();
    }


    getShapesData = async () => {
        const response = await getShapes(this.roomId);

        if (response == null){
            alert("Error in getting the shape data");
        }
        else{
            this.ShapesData = response.map((val : any) => {
                try{
                    const message = val.message;
                    const parsedMessage : Shape = JSON.parse(message);
                    return parsedMessage;
                }
                catch(e) {

                    console.log("Not a valid json");
                    return null;

                }
            }).filter((val : Shape) => {
                return val !== null
            })
        }
    }

    destroy = () => {
        this.Canvas.removeEventListener("mousedown" , this.mouseDownEventHandler)
        this.Canvas.removeEventListener("mouseup" , this.mouseDownEventHandler)
        this.Canvas.removeEventListener("mousemove" , this.mouseDownEventHandler)
    }

    mouseDownEventHandler = (e : MouseEvent) => {
        this.clicked = true;
        if (this.selectedShape === "Rectangle"){
            this.startX = e.offsetX;
            this.startY = e.offsetY;
        }
        else if (this.selectedShape === "Circle"){
            this.startX = e.offsetX;
            this.startY = e.offsetY;
        }
    }
    mouseMoveEventHandler = (e : MouseEvent) => {
            if(this.clicked){
                if (this.selectedShape === "Rectangle"){
                    this.width = e.offsetX - this.startX;
                    this.height = e.offsetY - this.startY;
                    this.clearandUpdateCanvas();
                    this.ctx.strokeStyle = "rgba(255,255,255)"
                    this.ctx.strokeRect(this.startX,this.startY,this.width,this.height);
            }

            if (this.selectedShape === "Circle"){
                    this.width = e.offsetX - this.startX;
                    this.height = e.offsetY - this.startY;
                    const diameter = Math.max(Math.abs(this.width), Math.abs(this.height));
                    const radius = diameter / 2;
                    this.centerX = this.startX + (this.width >= 0 ? radius : -radius);
                    this.centerY = this.startY + (this.height >= 0 ? radius : -radius);
                    this.clearandUpdateCanvas();
                    this.ctx.beginPath();
                    this.ctx.arc(this.centerX, this.centerY, Math.abs(radius), 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
                    this.ctx.strokeStyle = 'rgba(255,255,255)';            // White border
                    this.ctx.stroke();  
            }
        }
    }

    mouseUpEventHandler = async (e : MouseEvent) => {
        
        this.clicked = false;


        if (this.selectedShape === "Rectangle"){
                const data : Shape = {
                    type : "Rectangle",
                    startX : this.startX,
                    startY : this.startY,
                    width : this.width,
                    height : this.height
                }

                this.sendDataAndUpdateCanvas(data);
                    
        }
        else if (this.selectedShape === "Circle"){
            const diameter = Math.max(Math.abs(this.width), Math.abs(this.height));
            const radius = diameter / 2;
            const data : Shape = {
                    type : "Circle",
                    centerX : this.centerX,
                    centerY : this.centerY,
                    radius : Math.abs(radius),
                    sangle : 0,
                    eangle : 2 * Math.PI
                    
                }

            this.sendDataAndUpdateCanvas(data);
        }
        
    }


    sendDataAndUpdateCanvas(data : Shape){

        this.ShapesData.push(data);

        this.socket.send(JSON.stringify({
            "action" : "chat",
            "message" : JSON.stringify(data),
            "roomId" : this.roomId
        }))
        
        this.clearandUpdateCanvas();
    }

    initMouseHandlers(){
        this.Canvas.addEventListener("mousedown" , this.mouseDownEventHandler)
        this.Canvas.addEventListener("mouseup" , this.mouseUpEventHandler)
        this.Canvas.addEventListener("mousemove" , this.mouseMoveEventHandler)
    }


    clearandUpdateCanvas() {

        this.ctx.clearRect(0,0,this.Canvas.width,this.Canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)"
        this.ctx.fillRect(0,0,this.Canvas.width,this.Canvas.height);


        this.ShapesData.forEach((shape : Shape) => {

                if (shape.type === "Rectangle"){
                    this.ctx.strokeStyle = "rgba(255,255,255)"
                    this.ctx.strokeRect(shape.startX,shape.startY,shape.width,shape.height);
                }
                else if (shape.type == "Circle"){
                    this.ctx.beginPath();
                    this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
                    this.ctx.strokeStyle = 'rgba(255,255,255)';            // White borde
                    this.ctx.stroke(); 
                }
                
        })

    }
}