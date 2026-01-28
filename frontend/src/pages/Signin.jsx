import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";

const Signin=()=>{
    return(
        <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max rounded-lg bg-white shadow p-2 px-4 text-center">
                    <Heading text={"Signin"}/>
                    <Subheading text={"Enter your credential to access your account"}/>
                    <Inputbox label={"username"} placeholder={"Enter your username"}/>
                    <Inputbox label={"password"} placeholder={"Enter your password"}/>
                    <Button text={"Login"}/>
                    <Bottomwarning text="Don't have an account?" linktext={"Signup now!"} to={"/signup"}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signin;