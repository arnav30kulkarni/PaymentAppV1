import Bottomwarning from "../components/Bottomwarning";
import "../components/Heading";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import NewButton from "../components/NewButton";
import Subheading from "../components/Subheading";

const NewSignIn = ({ onClose }) => {

    return(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="signin-title" className="relative w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-bg-secondary) p-6 shadow-2xl sm:p-8">
                <button type="button" onClick={onClose} aria-label="Close sign in" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-lg font-semibold text-(--text-secondary) hover:bg-black/5 hover:text-(--text-primary)">
                    X
                </button>
                <div id="signin-title">
                    <Heading text={"Log In to your Account"}></Heading>
                </div>
                <Subheading text={"Enter the credentials to access your account"}></Subheading>
                <Inputbox label={"Username"} placeholder={"Username"}></Inputbox>
                <Inputbox label={"Password"} placeholder={"Password"}></Inputbox>
                <NewButton text={"Continue"}></NewButton>
                <Bottomwarning text={"Don't have an account?"} linktext={"Sign Up Now"}></Bottomwarning>
            </div>
        </div>
    )
}

export default NewSignIn;
