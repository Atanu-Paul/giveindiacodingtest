// writing the accounts schema
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
    unique: true,
  },
  account_type: {
    enum: ["Current", "Savings", "BasicSavings"],
  },
  balance: {
    type: Number,
  },
});

module.exports = mongoose.model("accounts", accountSchema);
// customer_id:"8c65210d-2f06-4667-b1df-d609a9fa40d4",
// first_name:"Cam",
// last_name:"Marc",
// account_number:"33-557-3985",
// account_type:"Current",
// balance:68161
