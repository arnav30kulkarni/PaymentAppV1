import NewAppbar from "../components/NewAppbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PinSetupPopup from "../components/PinSetupPopup";

const NewDashboard = () => {
    const [balance, setBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [pinSetupRequired, setPinSetupRequired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const requestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get("http://localhost:4500/api/v1/account/balance", requestConfig)
            .then((response) => setBalance(response.data.balance))
            .catch((error) => {
                if ([401, 403].includes(error.response?.status)) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }
                setErrorMessage(error.response?.data?.msg || "Unable to load balance");
            });

        axios.get("http://localhost:4500/api/v1/user/me", requestConfig)
            .then((response) => setPinSetupRequired(!response.data.pinConfigured))
            .catch((error) => {
                if ([401, 403].includes(error.response?.status)) {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            });

        axios.get("http://localhost:4500/api/v1/account/recent", requestConfig)
            .then((response) => setTransactions(response.data.transactions || []))
            .catch((error) => console.error("Error fetching transactions:", error))
            .finally(() => setTransactionsLoading(false));
    }, [navigate]);

    const formatDate = (date) => new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));

    return(
        <main className="dashboard-page">
            <NewAppbar />
            {pinSetupRequired && <PinSetupPopup onConfigured={() => setPinSetupRequired(false)} />}
            <section className="dashboard-content">
                <div className="dashboard-heading-row">
                    <div>
                        <p className="dashboard-eyebrow">Your wallet</p>
                        <h1 className="dashboard-title">Good to see you.</h1>
                    </div>
                </div>

                <div className="balance-card">
                    <div>
                        <p className="balance-label">Available balance</p>
                        <p className="balance-value">
                            {balance === null ? "Loading..." : `₹ ${Number(balance).toFixed(2)}`}
                        </p>
                        {errorMessage && <p className="balance-error">{errorMessage}</p>}
                    </div>
                    <div className="balance-card-mark" aria-hidden="true">₹</div>
                </div>
                <button type="button" className="dashboard-pay-button dashboard-pay-below-balance" onClick={() => navigate("/users")}>
                    <span aria-hidden="true">+</span> Pay someone
                </button>

                <section className="transactions-section">
                    <div className="transactions-heading">
                        <div>
                            <p className="dashboard-eyebrow">Activity</p>
                            <h2>Recent transactions</h2>
                        </div>
                        <span>{transactions.length} {transactions.length === 1 ? "entry" : "entries"}</span>
                    </div>

                    <div className="transactions-list">
                        {transactionsLoading ? (
                            <div className="transactions-empty">Loading your latest activity...</div>
                        ) : transactions.length === 0 ? (
                            <div className="transactions-empty">
                                <strong>No transactions yet</strong>
                                <span>Your payments will appear here.</span>
                            </div>
                        ) : transactions.map((transaction) => {
                            const isCredit = transaction.type === "Credit";
                            const counterparty = transaction.counterparty;
                            const name = counterparty ? `${counterparty.firstname} ${counterparty.lastname}` : "PayFlow user";
                            return (
                                <div className="transaction-row" key={transaction.id}>
                                    <div className={`transaction-icon ${isCredit ? "credit" : "debit"}`} aria-hidden="true">{isCredit ? "↓" : "↑"}</div>
                                    <div className="transaction-details">
                                        <strong>{isCredit ? "Received from" : "Paid to"} {name}</strong>
                                        <span>{formatDate(transaction.createdAt)}</span>
                                    </div>
                                    <div className={`transaction-amount ${isCredit ? "credit" : "debit"}`}>{isCredit ? "+" : "-"}₹{Number(transaction.amount).toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </section>

        </main>
    )
}

export default NewDashboard;