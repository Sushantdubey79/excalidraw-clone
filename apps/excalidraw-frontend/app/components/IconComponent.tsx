import { ReactNode } from "react"

export default function IconComponent({icon , onClick, activated } : {
    icon : ReactNode,
    onClick : () => void,
    activated : boolean
}){

    let val = activated ? "text-red-300" : "text-white";

    return(
        <div onClick={onClick} className={"border border-white-4 rounded-4xl p-2 cursor-pointer m-2 hover:bg-gray-700 " + val}>
            {icon}
        </div>
    )
    
}