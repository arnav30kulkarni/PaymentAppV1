const SendMoney=()=>{
    return(
        <>
        <div className="bg-slate-200 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center rounded-lg bg-white shadow w-120 h-max p-6">
                    <div className=" flex mt-4 px-2 py-2 font-bold text-4xl justify-center text-black">
                        Send Money:
                    </div>
                    <div className="flex ml-2 mt-6">
                        <div className="rounded-full bg-green-500 justify-center h-12 w-12 ml-1 mr-1">
                            <div className="flex flex-col justify-center text-white h-full text-center">
                                U
                            </div>
                        </div>
                        <div className="font-medium text-lg px-2 py-1 ">
                                Arnav Kulkarni
                        </div>
                    </div>
                    <div className="font-bold text-md mt-1 ml-2 px-1">
                        Enter the (Amount in rs.)
                    </div>
                    <div px-4>
                        <input className="w-full mt-3 mb-3 px-2 py-1 border rounded border-slate-200 shadow" placeholder="Enter the amount"/>

                        <button type="button" className="mt-3 w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 bg-green-600 hover:bg-green-700">Initialize transfer</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SendMoney;
