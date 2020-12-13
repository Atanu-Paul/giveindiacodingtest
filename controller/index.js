//importing the models
const Accounts = require("../models/accountsSchema");

//@desc     Default welcome route
//@route    GET /
//@access   public
exports.welcome = (req, res) => {
  res.status(200).json({ message: "WELCOME TO GIVEINDIA" });
};

//@desc     List all accounts data route
//@route    GET /accounts/list
//@access   public
exports.listAllAccounts = async (req, res) => {
  let data = await Accounts.find();
  return res.status(200).json({ count: data.length, details: data });
};

//@desc     Ammount transaction route
//@route    POST /transfer
//@access   public
exports.transferMoney = async (req, res) => {
  //console.log(req.body)
  //destructing the reqest body to access values
  const { fromAccountId, toAccountId, amount } = req.body;

  //making 2 find query based on account number to get the 2 seperate account details
  const accountFrom = await Accounts.find({ account_number: fromAccountId });
  const accountTo = await Accounts.find({ account_number: toAccountId });

  //filtering bothe the response of the db find query to cherry pick and return values that is needed
  accountFrom.filter((obj) => {
    return (
      (accountFromCustId = obj.customer_id), (fromAccountBalance = obj.balance)
    );
  });
  accountTo.filter((obj) => {
    return (
      (accountToCustId = obj.customer_id),
      (ToAccountBalance = obj.balance),
      (ToAccountType = obj.account_type)
    );
  });

  // creating a new variable to store the new updated balance
  var newBalance = ToAccountBalance + Number(amount);
  var newBalanceFrom = fromAccountBalance - Number(amount);

  //function to increment the recivers account balance
  async function increaseAccountBalance(accountId, newAmount) {
    await Accounts.findOneAndUpdate(
      { account_number: accountId },
      { $set: { balance: newAmount } },
      { new: true },
      (err, info) => {
        if (err) {
          res
            .status(500)
            .json({ message: `Internal Server Error. Something went wrong` });
        }
        res.status(200).json({
          message: `New Balance of Account Number ${toAccountId}`,
          data: info,
        });
      }
    );
  }

  //function to decrement the senders account balance
  async function decreaseAccountBalance(accountId, newAmount) {
    await Accounts.findOneAndUpdate(
      { account_number: accountId },
      { $set: { balance: newAmount } },
      { new: true },
      (err, info) => {
        if (err) {
          res
            .status(500)
            .json({ message: `Internal Server Error. Something went wrong` });
        }
        // res.status(200).json({
        //   message: `New Balance of Account Number ${fromAccountId}`,
        //   data: info,
        // });
      }
    );
  }

  //condition to check if both accounts belong to same user
  if (accountFromCustId == accountToCustId) {
    res.status(400).json({
      error: `Can not Transfer money between 2 accounts belonging to the same user`,
    });
  }
  //condition to check if source account have sufficient balance
  else if (fromAccountBalance <= amount) {
    res.status(400).json({
      error: `Customer with ID ${accountFromCustId} does not have sufficient balance. Balance is ${fromAccountBalance}`,
    });
  }
  //to check wethere the account to recive the money is Basic Saving Type or not
  else if (ToAccountType == "BasicSavings") {
    //console.log(newBalance, ToAccountBalance);
    if (newBalance > 50000) {
      res.status(400).json({
        error: `Customer ID ${accountToCustId} has a ${ToAccountType} which can not have more than Rs 50,000`,
      });
    } else {
      increaseAccountBalance(toAccountId, newBalance);
      decreaseAccountBalance(fromAccountId, newBalanceFrom);
    }
  } else {
    // console.log(newBalance);
    increaseAccountBalance(toAccountId, newBalance);
    decreaseAccountBalance(fromAccountId, newBalanceFrom);
  }
};
