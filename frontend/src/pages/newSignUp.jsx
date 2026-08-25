import { useEffect, useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import "../components/Heading";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import NewButton from "../components/NewButton";
import Subheading from "../components/Subheading";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

const NewSignUp = ({ onClose, onSignIn }) => {
    const token = localStorage.getItem("token");
    const [firstName,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errormessage , setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(token){
            navigate("/my")
        }
    },[token,navigate])

    return(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="signup-title" className="relative w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={onClose} aria-label="Close sign up" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-lg font-semibold text-(--text-secondary) hover:bg-black/5 hover:text-(--text-primary)">
                    X
                </button>
                <div id="signup-title">
                    <Heading text={"Create a new account"}></Heading>
                </div>
                <Subheading text={"Enter the information to create a new account"}></Subheading>
                <Inputbox label={"Firstname"} placeholder={"FirstName"} onChange={
                    (e)=>{
                        setFirstName(e.target.value);
                    }
                }></Inputbox>
                <Inputbox label={"Lastname"} placeholder={"LastName"} onChange={
                    (e)=>{
                        setLastName(e.target.value);
                    }
                }></Inputbox>
                <Inputbox label={"Username"} placeholder={"Username"} onChange={
                    (e)=>{
                        setUsername(e.target.value);
                    }
                }></Inputbox>
                <Inputbox label={"Password"} placeholder={"Password"} onChange={
                    (e)=>{
                        setPassword(e.target.value);
                    }
                }></Inputbox>
                <NewButton text={"Continue"} onClick={
                    ()=>{
                        axios.post("http://localhost:3000/api/v1/users/signup", {
                            firstName,
                            lastname,
                            username,
                            password
                        })
                        .then((res)=>{
                            localStorage.setItem("token",res.data.token);
                            navigate("/dashboard")
                        })
                        .catch((err)=>{
                            console.error(err);
                            setErrorMessage("Could Not Sign Up, Please Try Again!")
                        })
                    }
                }></NewButton>
                <h1 className="text-(--color-negative) font-bold text-lg text-center">{errormessage}</h1>
                <Bottomwarning text={"Already Have an Account?"} linktext={"LogIn"} onClick={onSignIn}></Bottomwarning>
            </div>
        </div>
    )
}

export default NewSignUp;
