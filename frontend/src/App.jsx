// src/App.js

import { useState } from 'react';
import axios from 'axios';
import pako from 'pako';
import { humanReadableSize } from './utils/helper';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target.result;
      const compressedData = pako.deflate(fileData, { to: 'string' });

      const formData = new FormData();
      formData.append('file', new Blob([compressedData], { type: 'application/octet-stream' }), file.name);

      console.log("Original data size:", humanReadableSize(fileData.byteLength));
      console.log("Compressed data size:", humanReadableSize(compressedData.byteLength));

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully', response.data);
      } catch (error) {
        console.error('Error uploading file', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xls,.xlsx,.csv" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default App;
