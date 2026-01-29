const Button = ({text,onClick})=>{
    return(<div>
        <button type="button" text={text} onClick={onClick} className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {text}
        </button>
        </div>
    )
}

export default Button;