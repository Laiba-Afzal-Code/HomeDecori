import React, { useState } from "react";
import axios from "../../utils/userAxios.js";
import "./AIRoomDesigner.css";
import { toast } from "react-toastify";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./AIRoomDesigner.css"

const AIRoomDesigner = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [designedImage, setDesignedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("modern");

  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setOriginalImage(URL.createObjectURL(file));
    setDesignedImage(null);
  };

  const handleDesignRoom = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomImage", selectedFile);
      formData.append("style", style);

      const response = await axios.post("/generate-room", formData);
      setDesignedImage(
        `http://localhost:5000${response.data.designedImageUrl}`,
      );
    } catch (error) {
      console.error(error);
      toast.error("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!designedImage) return;

    const link = document.createElement("a");
    link.href = designedImage;
    link.download = "ai-room-design.png";
    link.click();
  };

  const resetDesigner = () => {
    setOriginalImage(null);
    setSelectedFile(null);
    setDesignedImage(null);
  };

  return (
    <div className="ai-room-designer">
      <h2>AI Interior Room Designer</h2>

      <p className="subtitle">
        Upload your room photo and let AI redesign it with modern interior
        styles.
      </p>
<input
  type="file"
  accept="image/png"
  onChange={(e) => setSelectedFile(e.target.files[0])}
/>

      {/* Style Selection */}

      <div className="style-select">
        <label>Choose Design Style</label>

        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="modern">Modern</option>
          <option value="minimalist">Minimalist</option>
          <option value="luxury">Luxury</option>
          <option value="scandinavian">Scandinavian</option>
        </select>
      </div>

      {/* Before Image */}

      {originalImage && (
        <div className="preview">
          <h3>Before</h3>

          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={originalImage} alt="room" />
          </ReactCrop>
        </div>
      )}

      {/* Generate Button */}

      <button
        onClick={handleDesignRoom}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? "AI Designing..." : "Generate Room Design"}
      </button>

      {/* After Image */}

      {designedImage && (
        <div className="preview">
          <h3>AI Designed Room</h3>

          <img src={designedImage} alt="AI room" />

          <div className="action-buttons">
            <button onClick={downloadImage}>Download Image</button>

            <button onClick={resetDesigner}>Upload New</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRoomDesigner;
