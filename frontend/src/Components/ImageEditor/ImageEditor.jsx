import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import jsPDF from "jspdf";
// import "./imageeditor.css";
import Navbar from "../Minicompo/Navbar/Navbar";
import Footer from "../Footer/Footer";

const ICONS = {
  text: "T",
  rect: "▭",
  circle: "◯",
  triangle: "△",
  line: "—",
  delete: "✕",
  shadow: "💨",
  upload: "⬆",
  undo: "↶",
  redo: "↷",
};
const ASSETS = ["/assets/star.png", "/assets/heart.png", "/assets/arrow.png"];
const GOOGLE_FONTS = ["Poppins", "Roboto", "Montserrat", "Oswald"];

export default function ImageEditor() {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const [selected, setSelected] = useState(null);
  const [layers, setLayers] = useState([]);
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    canvas.current = new fabric.Canvas("canvas", {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#1c2b28",
    });
    canvas.current.on("selection:created", (e) => setSelected(e.selected[0]));
    canvas.current.on("selection:updated", (e) => setSelected(e.selected[0]));
    canvas.current.on("selection:cleared", () => setSelected(null));
    canvas.current.on("object:added", updateLayers);
    canvas.current.on("object:removed", updateLayers);
    canvas.current.on("object:modified", saveState);
    saveState();
  }, []);

  useEffect(() => {
    if (canvas.current) {
      canvas.current.set({ width: canvasWidth, height: canvasHeight });
      canvas.current.renderAll();
    }
  }, [canvasWidth, canvasHeight]);

  const saveState = () => {
    undoStack.current.push(canvas.current.toJSON());
  };
  const updateLayers = () => setLayers([...canvas.current.getObjects()]);

  const undo = () => {
    if (undoStack.current.length > 1) {
      const current = undoStack.current.pop();
      redoStack.current.push(current);
      canvas.current.loadFromJSON(
        undoStack.current[undoStack.current.length - 1],
        () => canvas.current.renderAll(),
      );
      updateLayers();
    }
  };
  const redo = () => {
    if (redoStack.current.length > 0) {
      const state = redoStack.current.pop();
      canvas.current.loadFromJSON(state, () => canvas.current.renderAll());
      updateLayers();
      undoStack.current.push(state);
    }
  };

  const addText = (text = "New Text") => {
    const obj = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fill: "#fff",
      fontSize: 32,
      fontFamily: "Poppins",
      shadow: "rgba(0,0,0,0.3) 2px 2px 5px",
    });
    canvas.current.add(obj);
    saveState();
  };
  const addRect = () => {
    canvas.current.add(
      new fabric.Rect({
        width: 150,
        height: 100,
        fill: "#198754",
        left: 120,
        top: 150,
      }),
    );
    saveState();
  };
  const addCircle = () => {
    canvas.current.add(
      new fabric.Circle({ radius: 60, fill: "#0f5132", left: 200, top: 200 }),
    );
    saveState();
  };
  const addTriangle = () => {
    canvas.current.add(
      new fabric.Triangle({
        width: 120,
        height: 100,
        fill: "#059669",
        left: 150,
        top: 150,
      }),
    );
    saveState();
  };
  const addLine = () => {
    canvas.current.add(
      new fabric.Line([50, 50, 200, 200], {
        stroke: "#10b981",
        strokeWidth: 4,
      }),
    );
    saveState();
  };
  const deleteObject = () => {
    selected && canvas.current.remove(selected);
    saveState();
  };
  const addShadow = () => {
    selected &&
      (selected.set("shadow", {
        color: "black",
        blur: 12,
        offsetX: 5,
        offsetY: 5,
      }),
      canvas.current.renderAll(),
      saveState());
  };
  const changeColor = (e) => {
    selected &&
      (selected.set("fill", e.target.value),
      canvas.current.renderAll(),
      saveState());
  };
  const changeFont = (font) => {
    selected?.type === "textbox" &&
      (selected.set("fontFamily", font),
      canvas.current.renderAll(),
      saveState());
  };
  const addAsset = (url) =>
    fabric.Image.fromURL(url).then((img) => {
      img.scaleToWidth(80);
      canvas.current.add(img);
      saveState();
    });

  const uploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result).then((img) => {
        img.scaleToWidth(500);
        canvas.current.add(img);
        saveState();
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const downloadImage = (format = "png", quality = 1) => {
    const data = canvas.current.toDataURL({ format, quality });
    const link = document.createElement("a");
    link.href = data;
    link.download = `design-${format}-${quality === 1 ? "high" : "low"}.${format}`;
    link.click();
  };
  const downloadPDF = () => {
    const data = canvas.current.toDataURL({ format: "png" });
    const pdf = new jsPDF("landscape");
    pdf.addImage(data, "PNG", 10, 10, 270, 150);
    pdf.save("design.pdf");
  };

  return (
    <div className="editor-wrapper">
      {/* <Navba/r/> */}
      <div className="top-bar">
        <div>
          <label>Canvas Size:</label>
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
          />{" "}
          px
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
          />{" "}
          px
        </div>
        <div>
          <button onClick={() => downloadImage("png", 1)}>Download PNG</button>
          <button onClick={() => downloadPDF()}>Download PDF</button>
        </div>
      </div>
      <div className="editor-layout">
        {/* Left Sidebar */}
        <div className="sidebar">
          <button className="tool-btn" title="Text" onClick={() => addText()}>
            {ICONS.text}
          </button>
          <button className="tool-btn" title="Rectangle" onClick={addRect}>
            {ICONS.rect}
          </button>
          <button className="tool-btn" title="Circle" onClick={addCircle}>
            {ICONS.circle}
          </button>
          <button className="tool-btn" title="Triangle" onClick={addTriangle}>
            {ICONS.triangle}
          </button>
          <button className="tool-btn" title="Line" onClick={addLine}>
            {ICONS.line}
          </button>
          <button className="tool-btn" title="Delete" onClick={deleteObject}>
            {ICONS.delete}
          </button>
          <button className="tool-btn" title="Shadow" onClick={addShadow}>
            {ICONS.shadow}
          </button>
          <button className="tool-btn" title="Upload">
            <input
              type="file"
              onChange={uploadImage}
              style={{
                opacity: 0,
                position: "absolute",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            />
            {ICONS.upload}
          </button>
          <button className="tool-btn" title="Undo" onClick={undo}>
            {ICONS.undo}
          </button>
          <button className="tool-btn" title="Redo" onClick={redo}>
            {ICONS.redo}
          </button>
        </div>

        {/* Canvas */}
        <div className="canvas-area">
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>

        {/* Right Sidebar */}
        <div className="right-panel">
          <label>Change Color</label>
          <input type="color" onChange={changeColor} />
          <label>Font</label>
          <select onChange={(e) => changeFont(e.target.value)}>
            {GOOGLE_FONTS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
          <h3>Layers</h3>
          <div className="layers-panel">
            {layers.map((obj, i) => (
              <div
                key={i}
                className="layer-item"
                onClick={() => canvas.current.setActiveObject(obj)}
              >
                {obj.type}
              </div>
            ))}
          </div>
          <h3>Assets</h3>
          <div className="assets-panel">
            {ASSETS.map((a, i) => (
              <img key={i} src={a} onClick={() => addAsset(a)} />
            ))}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}
