import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { balance, wallet } from "../contexts/atoms";
import Popup from "./Popup/Popup";
import server from "../server";
import "./Transfer.scss";

function Transfer({}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useAtom(balance);
  const [address] = useAtom(wallet);

  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      await server
        .post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
        })
        .then((res) => {
          setAmount(res.data.balance);
          setToast(res.data.message);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <div className="container">
      <form className="c-transfer" onSubmit={transfer}>
        <img width={80} height={110} src="/eth.png" alt="" />
        <h1>Send Transaction</h1>
        <Popup
          open={open}
          setopen={setOpen}
          title="ETH send Successfully !"
          description={toast}
          ref={timerRef}
        />
        <label>
          Send Amount
          <input
            placeholder="ETH"
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Adress to transfer your fund"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        <input
          type="submit"
          name="Transfer"
          className="button"
          value="Transfer"
        />
      </form>
    </div>
  );
}

export default Transfer;
