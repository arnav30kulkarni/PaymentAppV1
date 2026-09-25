import { useState } from "react";
import axios from "axios";

const PinSetupPopup = ({ onConfigured }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!currentPassword || !/^\d{4,6}$/.test(pin)) {
      setError("Enter your account password and a 4 to 6 digit PIN.");
      return;
    }

    try {
      setSaving(true);
      await axios.put("http://localhost:4500/api/v1/user/pin", {
        currentPassword,
        pin,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onConfigured();
    } catch (requestError) {
      setError(requestError.response?.data?.msg || "Unable to configure your payment PIN.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="payment-modal-backdrop">
      <form className="payment-modal payment-pin-modal" onSubmit={handleSubmit}>
        <div className="payment-pin-lock" aria-hidden="true">#</div>
        <h2 className="payment-modal-title">Secure your payments</h2>
        <p className="payment-modal-message">Set a payment PIN before sending money. You will use it to authorize every payment.</p>
        <label className="payment-pin-field">
          <span>Account password</span>
          <input autoFocus type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Enter account password" />
        </label>
        <label className="payment-pin-field">
          <span>Payment PIN</span>
          <input type="password" inputMode="numeric" maxLength={6} value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="4 to 6 digits" />
        </label>
        {error && <p className="payment-pin-error">{error}</p>}
        <button type="submit" disabled={saving} className="payment-modal-primary payment-pin-submit">{saving ? "Saving..." : "Configure PIN"}</button>
      </form>
    </div>
  );
};

export default PinSetupPopup;
