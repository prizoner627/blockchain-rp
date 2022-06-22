const mongoose = require("mongoose");

const blockchain = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  nonce: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
  previousHash: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

const blockchainSchema = mongoose.model("Blockchain", blockchain);

module.exports = { Blockchain: blockchainSchema };
