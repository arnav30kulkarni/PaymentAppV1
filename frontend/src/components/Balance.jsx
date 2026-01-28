const Balance = ({value})=>{
    return(
        <div className="flex text-xl mt-2 mb-2">
            <div className="text-slate-700 font-medium justify-center ml-4">
                Balance:
            </div>
            <div className="text-slate-800 font-bold justify-center ml-4">
                ₹ {value}
            </div>
        </div>
    )
}

export default Balance;