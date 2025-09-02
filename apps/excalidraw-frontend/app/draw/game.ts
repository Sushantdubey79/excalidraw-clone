import { getShapes } from "./http";


interface Rectangle{
    type : "rectangle"
    startX : number,
    startY : number,
    width : number,
    height: number
}

interface Circle{
    type : "circle"
    startX : number,
    startY : number,
    radius : number,
    sangle: number,
    eangle : number
}


interface Shape{

    Rectangle : Rectangle,
    Circle : Circle

}

export class Game{

    private Canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private roomId: number;
    private ShapesData : Shape[];

    

    constructor(Canvas : HTMLCanvasElement , roomId : number){
        this.Canvas = Canvas;
        this.roomId = roomId;
        this.ShapesData = [];
        this.ctx = Canvas.getContext('2d')!;
        this.init();

    }

    async init(){
        await this.getShapesData();
        
        
    }


    async getShapesData(){
        const response = await getShapes(this.roomId);

        if (response == null){
            alert("Error in getting the shape data");
        }
        else{
            this.ShapesData = response.map((val : any) => {
                const message = val.message;
                const parsedMessage : Shape = JSON.parse(message);
                return parsedMessage;
            })
        }
    }

    mouseDownEventHandler(e : MouseEvent) {

        if 

    }

    initHandlers(){



    }
}