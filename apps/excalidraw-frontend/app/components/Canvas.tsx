"use client"

import { useRef , useEffect, useState } from "react"
import useWebSocket from "@/app/hooks/useWebsocket";
import useId from "@/app/hooks/useId";
import Game from '@/app/draw/game'
import IconComponent from "./IconComponent";
import { RectangleHorizontalIcon , Circle , Pencil } from "lucide-react";

export default function Canvas({roomId} : {roomId : string}) {


    const canvasRef = useRef<HTMLCanvasElement>(null);

    const {ws,loading,error} = useWebSocket();
    const [game,setGame] = useState<Game>();
    const {id, idLoading , idError} = useId(roomId);
    const [selectedShape , setSelectedShape] = useState("Rectangle");
    


    useEffect(() => {

        game?.setSelectedShape(selectedShape);

    },[selectedShape])

    useEffect(() => {

        if (error === undefined && ws && !loading){

            ws.send(JSON.stringify({
                "action" : "join",
                "roomId" : id
            }))

        }

        },[ws,loading,id])


    useEffect(() => {

        if (canvasRef !== null){

            const canvas = canvasRef.current;

            console.log(id,idError,idLoading , canvas)

            if(canvas !== null && ws && idError === undefined && id != undefined){
                
                const g = new Game(canvas,id,ws);
                setGame(g);
            
            }
        }


        return () => {
            game?.destroy();
        }

    },[canvasRef.current])



    return (
        <div>

            {
            loading ?
            <div>Loading the Canvas....</div> : 
            <div>
                <Topbar selectedShape={selectedShape} setSelectedShape={setSelectedShape}></Topbar>
                <canvas ref={canvasRef} style={{display:"block"}} width={"2000"} height={"1000"}></canvas>
                </div>
            }
        </div>
    )

}

function Topbar({ selectedShape , setSelectedShape} : { selectedShape: string , setSelectedShape : React.Dispatch<React.SetStateAction<string>>}){


    return (
        <div className="fixed top-0 left-0 flex">
            <IconComponent activated={selectedShape === "Rectangle"} icon={<RectangleHorizontalIcon />} onClick={ () => {

                setSelectedShape("Rectangle");

            }} ></IconComponent>
            <IconComponent activated={selectedShape === "Circle"} icon={<Circle />}  onClick={ () => {
                
                setSelectedShape("Circle");

            }} ></IconComponent>
            <IconComponent activated={selectedShape === "Pencil"} icon={<Pencil />}  onClick={ () => {
                
                setSelectedShape("Pencil");

            }} ></IconComponent>
        </div>

    )

}

