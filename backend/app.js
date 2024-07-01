const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/endpoint", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
