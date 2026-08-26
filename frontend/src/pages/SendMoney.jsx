import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TransferPopup from "./TransferPopUp";

const SendMoney = () => {
  //check for token
  const token=localStorage.getItem("token")
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/my")
    }
  },[token,navigate])

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpStatus, setPopUpStatus] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //if no id in params:- navigate to /my page
  useEffect(()=>{
    if(!id || !name){
      navigate("/my")
    }
  })

  const TransferHandler = async () => {
    // Immediate validation
    if (!amount || Number(amount) <= 0) {
      setPopUpStatus("Failed ❌");
      setPopUpMessage("Send a valid amount");
      setPopUpOpen(true);
      return;
    }

    try {
      setLoading(true);

      // Show processing popup
      setPopUpStatus("Processing...");
      setPopUpMessage("Please wait while your transfer is being completed...");
      setPopUpOpen(true);

      await axios.post(
        "http://localhost:4500/api/v1/account/transfer",
        { to: id, amount: Number(amount) },
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

      <div className="bg-slate-200 flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center rounded-lg bg-white shadow w-500px h-max p-6">
            <div className="flex mt-4 px-2 py-2 font-bold text-4xl justify-center text-black">
              Send Money:
            </div>

            <div className="flex ml-2 mt-6 items-center">
              <div className="rounded-full bg-green-500 justify-center h-12 w-12 flex items-center">
                <span className="text-white text-xl font-bold">
                  {name?.[0]?.toUpperCase()}
                </span>
              </div>

              <div className="font-medium text-lg px-2 py-1">{name}</div>
            </div>

            <div className="font-bold text-md mt-1 ml-2 px-1">
              Enter the (Amount in rs.)
            </div>

            <div className="px-4">
              <input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                className="w-full mt-3 mb-3 px-2 py-1 border rounded border-slate-200 shadow"
                placeholder="Enter the amount"
              />

              <button
                type="button"
                onClick={TransferHandler}
                disabled={loading}
                className="mt-3 w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Initialize transfer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
