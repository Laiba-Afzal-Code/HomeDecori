import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";
import "./imageeditor.css";

export default function ImageEditor() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.8);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const compressImage = async () => {
    const options = {
      maxSizeMB: quality,
      useWebWorker: true,
    };

    const compressed = await imageCompression(image, options);
    downloadFile(compressed);
  };

  const convertFormat = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.src = preview;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        downloadFile(blob);
      }, format);
    };
  };

  const convertPDF = () => {
    const pdf = new jsPDF();
    pdf.addImage(preview, "JPEG", 10, 10, 180, 160);
    pdf.save("image.pdf");
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "edited-homedecorim-tool";
    link.click();
  };

  return (
    <div className="editor">

      <h2>Image Editor Tool</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {preview && (
        <div className="previewBox">
          <img src={preview} alt="preview"/>
        </div>
      )}

      <div className="controls">

        <label>Format</label>
        <select onChange={(e)=>setFormat(e.target.value)}>
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>

        <label>Compression</label>
        <select onChange={(e)=>setQuality(e.target.value)}>
          <option value="0.9">High Quality</option>
          <option value="0.6">Medium</option>
          <option value="0.3">Low Size</option>
        </select>

      </div>

      <div className="buttons">

        <button onClick={compressImage}>Compress Image</button>

        <button onClick={convertFormat}>Convert Format</button>

        <button onClick={convertPDF}>Convert to PDF</button>

      </div>

    </div>
  );
}