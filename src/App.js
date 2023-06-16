import './App.css';
import {useState, useEffect, useRef} from 'react';
import {fabric} from 'fabric';

function App() {
  const [canvas, setCanvas] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })
  );

  const addRect = canvi => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: 'yellow'
    });
    canvi.add(rect);
    canvi.renderAll();
  };

  const addImg = (e, url, canvi) => {
    e.preventDefault();
    new fabric.Image.fromURL(url, img => {
      img.scale(0.75);
      canvi.add(img);
      canvi.renderAll();
      setImgURL('');
    });
  }

  return (
    <div>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <form onSubmit={e => addImg(e, imgURL, canvas)}>
        <div>
          <input
            type="text"
            value={imgURL}
            onChange={e => setImgURL(e.target.value)}
          />
          <button type="submit">Add Image</button>
        </div>
      </form>
      <canvas id="canvas" width="300" height="300"/>
    </div>
  );
}

export default App;