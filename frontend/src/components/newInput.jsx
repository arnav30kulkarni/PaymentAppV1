const newInput = ({text,placeholder,onChange}) => {
    return(
    <div>
        <div className="text-sm font-medium text-left p-2">
            {text}
        </div>
        <Input onChange={onchange} placeholder={placeholder} className="w-full px=2 py-1 border rounded-lg border-(--color-border)"/>
    </div>
    )
}

export default newInput;