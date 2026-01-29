const Appbar = ()=>{
    return(
        <div className="shadow flex justify-between h-14">
            <div className="flex flex-col justify-center h-full ml-4 font-bold text-lg">
                Paytm App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center mr-4 h-full">
                    Hello
                </div>
                <div className="rounded-full bg-slate-400 justify-center mt-1 mr-4 h-12 w-12 hover:bg-slate-600 cursor-pointerS">
                    <div className="flex flex-col justify-center text-white h-full text-center">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar;