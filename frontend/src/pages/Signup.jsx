import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import axios from 'axios';

const Signup=()=>{
    const [firstname,setFirstName]=useState("");
    const [lastname,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    
    return(
        <>
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max shadow p-2 px-4 text-center flex justify-center flex-col">
                    <Heading text={"Signup"}/>
                    <Subheading text={"Fill the information below to create an account"}></Subheading>
                    <Inputbox onChange={e=>{
                        setFirstName(e.target.value);
                    }} label={"First Name"} placeholder={"Enter your first name"}/>
                    <Inputbox onChange={e=>{
                        setLastName(e.target.value);
                    }}label={"Last Name"} placeholder={"Enter your last name"}/>
                    <Inputbox onChange={e=>{
                        setUsername(e.target.value);
                    }}label={"username"} placeholder={"Eg:test12@gmail.com"}/>
                    <Inputbox onChange={e=>{
                        setPassword(e.target.value);
                    }}label={"password"} placeholder={"Enter your password"}/>
                    <Button text={"Register"} onClick={async ()=>{
                        const response =await axios.post("http://localhost:4500/api/v1/user/signup",{
                            firstname,
                            lastname,
                            username,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                    }}/>
                    <Bottomwarning text={"Already have an account?"} linktext={"Login"} to={"/signin"}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup;