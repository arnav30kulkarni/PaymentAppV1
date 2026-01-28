import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";


const Dashboard=()=>{
    return(
        <>
        <div className="flex-col justify-center mt-8 mr-4 ml-4 shadow">
            <Appbar/>
        </div>
        <div className="flex-col justify-center text-left">
            <Balance></Balance>
        </div>
        <div>
            <Users></Users>
        </div>
        </>
    )
}

export default Dashboard;