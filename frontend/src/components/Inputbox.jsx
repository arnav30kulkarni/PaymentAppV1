const Inputbox=({type="text",label,placeholder,onChange})=>{
    return(
        <div>
            <div className="text-sm font-medium text-left py-3">
            {label}
            </div>
        <input type={type} onChange={onChange} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20"/>
        </div>
    )
}

export default Inputbox;