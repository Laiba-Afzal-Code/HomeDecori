import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";
import "./imageeditor.css";

      import { Helmet } from "react-helmet";

export default function FileConverterTool() {
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  /* =====================
     IMAGE COMPRESSION
  ===================== */
  const compressImage = async () => {
    try {
      setLoading(true);

      const options = {
        maxSizeMB: quality,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      downloadFile(compressed, "compressed-image.jpg");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Compression failed");
    }
  };

  /* =====================
     FORMAT CONVERT
  ===================== */
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
        downloadFile(blob, `converted.${format.split("/")[1]}`);
      }, format);
    };
  };

  /* =====================
     IMAGE TO PDF
  ===================== */
  const convertToPDF = () => {
    const pdf = new jsPDF();

    pdf.addImage(preview, "JPEG", 10, 10, 180, 160);
    pdf.save("homedecorim-file.pdf");
  };

  /* =====================
     DOCX EXPORT (basic text)
     NOTE: real DOCX needs library like docx.js
  ===================== */
  const exportAsDocx = () => {
    const blob = new Blob(
      ["Home Decorim File Export - Basic DOCX Placeholder"],
      {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }
    );

    downloadFile(blob, "file.docx");
  };

  /* =====================
     DOWNLOAD
  ===================== */
  const downloadFile = (fileBlob, name) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(fileBlob);
    link.download = name;
    link.click();
  };

  return (
    <div className="editor">

<Helmet>
  <title>Smart File Converter Tool | Image, PDF & DOCX Converter Online</title>

  <meta
    name="description"
    content="Free online file converter tool. Compress images, convert JPG, PNG, WEBP, export PDF and DOCX easily with fast performance."
  />

  <meta name="keywords" content="
  image converter, pdf converter, docx converter, image compressor tool,
  jpg to png converter, file converter online, free image tool
  " />

  <meta name="robots" content="index, follow" />
</Helmet>

      <h1 className="toold ">Smart File Converter Tool</h1>
      <p>Convert images, compress files & export formats easily</p>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {preview && (
        <div className="previewBox">
          <img src={preview} alt="preview" />
        </div>
      )}

      <div className="controls">

        <label>Output Format</label>
        <select onChange={(e) => setFormat(e.target.value)}>
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WEBP</option>
        </select>

        <label>Compression</label>
        <select onChange={(e) => setQuality(e.target.value)}>
          <option value="0.9">High Quality</option>
          <option value="0.6">Medium</option>
          <option value="0.3">Low Size</option>
        </select>

      </div>

      <div className="buttons">

        <button onClick={compressImage}>
          {loading ? "Processing..." : "Compress Image"}
        </button>

        <button onClick={convertFormat}>Convert Format</button>

        <button onClick={convertToPDF}>Convert to PDF</button>

        <button onClick={exportAsDocx}>Export DOCX</button>

      </div>

    </div>
  );
}