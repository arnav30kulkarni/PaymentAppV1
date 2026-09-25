import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TransferPopup from "./TransferPopUp";
import NewAppbar from "../components/NewAppbar";
import PaymentPinPopup from "../components/PaymentPinPopup";

const SendMoney = () => {
  //check for token
  const token=localStorage.getItem("token")
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  },[token,navigate])

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [balance, setBalance] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [pinPopupOpen, setPinPopupOpen] = useState(false);
  const [popUpStatus, setPopUpStatus] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //if no id in params:- navigate to /my page
  useEffect(()=>{
    if(!id || !name){
      navigate("/")
    }
  }, [id, name, navigate])

  useEffect(() => {
    axios.get(`http://localhost:4500/api/v1/user/recipient/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setRecipient(response.data))
      .catch(() => setRecipient(null));
  }, [id, token]);

  useEffect(() => {
    axios.get("http://localhost:4500/api/v1/account/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setBalance(Number(response.data.balance)))
      .catch(() => setBalance(null));
  }, [token]);

  const openPinPopup = () => {
    if (!amount || Number(amount) <= 0) {
      setPopUpStatus("Failed ❌");
      setPopUpMessage("Send a valid amount");
      setPopUpOpen(true);
      return;
    }

    setPin("");
    setPinPopupOpen(true);
  };

  const TransferHandler = async (event) => {
    event?.preventDefault();

    if (!/^\d{4,6}$/.test(pin)) {
      setPopUpStatus("Failed ❌");
      setPopUpMessage("Enter your 4 to 6 digit payment PIN");
      setPinPopupOpen(false);
      setPopUpOpen(true);
      return;
    }

    try {
      setLoading(true);
      setPinPopupOpen(false);

      // Show processing popup
      setPopUpStatus("Processing...");
      setPopUpMessage("Please wait while your transfer is being completed...");
      setPopUpOpen(true);

      await axios.post(
        "http://localhost:4500/api/v1/account/transfer",
        { to: id, amount: Number(amount), pin },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setPopUpStatus("Success ✅");
      setPopUpMessage("Payment completed Successfully!");
    } catch (error) {
      setPopUpStatus("Failed ❌");
      setPopUpMessage(error?.response?.data?.msg || "Transfer failed");
    } finally {
      setPin("");
      setLoading(false);
    }
  };

  return (
    <>
      <TransferPopup
        open={popUpOpen}
        currStatus={popUpStatus}
        message={popUpMessage}
        onClose={() => setPopUpOpen(false)}
        onBack={() => navigate(-1)}
      />
      <PaymentPinPopup
        open={pinPopupOpen}
        amount={amount}
        pin={pin}
        onChange={setPin}
        onConfirm={TransferHandler}
        onClose={() => {
          setPin("");
          setPinPopupOpen(false);
        }}
        loading={loading}
      />

      <div className="payment-page">
        <NewAppbar />
        <main className="payment-shell">
          <button type="button" onClick={() => navigate(-1)} className="payment-back-button">
            <span aria-hidden="true">←</span> Back
          </button>

          <section className="payment-layout">
            <div className="payment-intro payment-reveal">
              <p className="payment-kicker">Quick transfer</p>
              <h1>Send money with confidence.</h1>
              <p className="payment-intro-copy">A clear, secure way to move money to someone you trust.</p>
              <div className="payment-orbit" aria-hidden="true"><span>₹</span></div>
            </div>

            <div className="payment-card payment-reveal payment-reveal-delay">
              <div className="payment-recipient">
                <div className="payment-avatar">
                  {recipient?.profilePicture ? <img src={recipient.profilePicture} alt={name} /> : name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="payment-label">Sending to</p>
                  <p className="payment-recipient-name">{name}</p>
                </div>
                <span className="payment-verified" title="Verified recipient" aria-label="Verified recipient">✓</span>
              </div>

              <div className="payment-amount-block">
                <label htmlFor="payment-amount">Amount</label>
                <div className="payment-amount-input">
                  <span>₹</span>
                  <input id="payment-amount" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} type="number" min="1" inputMode="decimal" placeholder="0.00" />
                </div>
              </div>

              <div className="payment-quick-values">
                {[100, 500, 1000, 2000].map((value) => (
                  <button key={value} type="button" onClick={() => setAmount(value)} className={amount === value ? "selected" : ""}>₹{value}</button>
                ))}
              </div>

              <div className="payment-summary">
                <div><span>Transfer fee</span><strong>Free</strong></div>
                <div><span>Available balance</span><strong>{balance === null ? "--" : `₹${balance.toFixed(2)}`}</strong></div>
                <div className="payment-total"><span>Total</span><strong>₹{Number(amount || 0).toFixed(2)}</strong></div>
              </div>

              <button type="button" onClick={openPinPopup} disabled={loading} className="payment-submit">
                <span>{loading ? "Processing payment" : "Review and send"}</span>
                <span aria-hidden="true">{loading ? "..." : "→"}</span>
              </button>
              <p className="payment-secure"><span aria-hidden="true">⌁</span> Protected by secure payment processing</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SendMoney;
