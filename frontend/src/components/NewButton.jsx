const NewButton = ({text,onClick})=>{
    return(<div>
        <button type="button" text={text} onClick={onClick} className="mt-6 w-full rounded-xl px-5 py-2.5 text-sm font-medium text-(--text-primary) bg-(--color-accent) hover:bg-(--color-accent-hover) focus:outline-none focus:ring-4 focus:ring-gray-300 me-2 mb-2">
            {text}
        </button>
        </div>
    )
}

export default NewButton;