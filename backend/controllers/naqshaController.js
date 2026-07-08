// src/controllers/naqshaController.js
import fetch from 'node-fetch';
import HUGGINGFACE_API_TOKEN  from '../config/db.js';

const generateNaqshaImage = async (prompt) => {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
    {
      headers: { Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}` },
      method: 'POST',
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`);
  }
  const buffer = await response.buffer();
  return buffer;
};

export const generateNaqsha = async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageBuffer = await generateNaqshaImage(prompt);
    const base64Image = imageBuffer.toString('base64');
    res.json({ image: `data:image/png;base64,${base64Image}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
