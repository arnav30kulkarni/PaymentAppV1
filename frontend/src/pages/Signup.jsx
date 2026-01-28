import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";

const Signup=()=>{
    return(
        <>
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max shadow p-2 px-4 text-center flex justify-center flex-col">
                    <Heading text={"Signup"}/>
                    <Subheading text={"Fill the information below to create an account"}></Subheading>
                    <Inputbox label={"First Name"} placeholder={"Enter your first name"}/>
                    <Inputbox label={"Last Name"} placeholder={"Enter your last name"}/>
                    <Inputbox label={"username"} placeholder={"Eg:test12@gmail.com"}/>
                    <Inputbox label={"password"} placeholder={"Enter your password"}/>
                    <Button text={"Register"}/>
                    <Bottomwarning text={"Already have an account?"} linktext={"Login"} to={"/signin"}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup;