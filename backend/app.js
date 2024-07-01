const express = require('express');
const multer = require('multer');
const pako = require('pako');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();

app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', file.filename);

  const compressedData = fs.readFileSync(filePath);
  const decompressedData = pako.inflate(compressedData);

  const originalFileName = path.join(__dirname, 'uploads', file.originalname);
  fs.writeFileSync(originalFileName, decompressedData);

  // Remove the compressed file
  fs.unlinkSync(filePath);

  res.send({ message: 'File uploaded and decompressed successfully.' });
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
