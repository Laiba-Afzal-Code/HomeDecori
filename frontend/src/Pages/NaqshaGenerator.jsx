// src/components/NaqshaGenerator.jsx
import React, { useState } from 'react';
import axios from '../utils/userAxios.js';

const NaqshaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/naqsha/generate', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setImage(data.image);
      } else {
        setError(data.error || 'Error generating image');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Naqsha Generator</h2>
      <input
        type="text"
        placeholder="Enter naqsha description"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {image && (
        <div style={{ marginTop: '20px' }}>
          <img src={image} alt="Generated Naqsha" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
};

export default NaqshaGenerator;