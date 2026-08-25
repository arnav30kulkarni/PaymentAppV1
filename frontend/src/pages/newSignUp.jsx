import Bottomwarning from "../components/Bottomwarning";
import "../components/Heading";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import NewButton from "../components/NewButton";
import Subheading from "../components/Subheading";

const NewSignUp = ({ onClose, onSignIn }) => {

    return(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="signup-title" className="relative w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={onClose} aria-label="Close sign up" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-lg font-semibold text-(--text-secondary) hover:bg-black/5 hover:text-(--text-primary)">
                    X
                </button>
                <div id="signup-title">
                    <Heading text={"Create a new account"}></Heading>
                </div>
                <Subheading text={"Enter the information to create a new account"}></Subheading>
                <Inputbox label={"Firstname"} placeholder={"FirstName"}></Inputbox>
                <Inputbox label={"Lastname"} placeholder={"LastName"}></Inputbox>
                <Inputbox label={"Username"} placeholder={"Username"}></Inputbox>
                <Inputbox label={"Password"} placeholder={"Password"}></Inputbox>
                <NewButton text={"Continue"}></NewButton>
                <Bottomwarning text={"Already Have an Account?"} linktext={"LogIn"} onClick={onSignIn}></Bottomwarning>
            </div>
        </div>
    )
}

export default NewSignUp;
