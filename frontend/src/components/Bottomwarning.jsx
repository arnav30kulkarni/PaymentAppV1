import { Link } from "react-router-dom"

const Bottomwarning=({text,to,linktext})=>{
    return(
        <div className="text-sm text-slate-400 px-1 py-2 justify-center">
            <div>
                {text}
            </div>
                <Link className="underline text-slate-300 cursor-pointer pl-1" to={to}>
                {linktext}
                </Link>
        </div>
    )
}

export default Bottomwarning;