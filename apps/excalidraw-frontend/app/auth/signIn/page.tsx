import Auth from "@/app/components/auth";

export default function SignIn(){

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Auth isSignIn={true}></Auth>
        </div>
    )

}