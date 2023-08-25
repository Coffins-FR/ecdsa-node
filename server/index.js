const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "01577ff13eb5224486cdc4fbe977f9ecc8454402f7b96dfac5d51ff9b7647bf3": 100,
  c8f5d5187d09c506a2edb31934ff25727f8105e37a995c0cd48f29fb64bd3fd3: 50,
  bc1d28b02642af7c7a81df7859eb48913bd207d342bd4be7a4d63a46f5444000: 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({
      balance: balances[sender],
      message: `Funds sends to: ${recipient.slice(0, 5)}...${recipient.slice(
        recipient.length - 5,
        recipient.length
      )}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
