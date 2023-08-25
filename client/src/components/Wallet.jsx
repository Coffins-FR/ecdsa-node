import { useAtom } from "jotai";
import { balance, wallet } from "../contexts/atoms";
import server from "../server";
import "./Wallet.scss";

function Wallet({}) {
  const [amount, setAmount] = useAtom(balance);
  const [address, setAddress] = useAtom(wallet);

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setAmount(balance);
    } else {
      setAmount(0);
    }
  }

  return (
    <div className="container">
      <div className="c-wallet">
        <img width={80} height={110} src="/eth.png" alt="" />
        <h1>Your Wallet</h1>

        <label>
          Wallet Address
          <input
            placeholder="Enter your wallet Adress"
            value={address}
            onChange={onChange}
          ></input>
        </label>

        <div className="balance">Balance: {amount} ETH</div>
      </div>
    </div>
  );
}

export default Wallet;
