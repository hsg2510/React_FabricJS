import './App.css';
import { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import './Redify.js';

const imageSource = 'testimg.jpeg';

function App() {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
    fabric.initFilterBackend();
  }, []);

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 520,
      width: 500,
      backgroundColor: 'pink'
    })
  );

  const addImg = (canvi) => {
    fabric.Image.fromURL(imageSource, img => {
      img.filters.push(
        new fabric.Image.filters.Redify(),
        new fabric.Image.filters.Blur({ blur : 0.5 })
      );
      img.applyFilters();
      // canvi.setActiveObject(img);      
      canvi.add(img);
      canvi.renderAll();
    });
  }

  return (
    <div>
      <button onClick={() => addImg(canvas)}>Add Filters</button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <canvas id="canvas" width="300" height="300" />
        <img src={imageSource} />
      </div>
    </div>
  );
}
  
export default App;