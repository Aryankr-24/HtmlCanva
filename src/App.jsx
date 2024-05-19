import React, { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import "./App.css";
import images from "./assets/coffee.jpg";

function App() {
  const canvasRef = useRef(null);
  const [captionText, setCaptionText] = useState(
    "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs"
  );
  const [ctaText, setCtaText] = useState("Shop Now");
  const [imageUrl, setImageUrl] = useState(images);
  const predefinedColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33F6",
  ];
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw heading
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(captionText, canvas.width / 2, 50);

    // Load and draw image
    const img = new Image();
    img.src = imageUrl;
    img.onload = function () {
      ctx.drawImage(img, (canvas.width - img.width) / 2, 100);
    };

    // Draw button
    const buttonX = (canvas.width - 150) / 2;
    const buttonY = 300;
    const buttonWidth = 150;
    const buttonHeight = 40;

    function drawButton() {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      ctx.fillStyle = "#000000";
      ctx.font = "18px Arial";
      ctx.fillText(ctaText, canvas.width / 2, buttonY + 25);
    }

    drawButton();
  }, [captionText, ctaText, selectedColor]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddButtonClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  return (
    <div className="bg-blue-100 flex flex-row">
      <div>
        <canvas
          ref={canvasRef}
          width="600"
          height="500"
          className="border border-gray-300"
        ></canvas>
      </div>
      <div className="mt-16 ml-16">
        <div className="mt-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Caption Text:
            </label>
            <input
              type="text"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              CTA Text:
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center mb-4">
            {predefinedColors.map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full mr-2 cursor-pointer border-2 border-white shadow"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
            <button
              className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
          </div>
          {displayColorPicker && (
            <div className="absolute z-10">
              <div
                className="fixed top-0 right-0 bottom-0 left-0"
                onClick={() => setDisplayColorPicker(false)}
              />
              <SketchPicker
                color={selectedColor}
                onChange={handleColorChange}
              />
            </div>
          )}
          {selectedColor && (
            <div
              className="mt-4 p-2 rounded-md text-white text-center font-bold"
              style={{ backgroundColor: selectedColor }}
            >
              Selected Color: {selectedColor}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
