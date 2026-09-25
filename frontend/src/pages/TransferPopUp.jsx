import React from "react";

const TransferPopup = ({ open, currStatus, message, onClose, onBack }) => {
  if (!open) return null;

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-status">
        <div className={`payment-status-icon ${currStatus.startsWith("Success") ? "success" : currStatus.startsWith("Failed") ? "failed" : "processing"}`}>
          {currStatus.startsWith("Success") ? "✓" : currStatus.startsWith("Failed") ? "!" : "· · ·"}
        </div>
        <div id="payment-status" className="payment-modal-title">{currStatus}</div>
        <div className="payment-modal-message">{message}</div>
        <div className="payment-modal-actions">
          <button
            onClick={onBack}
            className="payment-modal-primary"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="payment-modal-secondary"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;
