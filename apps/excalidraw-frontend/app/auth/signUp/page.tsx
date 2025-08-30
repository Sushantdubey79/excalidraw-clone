import Auth from "@/app/components/auth";

export default function SignUp(){

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Auth isSignIn={false}></Auth>
        </div>
    )

}