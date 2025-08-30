"use client"

import { Button } from "@repo/ui/button"

interface AuthProp{
    isSignIn : boolean
}

export default function Auth({isSignIn} : AuthProp){

    const buttonOnClick = () => {
        console.log(isSignIn);
    }

    return (

        <div className="h-96 w-96 m-4 border border-solid border-black bg-black flex flex-col justify-center items-center shadow-md">
            <div className="text-white text-3xl m-2">{isSignIn ? 'Sign In' : 'Sign Up'}</div>
            <input type="text" placeholder="Enter Username" className="p-2 m-2 border-2 border-gray-700 text-white rounded-md" />
            <input type="text" placeholder="Enter Password" className="p-2 m-2 border-2 border-gray-700 text-white rounded-md" />
            {isSignIn === false && <input type="text" placeholder="Enter Name" className="p-2 m-2 border-2 border-gray-700 text-white rounded-md" />}
            <Button className="p-2 m-2 bg-blue-500 cursor-pointer text-white rounded-md" callback={buttonOnClick}> {isSignIn ? 'Sign In' : 'Sign Up'}</Button>

        </div>


    )

}