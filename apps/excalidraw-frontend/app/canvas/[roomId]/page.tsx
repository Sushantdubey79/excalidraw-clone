"use client"

import { useRef , useEffect } from "react"
import initDraw from "@/app/draw/index";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (canvasRef !== null){

            const canvas = canvasRef.current;

            if(canvas !== null){
                initDraw(canvas);
            }

        }


    },[canvasRef])


    return (

        <canvas ref={canvasRef} style={{display:"block"}} width={"2000"} height={"1000"}></canvas>
    )

}