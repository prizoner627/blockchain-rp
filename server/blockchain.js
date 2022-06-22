const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
  }

  //if empty
  createGenesisBlock() {
    return new Block(new Date(), [], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    console.log("transaction added: %s", transaction);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash, previousIndex) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.hash = this.calculateHash();
    this.index = previousIndex;
  }

  // Returns the SHA256 of this block (by processing all the data stored inside this block

  calculateHash() {
    let hash = crypto
      .createHash("sha256")
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest("hex");

    console.log(`Hash : ${hash}`);

    return hash;
  }

  // Starts the mining process on the block. It changes the 'nonce'
  // until the hash of the block starts with enough zeros (= difficulty)

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
}

class Transaction {
  constructor(fileHash, filename, title, author) {
    this.txId = uuidv4();
    this.fileHash = fileHash;
    this.filename = filename;
    this.timestamp = Date.now();
    (this.title = title), (this.author = author);
  }

  // Returns the SHA256 of this transcation (by processing all the data stored inside this transcation

  calculateHash() {
    let hash = crypto
      .createHash("sha256")
      .update(
        this.txId + this.fileHash + this.filename + this.timestamp,
        this.title,
        this.author
      )
      .digest("hex");

    console.log(`tx Hash : ${hash}`);

    return hash;
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;
