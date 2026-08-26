import NewAppbar from "../components/newAppbar";
import axios from "axios";
import { useEffect, useState } from "react";

const NewDashboard = () => {
    const [balance, setBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:4500/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => setBalance(response.data.balance))
            .catch((error) => {
                console.error("Error fetching balance:", error);
                setErrorMessage(error.response?.data?.msg || "Unable to load balance");
            });
    }, []);

    return(
        <main className="dashboard-page">
            <NewAppbar />
            <section className="dashboard-content">
                <div className="balance-card">
                    <p className="balance-label">Available balance</p>
                    <p className="balance-value">
                        {balance === null ? "Loading..." : `₹ ${Number(balance).toFixed(2)}`}
                    </p>
                    {errorMessage && <p className="balance-error">{errorMessage}</p>}
                </div>
            </section>
        </main>
    )
}

export default NewDashboard;