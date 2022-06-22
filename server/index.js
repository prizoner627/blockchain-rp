//imports
const express = require("express");
const cors = require("cors");
const connect = require("./util/Connection");

const { Blockchain, Block } = require("./blockchain");
const upload = require("./upload");
const upload2 = require("./upload2");

//server configurations
connect();
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//routes imports
const {
  UploadDocument,
  FileUpload,
  GetBlockchain,
  Verify,
} = require("./api/Docs");

//routes
app.post("/create-book", UploadDocument);
app.post("/upload-files", upload.single("files"), FileUpload);
app.get("/get-blockchain", GetBlockchain);
app.post("/verify", upload2.single("files"), Verify);

app.get("/", (req, res) => {
  //   const blockchain = new Block();
  //   const gen = blockchain.mineBlock(2);

  return res.status(200).json({ message: "hello" });
});

var server = app.listen(5002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
