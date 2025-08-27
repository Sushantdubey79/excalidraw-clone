"use client"

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {

  const Router = useRouter();

  const [formData , setFormData] : any = useState();

  const changeFormData = (e : ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  }

  const joinRoom = () => {
      Router.push(`chat/${formData}`)
  }

  return (
    <div style={{ display : "flex" , flexDirection : "column", justifyContent : "center" , alignItems : "center", width : "100vw" , height: "100vh"}}>
      <input onChange={changeFormData} placeholder="Enter Room Id"></input>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}
