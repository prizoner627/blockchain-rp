const fs = require("fs");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const { Transaction, Block } = require("../blockchain");
const { Blockchain } = require("../schema/Blockchain");

function calculateHash(path) {
  let file_buffer = fs.readFileSync(path);
  let sum = crypto.createHash("sha256");
  sum.update(file_buffer);
  const hex = sum.digest("hex");
  return hex;
}

exports.UploadDocument = async (req, res) => {
  try {
    let filename = req.body.filename;
    let title = req.body.title;
    let author = req.body.author;

    let hash = calculateHash(`./files/${filename}`);
    console.log(`File hash : ${hash}`);

    const tx = new Transaction(hash, filename, title, author);
    console.log(tx);

    // Transaction {
    //     txId: '35ff0d2d-1205-420e-ac05-a1fce3818c23',
    //     fileHash: '2f935f3c504804786d31f92cbf0f9c042c08f67ee9d3f846e4f9da458d138955',
    //     filename: '8b520219-e3b3-4436-8bd7-455e7f8f583e',
    //     timestamp: 1641671418253
    //     title: foo
    //     author: bar
    //   }

    let transactions = [];
    transactions.push(tx);
    console.log(transactions);

    //get last block from db
    let lastBlock = await Blockchain.find({}).sort({ _id: -1 }).limit(1);
    console.log(lastBlock[0], "lastBlock");

    let previousHash = lastBlock[0].hash;
    let prevIndex = lastBlock[0].index + 1;

    //fetch this from database
    // let previousHash =
    //   "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";
    //fetch this from database
    // let prevIndex = "0";

    const block = new Block(
      tx.timestamp,
      transactions,
      previousHash,
      prevIndex
    );
    console.log(block);

    // Block {
    //     previousHash: '9767a0394d24e5c8687fa62a1c07fa2cfb383401121c7b420711576fc636b6ec',
    //     timestamp: 1641671418253,
    //     transactions: [
    //       Transaction {
    //         txId: '35ff0d2d-1205-420e-ac05-a1fce3818c23',
    //         fileHash: '2f935f3c504804786d31f92cbf0f9c042c08f67ee9d3f846e4f9da458d138955',
    //         filename: '8b520219-e3b3-4436-8bd7-455e7f8f583e',
    //         timestamp: 1641671418253,
    //         title: foo,
    //         author: bar,
    //       }
    //     ],
    //     nonce: 0,
    //     hash: '47f1de68e80a9a86d299d4703bd402ae938c911e403fff2fab1598322d092609',
    //     index: '2'
    //   }

    //mine block
    block.mineBlock(3);
    console.log(block);

    // Block {
    //     previousHash: '9767a0394d24e5c8687fa62a1c07fa2cfb383401121c7b420711576fc636b6ec',
    //     timestamp: 1641672403947,
    //     transactions: [
    //       Transaction {
    //         txId: '227d17b3-ac97-4913-8152-8289c1fb3353',
    //         fileHash: '2f935f3c504804786d31f92cbf0f9c042c08f67ee9d3f846e4f9da458d138955',
    //         ownerId: 'f1fdf6e2-24c6-44a0-83bc-a009c4ffc959',
    //         timestamp: 1641672403947,
    //         title: foo,
    //         author: bar,
    //       }
    //     ],
    //     nonce: 57,
    //     hash: '008061bea67681c0df41852226c7c781003a7b1ebf9dee85f8a9c2aa6fc93479',
    //     index: '2'
    //   }

    const bchain = new Blockchain(block);
    const result = await bchain.save();
    //save this in database

    return res.status(201).json({
      status: "201",
      message: "",
      data: result,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.FileUpload = async (req, res, next) => {
  try {
    console.log(req.files);

    return res.status(201).json({
      status: "201",
      message: "success",
      data: req.files,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.GetBlockchain = async (req, res, next) => {
  try {
    //get all blocks
    let all = await Blockchain.find({}).sort({ _id: 1 });
    console.log(all);

    return res.status(201).json({
      status: "201",
      message: "success",
      data: all,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};

exports.Verify = async (req, res, next) => {
  try {
    console.log(req.file.filename);

    let hash = calculateHash(`./temp/${req.file.filename}`);
    console.log(`File hash : ${hash}`);

    //check file hash against db
    let data = await Blockchain.findOne({ "transactions.fileHash": hash });
    console.log(data);

    //delete file after processing
    let filePath = `./temp/${req.file.filename}`;
    fs.unlinkSync(filePath);

    return res.status(201).json({
      status: "201",
      message: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "Something went wrong, please try again later",
      data: null,
    });
  }
};
