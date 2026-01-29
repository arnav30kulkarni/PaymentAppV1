import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    return(
        <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="w-80 h-max rounded-lg bg-white shadow p-2 px-4 text-center">
                    <Heading text={"Signin"}/>
                    <Subheading text={"Enter your credential to access your account"}/>
                    <Inputbox onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label={"username"} placeholder={"Enter your username"}/>
                    <Inputbox onChange={(e)=>{
                        setPassword(e.target.value);
                    }} label={"password"} placeholder={"Enter your password"}/>
                    <Button onClick={()=>{
                        axios.post("http://localhost:4500/api/v1/user/signin",{
                            username,
                            password
                        })
                            .then((res)=>{
                                localStorage.setItem("token",res.data.token);
                                navigate("/dashboard");

                            })
                    }} text={"Login"}/>
                    <Bottomwarning text="Don't have an account?" linktext={"Signup now!"} to={"/signup"}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signin;