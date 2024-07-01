import { useState } from 'react';
import { compressPayload } from './utils/gzipCompress';

const App = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const fileData = new Uint8Array(reader.result);
      const compressedPayload = compressPayload(fileData);

      if (!compressedPayload) {
        return;
      }

      const response = await fetch('http://localhost:3000/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Encoding': 'gzip',
        },
        body: compressedPayload,
      });

      const result = await response.json();
      setResponse(result.message);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
