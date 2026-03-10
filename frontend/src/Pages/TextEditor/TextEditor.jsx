import React, { useState, useRef } from "react";
import "./TextEditor.css";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const history = useRef([]);
  const redoStack = useRef([]);

  // Helper to update text and manage undo history
  const updateText = (newText) => {
    history.current.push(text);
    redoStack.current = [];
    setText(newText);
  };

  // Basic text actions
  const handleUppercase = () => updateText(text.toUpperCase());
  const handleLowercase = () => updateText(text.toLowerCase());
  const handleClear = () => updateText("");
  const handleRemoveExtraSpaces = () =>
    updateText(text.replace(/\s+/g, " ").trim());
  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);

  const handleRemoveWrongWords = () => {
    const newText = text
      .split(" ")
      .filter((word) => /^[a-zA-Z]+$/.test(word))
      .join(" ");
    updateText(newText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  // Undo / Redo
  const handleUndo = () => {
    if (history.current.length === 0) return;
    redoStack.current.push(text);
    const previous = history.current.pop();
    setText(previous);
  };

  const handleRedo = () => {
    if (redoStack.current.length === 0) return;
    history.current.push(text);
    const next = redoStack.current.pop();
    setText(next);
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      handleUppercase();
    }
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      handleLowercase();
    }
    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      handleBold();
    }
    if (e.ctrlKey && e.key === "i") {
      e.preventDefault();
      handleItalic();
    }
  };

  // Export PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(fontSize);
    doc.setTextColor(fontColor);
    doc.text(text || " ", 10, 10);
    doc.save("text-editor.pdf");
  };

  // Download TXT
  const handleDownloadTXT = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "text-editor.txt");
  };

  // Download DOCX
  const handleDownloadDOCX = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(text || " ")],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "text-editor.docx");
    });
  };

  return (
    <>
    <Navbar/>
    <div className="editor-container">
      <h2>Full-Featured Text Editor</h2>

      {/* Font & color controls */}
      <div className="controls">
        <label>
          Font Size:
          <input
            type="number"
            value={fontSize}
            min="12"
            max="48"
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>

      {/* Textarea */}
      <textarea
        className={`editor-text ${isBold ? "bold" : ""} ${
          isItalic ? "italic" : ""
        }`}
        style={{ fontSize: `${fontSize}px`, color: fontColor, background: bgColor }}
        value={text}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing here..."
      />

      {/* Buttons */}
      <div className="buttons-container">
        <button onClick={handleUppercase}>Uppercase</button>
        <button onClick={handleLowercase}>Lowercase</button>
        <button onClick={handleBold}>{isBold ? "Unbold" : "Bold"}</button>
        <button onClick={handleItalic}>{isItalic ? "Unitalic" : "Italic"}</button>
        <button onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</button>
        <button onClick={handleRemoveWrongWords}>Remove Wrong Words</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleDownloadTXT}>Download TXT</button>
        <button onClick={handleDownloadDOCX}>Download DOCX</button>
      </div>

      {/* Summary */}
      <div className="summary">
        <p>Word Count: {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}</p>
        <p>Character Count: {text.length}</p>
      </div>

      {/* Preview */}
      <div className="preview">
        <h3>Live Preview:</h3>
        <div
          className={`preview-text ${isBold ? "bold" : ""} ${
            isItalic ? "italic" : ""
          }`}
          style={{ fontSize: `${fontSize}px`, color: fontColor, background: bgColor }}
        >
          {text || "Nothing to preview..."}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TextEditor;
