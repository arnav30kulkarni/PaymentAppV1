import LogoutButton from "./LogoutButton";

const Appbar = ()=>{
    return(
        <div className="shadow flex justify-between h-14">
            <div className="flex flex-col justify-center h-full ml-4 font-bold text-lg">
                Payment Application
            </div>
            <div className="flex items-center">
                <div className="flex items-center mr-4 h-full">
                    Hello
                </div>
                <div className="rounded-full bg-slate-400 mr-4 h-12 w-12 hover:bg-slate-600 cursor-pointer flex items-center justify-center">
                    <div className="text-white text-center">
                        U
                    </div>
                </div>
                <div className="flex items-center mr-4">
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default Appbar;