const PaymentPinPopup = ({ open, amount, pin, onChange, onConfirm, onClose, loading }) => {
  if (!open) return null;

  return (
    <div className="payment-modal-backdrop">
      <form className="payment-modal payment-pin-modal" onSubmit={onConfirm}>
        <div className="payment-pin-lock" aria-hidden="true">#</div>
        <h2 className="payment-modal-title">Confirm payment</h2>
        <p className="payment-modal-message">
          Enter your payment PIN to send <strong>₹{Number(amount || 0).toFixed(2)}</strong>.
        </p>
        <label className="payment-pin-field">
          <span>Payment PIN</span>
          <input
            autoFocus
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="4 to 6 digits"
            aria-label="Payment PIN"
          />
        </label>
        <div className="payment-modal-actions">
          <button type="button" onClick={onClose} className="payment-modal-secondary">Cancel</button>
          <button type="submit" disabled={loading} className="payment-modal-primary">
            {loading ? "Verifying..." : "Confirm payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPinPopup;
