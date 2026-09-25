import { useEffect } from "react";
import NewAppbar from "../components/NewAppbar";
import Users from "../components/Users";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Dashboard=()=>{

    const navigate=useNavigate();
    const token=localStorage.getItem("token");

    useEffect(()=>{
        if(!token){
            navigate("/")
        }
    },[token,navigate])

    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:4500/api/v1/account/balance",{
            headers:{
                Authorization:"Bearer "+token
            }
        })
            .then((res)=>{
                setBalance(res.data.balance)
            })
            .catch(err=>{
                console.log(err.response?.data)
            })
    })
    return(
        <main className="users-page">
            <NewAppbar />
            <section className="users-shell">
                <button type="button" className="users-back" onClick={() => navigate("/newdashboard")}>← Back to dashboard</button>
                <div className="users-hero">
                    <div>
                        <p className="dashboard-eyebrow">Pay someone</p>
                        <h1>Choose a recipient.</h1>
                        <p>Search your PayFlow contacts and start a secure transfer in seconds.</p>
                    </div>
                    <div className="users-balance-pill"><span>Available balance</span><strong>{balance ? `₹${Number(balance).toFixed(2)}` : "Loading..."}</strong></div>
                </div>
                <Users />
            </section>
        </main>
    )
}

export default Dashboard;