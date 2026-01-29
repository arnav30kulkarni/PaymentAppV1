import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


const Users = ()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    useEffect(()=>{
        axios.get("http://localhost:4500/api/v1/user/bulk?filter="+filter)
            .then(response=>[
                setUsers(response.data.users)
            ])
    },[filter])
    return(<>
        <div className="flex-col ml-4 mr-4 px-2 py-2">
        <div className=" text-black mt-4 text-xl font-bold">
            Users:
        </div>
        <div className="flex-col text-black mt-4 ">
            <input onChange={e=>{
                setFilter(e.target.value)
            }}className="px-2 py-3 border rounded border-b-slate-200 shadow w-full" placeholder="Search..."/>
        </div>
            <div>
                {users.map(user =><User user={user}/>)}
            </div>
        </div>
        </>
    )
}

function User({user}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between mt-2">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-400 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>
                <div className=" pl-2 pb-3 flex flex-col justify-center h-full">
                <div className="font-bold text-lg px-1">
                    {user.firstname} {user.lastname}
                </div>
            </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button text="Send Money"></Button>
            </div>
        </div>
    )
}

export default Users;